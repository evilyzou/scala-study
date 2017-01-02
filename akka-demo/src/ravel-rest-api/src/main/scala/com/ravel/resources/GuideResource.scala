package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server._
import com.ravel.resources.MyJsonSupport._
import com.ravel.services.GuideService
import spray.json._

/**
 * Created by CloudZou on 12/21/16.
 */
case class GuideSearchFilter(customType: Long, systemType: Long, guideType: Long,  mainCategory: String, subCategory: String) extends Pagination{
    override def start : Int = 0
    override def size: Int = 10
}

object GuideSearchFilter {
  val systemTypeMap = Map("SystemJapan" -> 1, "SystemJiangNan" ->2, "SystemOther" -> -1)
  var customTypeMap: Map[String, Int] = Map()
  customTypeMap += ("GuideCustomCH" ->1)
  customTypeMap += ("GuideCustomQY" ->2)
  customTypeMap += ("GuideCustomWM" ->3)
  customTypeMap += ("GuideCustomMS" ->4)
  customTypeMap += ("GuideCustomHX" ->5)
  customTypeMap += ("GuideCustomQJ" ->6)
  customTypeMap += ("GuideCustomQS" -> -1)
  customTypeMap += ("GuideCustomWQ" -> -1)
  val guideTypeMap = Map("GuideRecord" -> 1, "GuidePage" -> 2)

  def apply(systemType:String, customType: String, guideType: String,mainCategory: String = "", subCategory: String = "", start: Int = 0, size: Int = 10): GuideSearchFilter = {
    val begin = start * size
    val nubmer = size
    new GuideSearchFilter(systemTypeMap.getOrElse(systemType, 1),customTypeMap.getOrElse(customType, 1), guideTypeMap.getOrElse(guideType, 1), mainCategory, subCategory) {
      override def start = begin
      override def size = nubmer
    }
  }
}

trait GuideResource extends Directives{
  def guideRoutes: Route = pathPrefix("guide"){
    path("list") {
      get {
        parameters('systemType, 'customType, 'guideType, 'start ? 0, 'size ? 10) {
          (systemType, customType, guideType, start, size) => {
            val filter = GuideSearchFilter(customType, systemType, guideType, "", "")
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
