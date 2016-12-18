package com.ravel

import akka.http.scaladsl.server.Route
import com.ravel.resources.ProductResource

/**
 * Created by CloudZou on 12/9/2016.
 */
object RestInterface extends Resources {
  val routes: Route = productRoutes
}

trait Resources extends ProductResource