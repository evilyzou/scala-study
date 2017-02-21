package com.ravel

import akka.actor.ActorContext
import akka.event.Logging.LogLevel
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.server.ExceptionHandler
import akka.http.scaladsl.server.ExceptionHandler
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.RouteResult.{Rejected, Complete}
import akka.http.scaladsl.server.directives.{LoggingMagnet, DebuggingDirectives, LogEntry}
import akka.http.scaladsl.server.{ExceptionHandler, Route}
import com.ravel.resources.{BannerResource, GuideResource, ProductResource}
import akka.http.scaladsl.model._
import akka.http.scaladsl.model.StatusCodes._
import com.ravel.Config.log
import spray.json.{JsString, JsNumber, JsObject}

trait Resources extends ProductResource
with GuideResource
with BannerResource

/**
 * Created by CloudZou on 12/9/2016.
 */
object RestInterface extends Resources {
  val customExceptionHandler = ExceptionHandler {
    case e: Exception =>
      extractRequest { req =>
        val msg =
          s"""\nmethod: ${req.method}
             |uri: ${req.uri}
             |headers:
             |\t${req.headers.mkString("\n\t")}
             |$e""".stripMargin
        log.error(msg, e)

        complete(HttpResponse(StatusCodes.InternalServerError, entity = JsObject("errcode" -> JsNumber(500), "errmsg" -> JsString(e.getMessage)).toString))
      }
  }

  def akkaResponseTimeLoggingFunction(
                                       loggingAdapter:   LoggingAdapter,
                                       requestTimestamp: Long,
                                       level:            LogLevel       = Logging.DebugLevel)(req: HttpRequest)(res: Any): Unit = {
    val entry = res match {
      case Complete(resp) =>
        val responseTimestamp: Long = System.nanoTime
        val elapsedTime: Long = (responseTimestamp - requestTimestamp) / 1000000
        val loggingString = s"""Logged Request:${req.method}:${req.uri}:${resp.status}:${elapsedTime}"""
        LogEntry(loggingString, level)
      case Rejected(reason) =>
        LogEntry(s"Rejected Reason: ${reason.mkString(",")}", level)
    }
    entry.logTo(loggingAdapter)
  }
  def printResponseTime(log: LoggingAdapter) = {
    val requestTimestamp = System.nanoTime
    akkaResponseTimeLoggingFunction(log, requestTimestamp)(_)
  }

  val logResponseTime = DebuggingDirectives.logRequestResult(LoggingMagnet(printResponseTime(_)))


  def routes(context: ActorContext): Route = handleExceptions(customExceptionHandler) {
    logResponseTime {
      productRoutes  ~ guideRoutes ~ bannerRoutes
    }
  }
}

