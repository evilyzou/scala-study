package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server._
import com.ravel.message.MessageObject.GuideMessageObject.GuideList
import com.ravel.resources.JsonResultRoute.JsonResultKeys._
import com.ravel.resources.JsonResultRoute._
import com.ravel.resources.RavelJsonSupport._
import com.ravel.services.GuideService
import com.ravel.model.RavelObject._
import spray.json._
import com.ravel.Config._
import akka.pattern.ask

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
//            val flist = GuideService.list(filter)
            val res = ravelActor ? GuideList(filter)
            onSuccess(res) {
              case r => {
                val list = r.asInstanceOf[Tuple2[Long, Seq[SearchGuideView]]]
                val map = (ResultJsonWithPage zip list.productIterator.toList).toMap
                val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
                complete(toStandardRoute(jsonResult))
              }
            }
          }
        }
      }
    } ~
      path(IntNumber) { id =>
        get {
          import com.ravel.Config.executionContext

          val guideResult = for(guideFuture <- GuideService.get(id)) yield guideFuture
          onSuccess(guideResult) {
            case guide =>{
              val map = Map(SingleDataJson.head -> guide )
              val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
              complete(toStandardRoute(jsonResult))
            }
          }
        }
      }
  }
}
