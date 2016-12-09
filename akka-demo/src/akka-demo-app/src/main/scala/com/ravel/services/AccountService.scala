package com.ravel.services

import com.ravel.AppEnvironment
import com.ravel.schema.DBConfig
import com.ravel.schema.Tables._
import slick.backend.DatabaseConfig
import java.sql.Timestamp

import slick.driver.{MySQLDriver, JdbcProfile}
import slick.lifted.TableQuery

import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 12/9/2016.
 */
object AccountService extends AppEnvironment with DBConfig{
//  val accounts =TableQuery[Account]
//  override lazy val jdbcDriver: JdbcProfile = MySQLDriver
//  val dbConf: DatabaseConfig[MySQLDriver] = DatabaseConfig.forConfig("mysql")
//  override val db = dbConf.db

  def create() = {
    val db = DatabaseConfig.forConfig("mysql")
    val account = AccountRow(1, "slick1","dfsd","xx","sss","xxx","sdfds",3, 0, 0, Timestamp.valueOf("2012-12-01"),Timestamp.valueOf("2012-12-01"))
//    db.db.run(insertAccount(account))
  }

  def insertAccount(a : AccountRow) = {
//
//    import jdbcDriver.api._
//
//    accounts += a
  }
}
