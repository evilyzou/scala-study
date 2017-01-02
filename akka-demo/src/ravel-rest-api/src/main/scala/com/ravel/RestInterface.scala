package com.ravel

import akka.http.scaladsl.server.Route
import com.ravel.resources.{BannerResource, GuideResource, ProductResource}

trait Resources extends ProductResource
with GuideResource
with BannerResource

/**
 * Created by CloudZou on 12/9/2016.
 */
object RestInterface extends Resources {
  val routes: Route = productRoutes ~ testRoutes ~ guideRoutes ~ bannerRoutes

}

