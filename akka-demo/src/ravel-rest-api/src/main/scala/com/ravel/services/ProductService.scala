package com.ravel.services

import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.resources.ProductSearchFilter
import spray.json.DeserializationException

import scala.concurrent.Future
import com.ravel.resources.MyJsonSupport._
import spray.json._

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService extends QueryService{
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

  def getProductExt(productId: Int) = {
    val query = s"select * from product_ext where product_id=${productId}"
    single(query) map { productExt =>
      productExt.get("hotelInfo") match {
        case Some(x: String) => {
          import spray.json._
          val hotels = x.parseJson.convertTo[Seq[ProductHotel]]
          (productExt, Some(hotels.head))
        }
        case _ => (productExt, None)
      }
    } flatMap { result =>
      getProductInfra(result)
    }
  }
  def getProductInfra(result: (Map[String, Any], Option[ProductHotel])): Future[(Map[String, Any], Infra)] = {
    def infraQuery(id: Int) = s"select * from infrastructure where id=${id}"
    def infraDescQuery(id: Int) = s"select * from infrastructure_desc where infra_id=${id}"

    result._2 match {
      case Some(p) => {
        val infraId = p.infraId.toInt
        for {
          infra <- single(infraQuery(infraId))
          infraDescs <- mulptile(infraDescQuery(infraId))
        } yield {
          val infraFeature = infra.get("feature") match {
            case Some(x: String) =>
              x.parseJson.convertTo[InfraFeature]
            case _ => throw new DeserializationException("InfraFeature expected")
          }
          val infraDescSeq = infraDescs map { infraDesc =>
            InfraDesc(infraDesc.get("content"), infraDesc.get("content_picture_url"))
          }
          val infraObject = Infra(infra.get("type"), infra.get("title"), infra.get("city"), infra.get("address"), infra.get("phone"),
            infraFeature, infraDescSeq)
          (result._1, infraObject)
        }
      }
      case _ => throw new scala.RuntimeException("error product feature")
    }
  }

  def getProductPrices(productId: Int): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from product_price_by_team where product_id=${productId}"
    mulptile(query)
  }


}
