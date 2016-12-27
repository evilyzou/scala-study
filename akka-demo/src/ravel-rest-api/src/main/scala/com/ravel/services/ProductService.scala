package com.ravel.services

import com.ravel.Config._
import com.ravel.elasticsearch.ProductSearch
import com.ravel.resources.ProductSearchFilter
import com.ravel.schema.ProductObject._

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService{
  def list(f: ProductSearchFilter) : Future[Seq[SearchProductView]] = {
    val start = f.start * f.size
    log.info(s"c:${f}")
    ProductSearch.queryProducts(f)
  }
//  def get(id: Int): Future[Option[ProductRow]] = {
//    db.run(products.filter(_.id === id).result.headOption)
//  }
//  def getProductExt(id: Int): Future[Option[ProductExtRow]] = {
//    db.run(productExts.filter(_.productId === id).result.headOption)
//  }
//  def getProductOther(id: Int): Future[Option[ProductOtherRow]] = {
//    db.run(productOthers.filter(_.productId === id).result.headOption)
//  }
//
//  def getProductPrices(id: Int): Future[Seq[ProductPriceByTeamRow]] = {
//    val date = new Date()
//    val now = new Timestamp(date.getTime)
//    db.run(productPriceByTeams.filter(_.productId === id).filter(_.takeOffDate > now).result)
//  }
}
