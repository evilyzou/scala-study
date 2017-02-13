package com.ravel.resources

import akka.actor.{ActorContext, Props}
import akka.event.Logging.LogLevel
import akka.event.{LoggingAdapter, Logging}
import akka.http.scaladsl.model.{HttpRequest, HttpEntity, ContentTypes}
import akka.http.scaladsl.server.RouteResult.{Complete, Rejected}
import akka.http.scaladsl.server.directives.{LoggingMagnet, LogEntry, DebuggingDirectives}
import akka.http.scaladsl.server.{RouteResult, Directives, Route}
import com.ravel.elasticsearch.ProductSearch
import com.ravel.model.RavelObject._
import com.ravel.services.Mediator.GetProductCommand
import com.ravel.services.{SettingService}
import com.ravel.resources.JsonResultRoute._
import JsonResultRoute.JsonResultKeys._
import spray.json._
import RavelJsonSupport._
import com.ravel.Config._

import scala.concurrent.Future
import akka.pattern._

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

trait ProductResource extends Directives{
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
        val resultFuture = (mediator ? GetProductCommand(id)).mapTo[Option[ProductView]]
        onSuccess(resultFuture) { case Some(product) =>{
          val map = Map(SingleDataJson.head -> product )
          val jsonResult: Result[Map[String, ProductView]]  = Right(Success(map))
//          log.info(s"jsonResult:${jsonResult}")
          complete(toStandardRoute2(jsonResult))
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

//  def testRoutes(context: ActorContext) =
//    path("hello") {
//      get {
////        complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>say hello to akka-http</h1>"))
//        import RequestHandler._
//        imperativelyComplete { ctx =>
//          context.actorOf(Props[RequestHandler]) ! RequestHandler.Handle(ctx)
//        }
//      }
//    }
}
