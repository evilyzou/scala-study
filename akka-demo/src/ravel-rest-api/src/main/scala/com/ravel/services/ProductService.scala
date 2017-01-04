package com.ravel.services

import com.github.mauricio.async.db.ResultSet
import com.ravel.Config._
import com.ravel.async._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.resources.ProductSearchFilter
import com.ravel.schema.ProductObject._

import scala.concurrent.Future
import scala.collection.breakOut

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
    def infraQuery(id: Int) = s"select * from infrastructure where id=${id}"
    def infraDescQuery(id: Int) = s"select * from infrastructure_desc where infra_id=${id}"

    single(query) map { result =>
      import spray.json._
      result.get("hotel_info") match {
        case Some(x: String) => {
          val jsObject = x.parseJson.asJsObject
          val productHotel = jsObject.getFields("infraId", "infraName", "bookDay", "roomName", "bedType", "roomType") match {
            case Seq(JsNumber(infraId), JsString(infraName), JsNumber(bookDay), JsString(roomName), JsString(bedType), JsNumber(roomType)) => {
              ProductHotel(infraId.toInt, infraName, bookDay.toInt, roomName, bedType, roomType.toInt)
            }
            case _ => throw new DeserializationException("ProductHotel expected")
          }
          (result, Some(productHotel))
        }
        case None => (result, None)
      }
    } map { result =>
      val productHotel = result._2
      productHotel match {
        case Some(ph) => {
          for {
            infra <- single(infraQuery(ph.infraId))
            infraDescs <-
          }
        }
      }
    }
  }
  def getProductPrices(productId: Int): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from product_price_by_team where product_id=${productId}"
    queryFuture(query) { optionResultSet =>
      optionResultSet match {
        case Some(resultSet) if resultSet.size > 0 =>  {
          resultSet map { result =>
            resultSet.columnNames.map(x => (capitalizeName(x), result(x)))(breakOut).toMap
          }
        }
        case Some(resultSet) if resultSet.size == 0 => Seq.empty
        case None => Seq.empty
      }
    }
  }

}
