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
    esClient.execute { index into "bands" / "artists" fields "name"->"coldplay" }.await
    Thread.sleep(2000)

    // now we can search for the document we indexed earlier
    val resp = esClient.execute { search in "bands" / "artists"}.await
    println(resp)

    val searchFuture = esClient.execute {
      search in "ravel/product"
    }
    try {
      val t = searchFuture.await
    }catch {
      case e => {
        println(e)
      }
    }


    Future {
      val searchProducts: Seq[SearchProductView] = Nil
      searchFuture  onSuccess {
        case searchResult => {
          log.info(s"count:${searchResult.hits.length}")
          for( hit <- searchResult.hits) {
            val sourceMap = hit.sourceAsMap
            searchProducts :+ sourceMap
          }
        }
      }
      searchFuture onFailure {
        case t => log.error("An error occured happend:", t)
      }
      searchProducts
    }

  }
  def get(id: Int): Future[Option[ProductRow]] = {
    db.run(products.filter(_.id === id).result.headOption)
  }
}
