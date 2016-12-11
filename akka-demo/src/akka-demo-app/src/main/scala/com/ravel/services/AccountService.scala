package com.ravel.services

import java.sql.Timestamp

import com.ravel.AppEnvironment
import com.ravel.schema.Actions._
import com.ravel.schema.Tables._
import jdbcDriver.api._

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/2016.
 */
object AccountService extends AppEnvironment{

  def create() = {
    val account = AccountRow(1, "slick1","dfsd","xx","sss","xxx","sdfds",3, 0, 0, Timestamp.valueOf("2012-12-01 12:01:01"),Timestamp.valueOf("2012-12-01 12:01:01"))
    db.run(insertAccount(account))
  }

  def list: Future[Seq[AccountRow]] = {
    db.run(accounts.result)
  }

  def insertAccount(a : AccountRow) = {
    accounts += a
  }
}
