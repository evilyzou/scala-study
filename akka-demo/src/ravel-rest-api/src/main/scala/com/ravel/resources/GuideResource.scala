package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server._
import com.ravel.resources.MyJsonSupport._
import com.ravel.services.GuideService
import spray.json._

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
        parameters('systemType, 'customType, 'guideType, 'start ? 0, 'size ? 10) {
          (systemType, customType, guideType, start, size) => {
            val filter = GuideSearchFilter.tupled((customType, systemType, guideType, "", ""))
            val flist = GuideService.list(filter)
            onSuccess(flist) {
              case list => complete(HttpEntity(ContentTypes.`application/json`, list.toJson.compactPrint.getBytes("UTF-8")))
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
              complete(HttpEntity(ContentTypes.`application/json`, guide.toJson.compactPrint.getBytes("UTF-8")))
            }
          }
        }
      }
  }
}
