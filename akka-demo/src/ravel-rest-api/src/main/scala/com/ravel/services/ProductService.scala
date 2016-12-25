package com.ravel.services

import java.sql.Timestamp
import java.util.Date

import com.ravel.Config._
import com.ravel.resources.ProductSearchFilter
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
  def list(f: ProductSearchFilter) : Future[Seq[SearchProductView]] = {
    val start = f.start * f.size
    log.info(s"c:${filter}")
    val searchFuture = esClient.execute {
      search in esIndex / esTypeProduct query {
        bool {
          must {
            termQuery("pfunction", f.pfunction)
          } filter(termQuery("systemType", f.systemType))

        }
      } start(start) limit(filter.size)
    }
    searchFuture onFailure {
      case e => log.error("An error has occured:" + e.getMessage)
    }
    searchFuture map {
      searchResult =>{
        searchResult.hits.map(e => mapToSearchProduct(e.sourceAsMap))
      }
    }
  }
  def get(id: Int): Future[Option[ProductRow]] = {
    db.run(products.filter(_.id === id).result.headOption)
  }
  def getProductExt(id: Int): Future[Option[ProductExtRow]] = {
    db.run(productExts.filter(_.productId === id).result.headOption)
  }
  def getProductOther(id: Int): Future[Option[ProductOtherRow]] = {
    db.run(productOthers.filter(_.productId === id).result.headOption)
  }

  def getProductPrices(id: Int): Future[Seq[ProductPriceByTeamRow]] = {
    val date = new Date()
    val now = new Timestamp(date.getTime)
    db.run(productPriceByTeams.filter(_.productId === id).filter(_.takeOffDate > now).result)
  }
}
