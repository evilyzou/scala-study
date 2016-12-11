package com.ravel.schema

import slick.backend.DatabaseConfig
import slick.driver.{MySQLDriver, JdbcProfile}

/**
 * Created by CloudZou on 12/9/16.
 */
object Actions extends DAOs with DBConfig {
  override lazy val jdbcDriver: JdbcProfile = MySQLDriver
  val dbConf: DatabaseConfig[MySQLDriver] = DatabaseConfig.forConfig("mysql")
  override val db = dbConf.db
}
