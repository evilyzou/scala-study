package com.ravel.async

import com.ravel.async.RavelGlobal._

import scala.concurrent.{ExecutionContextExecutor, Future}

/**
 * Created by CloudZou on 12/29/2016.
 */
case class RavelNamedDB(name: Any = RavelConnectionPool.DEFAULT_NAME) {

  /**
   * Provides a code block which have a connection from ConnectionPool and passes it to the operation.
   *
   * @param op operation
   * @tparam A return type
   * @return a Future value
   */
  def withPool[A](op: (SharedRavelDBSession) => Future[A]): Future[A] = {
    op.apply(sharedSession)
  }

  /**
   * Provides a shared session.
   *
   * @return shared session
   */
  def sharedSession: SharedRavelDBSession = SharedRavelDBSession(RavelConnectionPool(name).borrow())

  /**
   * Provides a future world within a transaction.
   *
   * @param op operation
   * @param cxt execution context
   * @tparam A return type
   * @return a future value
   */
  def localTx[A](op: (TxRavelDBSession) => Future[A])(implicit context: ExecutionContextExecutor = ECGlobal): Future[A] = {
    RavelConnectionPool(name).borrow().toNonSharedConnection()
      .flatMap(conn => RavelTx.inTransaction[A](TxRavelDBSession(conn), op))
  }

}
