package com.ravel.async

import com.github.mauricio.async.db.{QueryResult, Connection}

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.concurrent.duration._
import RavelGlobal._

/**
 * Created by CloudZou on 12/29/2016.
 */
trait RavelConnectionCommonImpl extends RavelConnection {

  val underlying: Connection
  val defaultTimeout = 10.seconds

  override def isActive: Boolean = underlying.isConnected

  override def sendQuery(statement: String)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = {

    underlying.sendQuery(statement).map { queryResult =>
      new RavelQueryResult(
        rowsAffected = Option(queryResult.rowsAffected),
        statusMessage = Option(queryResult.statusMessage),
        rows = queryResult.rows.map(rows => new RavelResultSetImpl(rows))
      ) {

        lazy val generatedKey = extractGeneratedKey(queryResult)
      }
    }
  }

  override def sendPreparedStatement(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = {

    val queryResultFuture: Future[QueryResult] = {
      if (parameters.isEmpty) underlying.sendQuery(statement)
      else underlying.sendPreparedStatement(statement, parameters)
    }
    queryResultFuture.map { queryResult =>
      new RavelQueryResult(
        rowsAffected = Option(queryResult.rowsAffected),
        statusMessage = Option(queryResult.statusMessage),
        rows = queryResult.rows.map(rows => new RavelResultSetImpl(rows))
      ) {

        lazy val generatedKey = extractGeneratedKey(queryResult)
      }
    }
  }

  override def close(): Unit = underlying.disconnect

  /**
   * Extracts generated key.
   *
   * @param queryResult query result
   * @param executor  execution context
   * @return optional generated key
   */
  protected def extractGeneratedKey(queryResult: QueryResult)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Option[Long]]

  protected def ensureNonShared(): Unit = {
    if (!this.isInstanceOf[NonSharedRavelConnection]) {
      throw new IllegalStateException("This asynchronous connection must be a non-shared connection.")
    }
  }


}
