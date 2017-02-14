package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server._
import com.ravel.message.MessageObject.GuideMessageObject.GuideList
import com.ravel.resources.RavelJsonSupport._
import com.ravel.model.RavelObject._
import com.ravel.services.Mediator.{GetGuideCommand, GuideSearchCommand}
import spray.json._
import com.ravel.Config._
import akka.pattern.ask
import com.ravel.util.JsonResult._
import com.ravel.util.JsonResult.JsonResultKeys._

/**
 * Created by CloudZou on 12/21/16.
 */
case class GuideSearchFilter(customType: String, systemType: String, guideType: String,  mainCategory: String, subCategory: String) extends Pagination{
    override def start : Int = 0
    override def size: Int = 10
}

trait GuideResource extends Directives{
  def guideRoutes: Route = pathPrefix("guide"){
    path("list") {
      get {
        parameters('systemType ? "SystemJiangNan", 'customType ? "GuideCustomQY", 'guideType ? "GuideRecord",
            'mainCategory ? "", 'subCategory ? "", 'start ? 0, 'size ? 10) {
          (systemType, customType, guideType, mainCategory, subCategory, start, size) => {
            val filter = GuideSearchFilter(customType, systemType, guideType, mainCategory, subCategory)
            val resultFuture = (mediator ? GuideSearchCommand(filter)).mapTo[Tuple2[Long, Seq[SearchGuideView]]]
            onSuccess(resultFuture) {
              case list => {
                val map = (ResultJsonWithPage zip list.productIterator.toList).toMap
                val jsonResult: JsonResult[Map[String, Any]]  = Right(JsonResultSuccess(map))
                complete(jsonResult.toJson)
              }
            }
          }
        }
      }
    } ~
    path(IntNumber) { id =>
      get {
        val guideResult = (mediator ? GetGuideCommand(id)).mapTo[GuideView]
        onSuccess(guideResult) {
          case guide =>{
            val map = Map(SingleDataJson.head -> guide )
            val jsonResult: JsonResult[Map[String, Any]]  = Right(JsonResultSuccess(map))
            complete(jsonResult.toJson)
          }
        }
      }
    }
  }
}
