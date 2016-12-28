package com.ravel.services

import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.resources.ProductSearchFilter
import com.ravel.schema.ProductObject._
import scalikejdbc._
import scalikejdbc.async.{ShortenedNames, _}

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/16.
 */
case class Product(map: Map[String, Any])

object ProductService extends SQLSyntaxSupport[Product] with ShortenedNames{
  override val columnNames = Seq("id", "title")
  override val tableName = "product"
  lazy val p = ProductService.syntax("p")

  def list(filter: ProductSearchFilter) : Future[Seq[SearchProductView]] = {
    val start = filter.start * filter.size
    ProductSearch.queryProducts(filter)
  }

//  def get2(id: Int): Future[Option[Product]] = {
//    AsyncDB withPool { implicit s =>
//      withSQL {
//        select(p.result.id, p.result.title).from(ProductService as p).where.eq(p.id, id).orderBy(p.id)
//      }.map(ProductService.apply(p)).single.future
//    }
//  }

  def get(id: Int): Future[Map[String, Any]] = {
    AsyncDB.withPool { implicit session =>
      val future = session.connection.sendQuery(s"select * from product where id=${id}")
      future map { queryResult => queryResult.rows match {
          case Some(resultSet) => {
            val rs = resultSet.asInstanceOf[WrappedResultSet]
            (1 to rs.metaData.getColumnCount).foldLeft(Map[String, Any]()) { (result, i) =>
              val label = rs.metaData.getColumnLabel(i)
              Option(rs.any(label)).map { value => result + (label -> value) }.getOrElse(result)
            }
          }
          case None => Map.empty
        }
      }
    }
  }
  def apply(p: SyntaxProvider[Product])(rs: WrappedResultSet): Product = apply(p.resultName)(rs)
  def apply(p: ResultName[Product])(rs: WrappedResultSet): Product = new Product(rs.toMap())

}
