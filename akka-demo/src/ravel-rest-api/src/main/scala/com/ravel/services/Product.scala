package com.ravel.services

import akka.actor.{Props, ActorLogging, Actor}
import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.resources.ProductSearchFilter
import spray.json.DeserializationException

import scala.concurrent.Future
import com.ravel.resources.RavelJsonSupport._
import spray.json._
import scala.concurrent.duration._
import akka.pattern._

import scala.util.{Failure, Success}

/**
 * Created by CloudZou on 12/9/16.
 */

object Product {
  sealed trait ProductQuery
  final case object GetProductQuery extends ProductQuery
  final case object GetProductOtherQuery extends ProductQuery
  final case object GetProductHotelInfoQuery extends  ProductQuery
  final case object GetProductExtQuery extends ProductQuery
  final case object GetProductPricesQuery extends ProductQuery

  final case object UpdateCacheQuery extends ProductQuery

  def props(id: Int): Props = Props(classOf[Product], id)
}

class Product(id: Int) extends Actor with ActorLogging with ProductQuery{
  import Product._

  val system = context.system
  val scheduler = system.scheduler

  var productCache: Option[Map[String, Any]] = None

  override def preStart() = {
    scheduler.schedule(0.seconds, 60.seconds, self, UpdateCacheQuery)
  }

  def receive = {
    case GetProductQuery => {
      val _sender = sender()
      productCache match {
        case Some(product: Map[String, Any]) => _sender ! product
        case None => get(id).pipeTo(_sender)
      }
    }
    case GetProductOtherQuery => {
      getProductOther(id).pipeTo(sender())
    }
    case GetProductHotelInfoQuery => getProductHotelInfo(id).pipeTo(sender())
    case GetProductExtQuery => getProductExt(id).pipeTo(sender())
    case GetProductPricesQuery => getProductPrices(id).pipeTo(sender())
    case UpdateCacheQuery => {
      get(id) onComplete {
        case Success(product: Map[String, Any]) => productCache = Some(product)
        case Failure(_) =>{ log.info("update product cache failed"); None}
      }
    }
  }
}

trait ProductQuery extends InfraService{
  def get(id: Int): Future[Map[String, Any]] = {
    val query = s"select * from product where id=${id}"
    single(query)
  }
  def getProductOther(productId: Int): Future[Map[String, Any]] = {
    val query = s"select * from product_other where product_id=${productId}"
    single(query)
  }

  def getProductHotelInfo(productId: Int) = {
    val query = s"select * from product_ext where product_id=${productId}"
    single(query) map { productExt =>
      productExt.get("hotelInfo") match {
        case Some(x: String) => {
          x.parseJson.convertTo[Seq[ProductHotel]] match {
            case Seq(p, xs @ _*) => (productExt, Some(p))
            case _ => (productExt, None)
          }
        }
        case _ => (productExt, None)
      }
    }
  }

  def getProductExt(productId: Int) = {
    for {
      productExtTuple <- getProductHotelInfo(productId)
      infra <- {
        productExtTuple._2 match {
          case Some(p) => getInfra(p.infraId.toInt)
          case None => Future{ Infra.empty}
        }
      }
    } yield {
      val productHotel = productExtTuple._2
      productExtTuple._1 + ( "feature" -> {
        Map(
          "infra" -> infra,
          "detail" -> productHotel
        )
      })
    }
  }

  def getProductPrices(productId: Int): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from product_price_by_team where product_id=${productId}"
    mulptile(query)
  }
}