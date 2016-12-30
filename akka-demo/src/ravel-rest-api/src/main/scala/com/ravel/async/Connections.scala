package com.ravel.async

import com.github.mauricio.async.db.pool.ConnectionPool
import com.github.mauricio.async.db.{QueryResult, Connection}
import com.ravel.async.RavelGlobal._

import scala.concurrent.{Future, ExecutionContextExecutor}
import scala.concurrent.duration._

/**
 * Created by CloudZou on 12/29/16.
 */

/**
 * Asynchronous DB connection
 */
trait RavelConnection {
  import RavelGlobal._

  /**
   * Returns non-shared connection.
   *
   * @param executor execution context
   * @return connection
   */
  def toNonSharedConnection()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[NonSharedRavelConnection]

  /**
   * Send a query.
   *
   * @param statement statement
   * @param executor execution context
   * @return future
   */
  def sendQuery(statement: String)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult]

  /**
   * Send a prepared statement.
   *
   * @param statement statement
   * @param parameters parameters
   * @param executor execution context
   * @return future
   */
  def sendPreparedStatement(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult]

  /**
   * Returns this connection is active.
   *
   * @return active
   */
  def isActive: Boolean = false

  /**
   * Returns this connection is shared.
   *
   * @return shared
   */
  def isShared: Boolean = true

  /**
   * Close or release this connection.
   */
  def close(): Unit

}

trait NonSharedRavelConnection extends RavelConnection {
  override def isShared: Boolean = false

  /**
   * Gives back this connection to the pool, and the connection will be shared again.
   */
  def release(): Unit
}


trait RavelConnectionCommonImpl extends RavelConnection {

  val underlying: Connection
  val defaultTimeout = 10.seconds

  override def isActive: Boolean = underlying.isConnected

  override def sendQuery(statement: String)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = {

    underlying.sendQuery(statement).map { queryResult =>
      new RavelQueryResult(
        rowsAffected = Option(queryResult.rowsAffected),
        statusMessage = Option(queryResult.statusMessage),
        rows = queryResult.rows
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
        rows = queryResult.rows
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



trait MySQLConnectionImpl extends RavelConnectionCommonImpl {

  override def toNonSharedConnection()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[NonSharedRavelConnection] = {

    if (this.isInstanceOf[PoolableRavelConnection[_]]) {
      val pool = this.asInstanceOf[PoolableRavelConnection[Connection]].pool
      pool.take.map(conn => new NonSharedRavelConnectionImpl(conn, Some(pool)) with MySQLConnectionImpl)
    } else {
      Future.successful(new NonSharedRavelConnectionImpl(underlying) with MySQLConnectionImpl)
    }
  }

  override protected def extractGeneratedKey(queryResult: QueryResult)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Option[Long]] = {
    ensureNonShared()
    underlying.sendQuery("SELECT LAST_INSERT_ID()").map { result =>
      result.rows.headOption.flatMap { rows =>
        rows.headOption.map { row => row(0).asInstanceOf[Long] }
      }
    }
  }

}


abstract class NonSharedRavelConnectionImpl(
                                             val underlying: Connection,
                                             val pool: Option[ConnectionPool[Connection]] = None
                                             )
  extends RavelConnectionCommonImpl
  with NonSharedRavelConnection {

  override def toNonSharedConnection()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[NonSharedRavelConnection] =
    Future.successful(this)

  override def release(): Unit = pool.map(_.giveBack(this.underlying))

}


abstract class PoolableRavelConnection[T <: Connection](val pool: ConnectionPool[T])
  extends RavelConnectionCommonImpl {

  override def toNonSharedConnection()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[NonSharedRavelConnection] =
    Future.failed(new UnsupportedOperationException)

  val underlying: Connection = pool

  /**
   * Close or release this connection.
   */
  override def close(): Unit = {
    pool.asInstanceOf[ConnectionPool[Connection]].giveBack(underlying)
  }

}

