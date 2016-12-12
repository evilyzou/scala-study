package com.ravel.schema

import com.ravel.schema.Tables._
import slick.driver.JdbcProfile
import slick.lifted.TableQuery

/**
 * Created by CloudZou on 12/9/2016.
 */
trait DBConfig {
  val jdbcDriver: JdbcProfile
  import jdbcDriver.api._
  val db: Database
}

trait DAOs {
  self : DBConfig =>

  val products = TableQuery[Product]
  val productExts = TableQuery[ProductExt]
  val productOthers = TableQuery[ProductOther]
  val productPriceByTeams = TableQuery[ProductPriceByTeam]
}