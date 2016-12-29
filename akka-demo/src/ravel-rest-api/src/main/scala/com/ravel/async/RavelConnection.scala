package com.ravel.async

import com.github.mauricio.async.db.Connection
import com.github.mauricio.async.db.pool.ConnectionPool

import scala.concurrent.{Future, ExecutionContextExecutor}
import RavelGlobal._

/**
 * Created by CloudZou on 12/29/2016.
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



abstract class NonSharedAsyncConnectionImpl(
                                             val underlying: Connection,
                                             val pool: Option[ConnectionPool[Connection]] = None
                                             )
  extends RavelConnectionCommonImpl
  with NonSharedRavelConnection {

  override def toNonSharedConnection()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[NonSharedRavelConnection] =
    Future.successful(this)

  override def release(): Unit = pool.map(_.giveBack(this.underlying))

}
