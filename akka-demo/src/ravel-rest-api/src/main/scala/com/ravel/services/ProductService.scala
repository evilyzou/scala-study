package com.ravel.services

import com.ravel.Config._
import com.ravel.schema.Actions._
import com.ravel.schema.Actions.jdbcDriver.api._
import com.ravel.schema.ProductObject._
import com.ravel.schema.Tables._
import com.sksamuel.elastic4s.ElasticDsl._

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService{
  def list : Future[Seq[SearchProductView]] = {
    val searchFuture = esClient.execute {
      search("ravel" / "product").query("*")
    }

    Future {
      val searchProducts: Seq[SearchProductView] = Nil
      searchFuture map {
        searchResult => {
          log.info(s"count:${searchResult.hits.length}")
          for( hit <- searchResult.hits) {
            val sourceMap = hit.sourceAsMap
            searchProducts :+ sourceMap
          }
        }
      }
      searchProducts
    }

  }
  def get(id: Int): Future[Option[ProductRow]] = {
    db.run(products.filter(_.id === id).result.headOption)
  }
}
