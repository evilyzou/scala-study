package com.ravel.services

import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.resources.ProductSearchFilter
import spray.json.DeserializationException

import scala.concurrent.Future
import com.ravel.resources.RavelJsonSupport._
import spray.json._

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService extends InfraService{
  def list(filter: ProductSearchFilter) = {
    ProductSearch.queryProducts(filter)
  }

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
