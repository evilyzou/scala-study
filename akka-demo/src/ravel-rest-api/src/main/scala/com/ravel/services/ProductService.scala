package com.ravel.services

import java.lang.Exception
import java.net.InetAddress

import com.ravel.Config._
import com.ravel.schema.Actions._
import com.ravel.schema.Actions.jdbcDriver.api._
import com.ravel.schema.ProductObject._
import com.ravel.schema.Tables._
import com.sksamuel.elastic4s.ElasticDsl._
import org.elasticsearch.action.search.{SearchResponse, SearchType, SearchRequestBuilder}
import org.elasticsearch.client.Client
import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.index.query.QueryBuilders

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService{
  def list : Future[Seq[SearchProductView]] = {
    val searchFuture = esClient.execute {
      search in esIndex / esTypeProduct query { termQuery("pfunction", "group") }
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
}
