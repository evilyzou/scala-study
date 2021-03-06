package com.ravel.resources

import akka.http.scaladsl.server._
import com.ravel.services.{Banner}
import com.ravel.util.JsonResult._
import com.ravel.util.JsonResult.JsonResultKeys._
import spray.json._
import com.ravel.resources.RavelJsonSupport._
import com.ravel.Config._
import akka.pattern.ask

/**
 * Created by CloudZou on 1/2/17.
 */
trait BannerResource extends Directives{
  def bannerRoutes: Route = pathPrefix("banner"){
    path("list") {
      get {
        val listFuture = (banner ? Banner.GetIndexBannerQuery).mapTo[Seq[Map[String,Any]]]
        onSuccess(listFuture) {
          case list =>{
            val listTuple = (list.size, list)
            val map = (ResultJsonWithPage zip listTuple.productIterator.toList).toMap
            val jsonResult: JsonResult[Map[String, Any]]  = Right(JsonResultSuccess(map))
            complete(jsonResult.toJson)
          }
        }
        }
      }
    }
}
