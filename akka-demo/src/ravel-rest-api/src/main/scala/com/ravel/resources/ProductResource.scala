package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.elasticsearch.ProductSearch
import com.ravel.schema.ProductObject.ProductView
import com.ravel.services.ProductService
import MyJsonSupport._
import spray.json._


/**
 * Created by CloudZou on 12/9/2016.
 */

trait Pagination {
  def start: Int
  def size: Int
}
case class ProductSearchFilter(systemType: Int, customType: Int, pfunction: String, mainCategory: String, subCategory: String) extends Pagination{
  def start : Int = 0
  def size: Int = 10
}
object ProductSearchFilter {
  val systemTypeMap = Map("SystemJapan" -> 1, "SystemJiangNan" ->2, "SystemOther" -> -1)
  var customTypeMap: Map[String, Int] = Map()
  customTypeMap += ("CustomGG" ->1)
  customTypeMap += ("CustomHX" ->2)
  customTypeMap += ("CustomDC" ->3)
  customTypeMap += ("CustomQX" ->4)
  customTypeMap += ("CustomQS" ->5)
  customTypeMap += ("CustomXX" ->6)
  customTypeMap += ("CustomOther" -> -1)
  def apply(systemType:String, customType: String, pfunction: String): ProductSearchFilter = {
    new ProductSearchFilter(systemTypeMap.get(systemType).getOrElse(-1),
                          customTypeMap.get(customType).getOrElse(-1), pfunction, "", "")
  }
}

trait ProductResource extends Directives{
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction, 'start ? 0, 'size ? 10) {
          (systemType, customType, pfunction, start, size) => {
            val filter = ProductSearchFilter(systemType,customType, pfunction)
            val listFuture = ProductSearch.queryProducts(filter)
            onSuccess(listFuture) {
              case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
            }
          }
        }
      }
    }
    path(IntNumber) { id =>
      get {
        import com.ravel.Config.executionContext

        val resultFuture = for {
          product <- ProductService.get(id)
//          productExt <- ProductService.getProductExt(id)
//          productOther <- ProductService.getProductOther(id)
//          productPriceByTeams <- ProductService.getProductPrices(id)
        } yield {
          product
        }
        onSuccess(resultFuture) {
          case Some(product) =>{
            complete(HttpEntity(ContentTypes.`application/json`, product.toJson.compactPrint.getBytes("UTF-8")))
          }
        }
      }
    }
  }

  def testRoutes =
    path("hello") {
      get {
        complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>say hello to akka-http</h1>"))
      }
    }

}
