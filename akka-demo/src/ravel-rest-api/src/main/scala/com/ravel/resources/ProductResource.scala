package com.ravel.resources

import akka.actor.ActorLogging
import akka.http.scaladsl.model.{HttpEntity, ContentTypes}
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.ActorMaterializer
import com.ravel.services.ProductService
import spray.json._
import MyJsonSupport._
import com.ravel.Config._

/**
 * Created by CloudZou on 12/9/2016.
 */

sealed trait Pagination {
  def start: Int
  def size: Int
}
case class ProductSearchFilter(customType: String, systemType: String, pfunction: String)

trait ProductResource extends Directives{
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction) { (systemType, customType, pfunction) =>
          val flist = ProductService.list
          onSuccess(flist) {
            case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
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
