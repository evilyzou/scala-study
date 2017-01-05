package com.ravel

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


  val routes: Route = handleExceptions(customExceptionHandler) {
    productRoutes ~ testRoutes ~ guideRoutes ~ bannerRoutes
  }
}

