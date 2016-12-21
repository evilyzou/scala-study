package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.resources.MyJsonSupport._
import com.ravel.services.ProductService
import spray.json._

/**
 * Created by CloudZou on 12/9/2016.
 */

sealed trait Pagination {
  def start: Int
  def size: Int
}
case class ProductSearchFilter(customType: String, systemType: String, pfunction: String) extends Pagination{
  def unapply(customType: String, systemType: String, pfunction: String, start:Int, size: Int): Option[ProductSearchFilter] = {
    Some(ProductSearchFilter(customType, systemType, pfunction))
  }
  def start : Int = 0
  def size: Int = 10
}

trait ProductResource extends Directives{
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction, 'start ? 0, 'size ? 10) {
          case filter: ProductSearchFilter => {
              val flist = ProductService.list(filter)
              onSuccess(flist) {
                case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
              }
          }
        }
      }
    }~
    path(IntNumber) { id =>
      get {
        val productFuture = ProductService.get(id)
        onSuccess(productFuture) {
          case product => complete(HttpEntity(ContentTypes.`application/json`, product.toJson.compactPrint.getBytes("UTF-8")))
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
