package com.ravel.resources

import akka.http.scaladsl.model.{HttpEntity, ContentTypes}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.services.{ProductService, SettingService}
import com.ravel.resources.JsonResultRoute._
import JsonResultRoute.JsonResultKeys._
import spray.json._
import MyJsonSupport._

/**
 * Created by CloudZou on 12/9/2016.
 */

trait Pagination {
  def start: Int
  def size: Int
}
case class ProductSearchFilter(systemType: String, customType: String, pfunction: String, mainCategory: String, subCategory: String) extends Pagination{
  override def start : Int = 0
  override def size: Int = 10
}

trait ProductResource extends Directives {
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction, 'start ? 0, 'size ? 10) {
          (systemType, customType, pfunction, start, size) => {
            import JsonResultRoute._
            val filter = ProductSearchFilter(systemType,customType, pfunction, "", "")
            val listFuture = ProductSearch.queryProducts(filter)
            onSuccess(listFuture) {
              case list =>{
                val map = (ResultJsonWithPage zip list.productIterator.toList).toMap
                val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
                complete(toStandardRoute(jsonResult))
              }
            }
          }
        }
      }
    }~
    path(IntNumber) { id =>
      get {
        import com.ravel.Config.executionContext

        val resultFuture = for {
          product <- ProductService.get(id)
          productExt <- ProductService.getProductExt(id)
          productOther <- ProductService.getProductOther(id)
          productPriceByTeams <- ProductService.getProductPrices(id)
        } yield {
            val pe = productExt._1 + ("feature" -> productExt._2)
            ProductView(product, pe, productOther, productPriceByTeams)
        }
        onSuccess(resultFuture) { case product =>{
            val map = Map(SingleDataJson.head -> product )
            val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
            complete(toStandardRoute(jsonResult))
          }
        }
      }
    } ~
    path("subCategorys") {
      get {
        parameters('mainCategory ? "guideCategoryJiangNan") {
          mainCategory => {
            val subCategoryFuture = SettingService.getSubCateogry(mainCategory)
            onSuccess(subCategoryFuture) {
              case list =>{
                val map = Map(SingleDataJson.head -> list )
                val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
                complete(toStandardRoute(jsonResult))
              }
            }
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
