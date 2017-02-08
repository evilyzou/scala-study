package com.ravel.connection

import akka.actor.{Terminated, Actor}
import com.github.mauricio.async.db.{QueryResult, Connection}
import com.ravel.async.RavelQueryResult
import com.ravel.model._

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.concurrent.duration.Duration
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 2/7/2017.
 */
class MySqlConnectionActor(val underlying: Connection, val defaultTimeout: Duration) extends Actor{
  def receive = {
    case _ :ConnectionIsActive => Future { underlying.isConnected }
    case QueryStatement(statement) => {
      println("QueryStatement here")
      val ft = underlying.sendQuery(statement).map(buildQueryResult(_))
      sender() ! ft
    }
    case QueryStatementWithParameters(statement, parameters: Seq[Any]) => {
      val queryResultFuture: Future[QueryResult] = {
        if (parameters.isEmpty) underlying.sendQuery(statement)
        else underlying.sendPreparedStatement(statement, parameters)
      }
      
      sender() ! queryResultFuture.map(buildQueryResult(_))
    }
    case Terminated => context.stop(self)
  }

  protected[this] def buildQueryResult(queryResult: QueryResult): RavelQueryResult = {
    val t = new RavelQueryResult(Option(queryResult.rowsAffected), Option(queryResult.statusMessage), queryResult.rows) {
      lazy val generatedKey = extractGeneratedKey(queryResult)
    }
    println(t)
    t
  }

  protected[this] def extractGeneratedKey(queryResult: QueryResult): Future[Option[Long]] = {
    underlying.sendQuery("SELECT LAST_INSERT_ID()").map { result =>
      result.rows.headOption.flatMap { rows =>
        rows.headOption.map { row => row(0).asInstanceOf[Long] }
      }
    }
  }
}
