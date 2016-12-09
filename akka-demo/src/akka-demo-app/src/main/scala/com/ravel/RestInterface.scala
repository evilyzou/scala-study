package com.ravel

import akka.http.scaladsl.server.Route
import com.ravel.resources.ProductResource

import scala.concurrent.ExecutionContext

/**
 * Created by CloudZou on 12/9/2016.
 */
trait RestInterface extends Resources {
  implicit def executionContext: ExecutionContext

  val routes: Route = productRoutes
}

trait Resources extends ProductResource