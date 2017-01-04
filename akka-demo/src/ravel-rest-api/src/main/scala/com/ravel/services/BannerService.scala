package com.ravel.services

import scala.collection._
import scala.collection.immutable.Map
import scala.concurrent.Future

/**
 * Created by CloudZou on 1/2/17.
 */
object BannerService extends QueryService{
  def getActiveBanners(): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from banner where status=0"
    mulptile(query)
  }
}
