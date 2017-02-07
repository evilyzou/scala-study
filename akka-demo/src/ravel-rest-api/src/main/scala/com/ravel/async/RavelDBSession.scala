package com.ravel.async

import com.ravel.async.RavelGlobal._

import scala.concurrent.{ExecutionContextExecutor, Future}

/**
 * Created by CloudZou on 12/29/2016.
 */
trait RavelDBSession {

  val connection: RavelConnection

  def execute(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Boolean] = {
    connection.sendPreparedStatement(statement, parameters: _*).map { result =>
      result.rowsAffected.exists(_ > 0)
    }
  }

  def update(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Int] = {
      connection.sendPreparedStatement(statement, parameters: _*).map { result =>
        result.rowsAffected.map(_.toInt).getOrElse(0)
      }
  }
}

/**
 * Shared Ravelhronous DB session
 */
case class SharedRavelDBSession(connection: RavelConnection) extends RavelDBSession
