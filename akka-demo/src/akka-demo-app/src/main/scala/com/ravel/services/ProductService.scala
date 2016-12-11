package com.ravel.services


import com.ravel.AppEnvironment
import com.ravel.schema.Actions._
import com.ravel.schema.Actions.jdbcDriver.api._
import com.ravel.schema.Tables._

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/9/16.
 */
object ProductService extends AppEnvironment{
  def list : Future[Seq[ProductRow]] = {
    db.run(products.drop(1).take(20).result)
  }
}
