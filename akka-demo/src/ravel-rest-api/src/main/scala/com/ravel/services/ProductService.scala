package com.ravel.services

import java.sql.Timestamp
import java.util.Date

import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.resources.ProductSearchFilter
import com.ravel.schema.ProductObject._
import scalikejdbc.async.ShortenedNames
import scalikejdbc.async._
import scalikejdbc._
import FutureImplicits._
import scalikejdbc.SQLSyntaxSupportFeature._

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

  def get(id: Int): Future[Option[Product]] = {
    AsyncDB withPool { implicit s =>
      withSQL {
        select(p.result.id, p.result.title).from(ProductService as p).where.eq(p.id, id).orderBy(p.id)
      }.map(ProductService.apply(p)).single.future
    }
  }
  def apply(p: SyntaxProvider[Product])(rs: WrappedResultSet): Product = apply(p.resultName)(rs)
  def apply(p: ResultName[Product])(rs: WrappedResultSet): Product = new Product(rs.toMap())

}
