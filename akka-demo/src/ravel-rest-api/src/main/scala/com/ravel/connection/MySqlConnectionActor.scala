package com.ravel.connection

import akka.actor.Actor
import com.github.mauricio.async.db.pool.ConnectionPool
import com.github.mauricio.async.db.{QueryResult, Connection}
import com.ravel.async.RavelGlobal._
import com.ravel.async.RavelQueryResult
import com.ravel.model._

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.concurrent.duration.Duration

/**
 * Created by CloudZou on 2/7/2017.
 */
class MySqlConnectionActor(val underlying: Connection, val defaultTimeout: Duration) extends Actor{
  def receive = {
    case _ :ConnectionIsActive => Future { underlying.isConnected }
    case QueryStatement(statement) => {
      underlying.sendQuery(statement).map(buildQueryResult(_))
    }
    case QueryStatementWithParameters(statement, parameters: Seq[Any]) => {
      val queryResultFuture: Future[QueryResult] = {
        if (parameters.isEmpty) underlying.sendQuery(statement)
        else underlying.sendPreparedStatement(statement, parameters)
      }
      
      queryResultFuture.map(buildQueryResult(_))
    }
  }

  protected[this] def buildQueryResult(queryResult: QueryResult): RavelQueryResult = {
    new RavelQueryResult(Option(queryResult.rowsAffected), Option(queryResult.statusMessage), queryResult.rows) {
      lazy val generatedKey = extractGeneratedKey(queryResult)
    }
  }

  protected[this] def extractGeneratedKey(queryResult: QueryResult)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Option[Long]] = {
    underlying.sendQuery("SELECT LAST_INSERT_ID()").map { result =>
      result.rows.headOption.flatMap { rows =>
        rows.headOption.map { row => row(0).asInstanceOf[Long] }
      }
    }
  }
}
