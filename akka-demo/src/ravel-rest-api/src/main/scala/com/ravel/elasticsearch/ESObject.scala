package com.ravel.elasticsearch

import java.net.InetAddress

import com.ravel.Config
import com.ravel.resources.{GuideSearchFilter, ProductSearchFilter}
import org.elasticsearch.action.search.{SearchResponse, SearchType}
import org.elasticsearch.client.Client
import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.index.query.QueryBuilders

import scala.collection.JavaConversions._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import com.ravel.util.MapConverterImplicits._
import com.ravel.model.RavelObject._

/**
 * Created by CloudZou on 12/27/2016.
 */
object ESClient {
  def getClient(host: String, port: Int): Client = {
    TransportClient.builder().build().addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(host), port))
  }
  lazy val client = getClient(Config.esHost, Config.esPort)
}

object ProductSearch {
  import ESClient._

  def queryProducts(filter: ProductSearchFilter) = {
    val builder = client.prepareSearch(Config.esIndex)
                  .setTypes(Config.esTypeProduct)
                  .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                  .setFrom(filter.start)
                  .setSize(filter.size)
                  .setExplain(false)

    val boolQueryBuilder = QueryBuilders.boolQuery()
    boolQueryBuilder.must(QueryBuilders.termQuery("systemType", filter.systemType.toLowerCase))
    boolQueryBuilder.must(QueryBuilders.termQuery("customType", filter.customType.toLowerCase))
    boolQueryBuilder.must(QueryBuilders.termQuery("pfunction", filter.pfunction.toLowerCase))
    if(!filter.mainCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.queryStringQuery(filter.mainCategory).field("mainCategory"))
    }

    if(!filter.subCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.queryStringQuery(filter.subCategory).field("subCategory"))
    }

    builder.setQuery(boolQueryBuilder)

    val respFuture = RequestExecutor[SearchResponse].execute(builder)

    respFuture onFailure {
      case casue => { println("xx"); casue}
    }

    val responses = respFuture.map { response =>
      val hits = response.getHits
      (hits.totalHits(), hits.getHits.toSeq.map(e=>e.sourceAsMap().toMap.convert[SearchProductView]))
    }

    responses recover { case cause => throw new Exception("Something went wrong", cause) }
    responses
  }
}

object GuideSearch {
  import ESClient._

  def queryGuides(filter: GuideSearchFilter) = {
    val builder = client.prepareSearch(Config.esIndex)
      .setTypes(Config.esTypeGuide)
      .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
      .setFrom(filter.start)
      .setSize(filter.size)
      .setExplain(false)

    val boolQueryBuilder = QueryBuilders.boolQuery()
    boolQueryBuilder.must(QueryBuilders.termQuery("systemType", filter.systemType.toLowerCase))
    boolQueryBuilder.must(QueryBuilders.termQuery("customType", filter.customType.toLowerCase))
    boolQueryBuilder.must(QueryBuilders.termQuery("guideType", filter.guideType.toLowerCase))
    if(!filter.mainCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.queryStringQuery(filter.mainCategory).field("mainCategory"))
    }

    if(!filter.subCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.queryStringQuery(filter.subCategory).field("subCategory"))
    }

    builder.setQuery(boolQueryBuilder)

    val respFuture = RequestExecutor[SearchResponse].execute(builder)


    respFuture.map { response =>
      val hits = response.getHits
      (hits.totalHits, hits.getHits.toSeq.map(e=>e.sourceAsMap().toMap.convert[SearchGuideView]))
    }
  }
}
