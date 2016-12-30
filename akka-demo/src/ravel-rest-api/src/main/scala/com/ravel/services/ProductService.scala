package com.ravel.services

import com.github.mauricio.async.db.ResultSet
import com.ravel.Config._
import com.ravel.async._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.resources.ProductSearchFilter
import com.ravel.schema.ProductObject._

import scala.concurrent.Future
import scala.collection.breakOut

/**
 * Created by CloudZou on 12/9/16.
 */
case class Product(map: Map[String, Any])

object ProductService {
  def list(filter: ProductSearchFilter) : Future[Seq[SearchProductView]] = {
    val start = filter.start * filter.size
    ProductSearch.queryProducts(filter)
  }

  def get(id: Int): Future[Map[String, Any]] = {
    val query = s"select * from product where id=${id}"
    single(query)
  }
  def getProductOther(productId: Int): Future[Map[String, Any]] = {
    val query = s"select * from product_other where product_id=${productId}"
    single(query)
  }

  def getProductExt(productId: Int): Future[Map[String, Any]] = {
    val query = s"select * from product_ext where product_id=${productId}"
    single(query)
  }
  def getProductPrices(productId: Int): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from product_price_by_team where product_id=${productId}"
    queryFuture(query) { optionResultSet =>
      optionResultSet match {
        case Some(resultSet) if resultSet.size > 0 =>  {
          val results: Seq[Map[String, Any]] = Seq.empty
          resultSet.map( result =>
            results :+ resultSet.columnNames.map(x => (capitalizeName(x), result(x)))(breakOut)
          )
          results
        }
        case Some(resultSet) if resultSet.size == 0 => Seq.empty
        case None => Seq.empty
      }
    }
  }

  def single(query: String): Future[Map[String, Any]] = {
    queryFuture(query) { optionResultSet =>
      optionResultSet match {
        case Some(resultSet) if resultSet.size > 0 =>  {
          resultSet.columnNames.map(x => (capitalizeName(x), resultSet(0)(x)))(breakOut)
        }
        case Some(resultSet) if resultSet.size == 0 => Map.empty
        case None => Map.empty
      }
    }
  }

  private[this] def capitalizeName(columnName: String): String = {
    val cn = columnName.split('_').map(_.capitalize).mkString("")
    Character.toLowerCase(cn.charAt(0)) + cn.substring(1)
  }

  def queryFuture[T](query: String)(resultFunc: (Option[ResultSet]) => T): Future[T] = {
    RavelDB.withPool { session =>
      val future = session.connection.sendQuery(query)
      future map { queryResult => resultFunc(queryResult.rows) }
    }
  }

}
