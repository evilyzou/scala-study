package com.ravel

import akka.event.{LoggingAdapter, Logging}
import akka.event.Logging.LogLevel
import akka.http.scaladsl.model.{HttpEntity, HttpRequest}
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.RouteResult.Complete
import akka.http.scaladsl.server.directives.{LoggingMagnet, LogEntry, DebuggingDirectives}
import akka.stream.{ActorMaterializer, Materializer}
import akka.stream.scaladsl.Sink
import com.ravel.resources.ProductResource
import com.ravel.resources.GuideResource

import scala.concurrent.{Future, ExecutionContext}

trait Resources extends ProductResource
with GuideResource

/**
 * Created by CloudZou on 12/9/2016.
 */
object RestInterface extends Resources {
  val routes: Route = productRoutes ~ testRoutes


}

