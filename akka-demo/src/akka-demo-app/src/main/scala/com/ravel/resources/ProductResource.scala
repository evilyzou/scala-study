package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.ravel.AppEnvironment
import com.ravel.routing.MyResource

/**
 * Created by CloudZou on 12/9/2016.
 */
trait ProductResource extends MyResource with AppEnvironment{
  def productRoutes = path("hello") {
    get {
      log.info("get message info here")
      complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Say hello to akka-http</h1>"))
    }
  }
}

case class Product(val name: String)
