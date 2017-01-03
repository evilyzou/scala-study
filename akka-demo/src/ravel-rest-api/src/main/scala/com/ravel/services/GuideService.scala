package com.ravel.services

import com.ravel.resources.GuideSearchFilter
import com.ravel.schema.GuideObject.GuideView
import com.ravel.elasticsearch.GuideSearch

import scala.collection._
import scala.concurrent.Future
import scala.collection.immutable.Map

/**
 * Created by CloudZou on 12/13/16.
 */
object GuideService extends QueryService{
  def list(filter: GuideSearchFilter) = {
    GuideSearch.queryGuides(filter)
  }

  def get(id: Int): Future[Map[String, Any]] = {
    val query = s"select * from guide where id=${id}"
    single(query)
  }

}
