package com.ravel.resources

import akka.event.Logging.LogLevel
import akka.event.{LoggingAdapter, Logging}
import akka.http.scaladsl.model.{HttpRequest, HttpEntity, ContentTypes}
import akka.http.scaladsl.server.RouteResult.{Complete, Rejected}
import akka.http.scaladsl.server.directives.{LoggingMagnet, LogEntry, DebuggingDirectives}
import akka.http.scaladsl.server.{RouteResult, Directives, Route}
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.services.{ProductService, SettingService}
import com.ravel.resources.JsonResultRoute._
import JsonResultRoute.JsonResultKeys._
import spray.json._
import MyJsonSupport._

/**
 * Created by CloudZou on 12/9/2016.
 */

trait Pagination {
  def start: Int
  def size: Int
}
case class ProductSearchFilter(systemType: String, customType: String, pfunction: String, mainCategory: String, subCategory: String) extends Pagination{
  override def start : Int = 0
  override def size: Int = 10
}

object DebuggingSupport {
  DebuggingDirectives.logRequestResult("ravel-request")
  DebuggingDirectives.logRequestResult(("ravel-request", Logging.DebugLevel))

  def requestMethodAndResponseStatusAsInfo(req: HttpRequest): RouteResult => Option[LogEntry] = {
    case RouteResult.Complete(res) => Some(LogEntry(req.method.name + ": " + res.status, Logging.InfoLevel))
    case _ => None
  }
  DebuggingDirectives.logRequestResult(requestMethodAndResponseStatusAsInfo _)

//  val rejectionLogger: HttpRequest ? RouteResult ? Option[LogEntry] = req ? {
//    case Rejected(rejections) ? Some(LogEntry(s"Request: $req\nwas rejected with rejections:\n$rejections", Logging.DebugLevel))
//    case _                    ? None
//  }
//  DebuggingDirectives.logRequestResult(rejectionLogger)


  def printRequestMethodAndResponseStatus(req: HttpRequest)(res: RouteResult): Unit =
    println(requestMethodAndResponseStatusAsInfo(req)(res).map(_.obj.toString).getOrElse(""))
  val logRequestResultPrintln = DebuggingDirectives.logRequestResult(LoggingMagnet(_ => printRequestMethodAndResponseStatus))


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


}

trait ProductResource extends Directives {
  import DebuggingSupport._
  def productRoutes: Route = pathPrefix("product"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'pfunction, 'start ? 0, 'size ? 10) {
          (systemType, customType, pfunction, start, size) => {
            import JsonResultRoute._
            val filter = ProductSearchFilter(systemType, customType, pfunction, "", "")
            val listFuture = ProductSearch.queryProducts(filter)
            onSuccess(listFuture) {
              case list => {
                val map = (ResultJsonWithPage zip list.productIterator.toList).toMap
                val jsonResult: Result[Map[String, Any]] = Right(Success(map))
                complete(toStandardRoute(jsonResult))
              }
            }
          }
        }

      }
    }~
    path(IntNumber) { id =>
      get {
        import com.ravel.Config.executionContext

        val resultFuture = for {
          product <- ProductService.get(id)
          productExt <- ProductService.getProductExt(id)
          productOther <- ProductService.getProductOther(id)
          productPriceByTeams <- ProductService.getProductPrices(id)
        } yield {
            val pe = productExt._1 + ("feature" -> productExt._2)
            ProductView(product, pe, productOther, productPriceByTeams)
        }
        onSuccess(resultFuture) { case product =>{
            val map = Map(SingleDataJson.head -> product )
            val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
            complete(toStandardRoute(jsonResult))
          }
        }
      }
    } ~
    path("subCategorys") {
      get {
        parameters('mainCategory ? "guideCategoryJiangNan") {
          mainCategory => {
            val subCategoryFuture = SettingService.getSubCateogry(mainCategory)
            onSuccess(subCategoryFuture) {
              case list =>{
                val map = Map(SingleDataJson.head -> list )
                val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
                complete(toStandardRoute(jsonResult))
              }
            }
          }
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
