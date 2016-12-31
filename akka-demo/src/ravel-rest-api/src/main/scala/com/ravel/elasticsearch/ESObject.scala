package com.ravel.elasticsearch

import java.net.InetAddress

import com.ravel.Config
import com.ravel.resources.{GuideSearchFilter, ProductSearchFilter}
import com.ravel.schema.GuideObject.GuideView
import com.ravel.schema.ProductObject.SearchProductView
import org.elasticsearch.action.search.{SearchResponse, SearchType}
import org.elasticsearch.client.Client
import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.index.query.QueryBuilders

import scala.collection.JavaConversions._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

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

  def queryProducts(filter: ProductSearchFilter): Future[Seq[SearchProductView]] = {
    val builder = client.prepareSearch(Config.esIndex)
                  .setTypes(Config.esTypeProduct)
                  .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                  .setFrom(filter.start)
                  .setSize(filter.size)
                  .setExplain(false)

    val boolQueryBuilder = QueryBuilders.boolQuery()
    boolQueryBuilder.must(QueryBuilders.termQuery("systemType", filter.systemType))
    boolQueryBuilder.must(QueryBuilders.termQuery("customType", filter.customType))
    boolQueryBuilder.must(QueryBuilders.termQuery("pfunction", filter.pfunction))
    if(!filter.mainCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.termQuery("mainCategory", filter.mainCategory))
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
      import com.ravel.schema.ProductObject._
      response.getHits.getHits.toSeq.map(e=>mapToSearchProduct(e.sourceAsMap().toMap))
    }

    responses recover { case cause => throw new Exception("Something went wrong", cause) }
    responses
  }
}

object GuideSearch {
  import ESClient._

  def queryGuides(filter: GuideSearchFilter): Future[Seq[GuideView]] = {
    val builder = client.prepareSearch(Config.esIndex)
      .setTypes(Config.esTypeGuide)
      .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
      .setFrom(filter.start)
      .setSize(filter.size)
      .setExplain(false)

    val boolQueryBuilder = QueryBuilders.boolQuery()
    boolQueryBuilder.must(QueryBuilders.termQuery("systemType", filter.systemType))
    boolQueryBuilder.must(QueryBuilders.termQuery("customType", filter.customType))
    boolQueryBuilder.must(QueryBuilders.termQuery("guideType", filter.guideType))
    if(!filter.mainCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.termQuery("mainCategory", filter.mainCategory))
    }

    if(!filter.subCategory.isEmpty) {
      boolQueryBuilder.must(QueryBuilders.queryStringQuery(filter.subCategory).field("subCategory"))
    }

    builder.setQuery(boolQueryBuilder)

    val respFuture = RequestExecutor[SearchResponse].execute(builder)


    val responses = respFuture.map { response =>
      import com.ravel.schema.GuideObject._
      response.getHits.getHits.toSeq.map(e=>mapToSearchGuide(e.sourceAsMap().toMap))
    }
    responses
  }
}
