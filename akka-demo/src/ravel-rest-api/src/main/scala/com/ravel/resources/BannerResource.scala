package com.ravel.resources

import akka.http.scaladsl.server._
import com.ravel.resources.JsonResultRoute.JsonResultKeys._
import com.ravel.services.BannerService

/**
 * Created by CloudZou on 1/2/17.
 */
trait BannerResource extends Directives{
  def bannerRoutes: Route = pathPrefix("banner"){
    path("list") {
      get {
        import JsonResultRoute._
        val listFuture = BannerService.getActiveBanners()
        onSuccess(listFuture) {
          case list =>{
            val listTuple = (list.size, list)
            val map = (ResultJsonWithPage zip listTuple.productIterator.toList).toMap
            val jsonResult: Result[Map[String, Any]]  = Right(Success(map))
            complete(toStandardRoute(jsonResult))
          }
        }
        }
      }
    }
}
