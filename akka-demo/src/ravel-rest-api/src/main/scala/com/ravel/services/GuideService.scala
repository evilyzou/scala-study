package com.ravel.services

import com.ravel.Config._
import com.ravel.resources.GuideSearchFilter
import com.ravel.schema.GuideObject.{GuideView, _}
import com.sksamuel.elastic4s.ElasticDsl._

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/13/16.
 */
object GuideService {
  def list(filter: GuideSearchFilter) : Future[Seq[GuideView]] = {
    val start = filter.start * filter.size
    val searchFuture = esClient.execute {
      search in esIndex / esTypeGuide query {
        termQuery("guideType", filter.guideType)
        termQuery("systemType", filter.systemType)
        termQuery("customType", filter.customType)
      } start(start) limit(filter.size)
    }
    searchFuture onFailure {
      case e => log.error("An error has occured:" + e.getMessage)
    }
    searchFuture map {
      searchResult =>{
        searchResult.hits.map(e => mapToSearchGuide(e.sourceAsMap))
      }
    }
  }
}
