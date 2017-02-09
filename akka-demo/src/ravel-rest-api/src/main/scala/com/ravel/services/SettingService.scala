package com.ravel.services

import scala.collection.immutable.Map
import scala.concurrent.Future
import scala.collection.breakOut

/**
 * Created by CloudZou on 12/31/16.
 */
object SettingService extends QueryActor{
  def getSubCateogry(mainCategory: String): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from system_constant where const_key='guideSubCategory' and const_category='${mainCategory}'"
    mulptile(query)
  }
}
