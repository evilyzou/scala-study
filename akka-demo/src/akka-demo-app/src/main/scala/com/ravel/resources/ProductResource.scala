package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.{Directives, Route}
import com.ravel.AppEnvironment
import com.ravel.services.ProductService
import spray.json._

/**
 * Created by CloudZou on 12/9/2016.
 */
trait ProductResource extends Directives{
  def productRoutes: Route = {
    get {
      path("product/list") {
        //        complete(ProductService.list)
        val flist = ProductService.list
        onSuccess(flist) {
          case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
          //          case None => complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Say hello to akka-http</h1>"))
        }
      }

    }
  }
}
