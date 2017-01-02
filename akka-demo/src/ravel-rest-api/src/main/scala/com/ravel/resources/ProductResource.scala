package com.ravel.resources

import akka.http.scaladsl.model.{HttpEntity, ContentTypes}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.elasticsearch.ProductSearch
import com.ravel.schema.ProductObject.{SearchProductView, ProductView}
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
case class ProductSearchFilter(systemType: Int, customType: Int, pfunction: String, mainCategory: String, subCategory: String) extends Pagination{
  override def start : Int = 0
  override def size: Int = 10
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
  def apply(systemType:String, customType: String, pfunction: String,mainCategory: String = "", subCategory: String = "", start: Int = 0, size: Int = 10): ProductSearchFilter = {
    val begin = start * size
    val nubmer = size
    new ProductSearchFilter(systemTypeMap.get(systemType).getOrElse(-1),
                          customTypeMap.get(customType).getOrElse(-1), pfunction, mainCategory, subCategory) {
      override def start = begin
      override def size = nubmer
    }
  }
}


trait ProductResource extends Directives {
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction, 'start ? 0, 'size ? 10) {
          (systemType, customType, pfunction, start, size) => {
            import JsonResultRoute._
            val filter = ProductSearchFilter(systemType,customType, pfunction)
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
          ProductView(product, productExt, productOther, productPriceByTeams)
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
