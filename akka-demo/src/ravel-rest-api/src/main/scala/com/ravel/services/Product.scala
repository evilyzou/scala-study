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
  final case object GetProductHotelInfoQuery extends  ProductQuery
  final case object UpdateCacheQuery extends ProductQuery

  def props(id: Int): Props = Props(classOf[Product], id)
}

class Product(id: Int) extends Actor with ActorLogging with ProductQuery{
  import Product._

  val system = context.system
  val scheduler = system.scheduler

  var productCache: Option[ProductView] = None

  override def preStart() = {
    scheduler.schedule(60.seconds, 60.seconds, self, UpdateCacheQuery)
  }

  def receive = {
    case GetProductQuery => {
      val _sender = sender()
      productCache match {
        case Some(product) => _sender ! Some(product)
        case None => getProduct.pipeTo(_sender)
      }
    }
    case GetProductHotelInfoQuery => getProductHotelInfo(id).pipeTo(sender())
    case UpdateCacheQuery => {
      getProduct onComplete {
        case Success(product: Option[ProductView]) => productCache = product
        case Failure(_) =>{ log.info("update product cache failed"); None}
      }
    }
  }

  def getProduct = {
    val productFuture = for {
      product <- get(id)
      productExt <- getProductExt(id)
      productOther <- getProductOther(id)
      productPriceByTeams <- getProductPrices(id)
    } yield {
      Some(ProductView.apply(product, productExt, productOther, productPriceByTeams))
    }
    productFuture
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
      productExtTuple._1 + ("productFeatures" -> productExtTuple._1.get("feature").getOrElse("")) + ( "feature" -> {
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