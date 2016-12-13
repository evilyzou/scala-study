package com.ravel.resources

import akka.http.scaladsl.model.{HttpEntity, ContentTypes}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.services.ProductService
import spray.json._
import MyJsonSupport._

/**
 * Created by CloudZou on 12/9/2016.
 */
trait ProductResource extends Directives{
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        val flist = ProductService.list
        onSuccess(flist) {
          case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
          //          case None => complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Say hello to akka-http</h1>"))
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
}
