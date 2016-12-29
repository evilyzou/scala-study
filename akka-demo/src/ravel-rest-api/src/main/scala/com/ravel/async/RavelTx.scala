package com.ravel.async

import scalikejdbc._

import scala.concurrent.{ExecutionContextExecutor, Promise, Future}
import scala.util.{Failure, Success}
import RavelGlobal._
/**
 * Created by CloudZou on 12/29/2016.
 */
object RavelTx {

  /**
   *
   * @param builders
   * @param session
   * @param context
   * @return
   */
  def withSQLBuilders(builders: SQLBuilder[_]*)(implicit session: SharedRavelDBSession, context: ExecutionContextExecutor = ECGlobal): RavelTxQuery = {
    withSQLs(builders.map(_.toSQL): _*)
  }

  /**
   *
   * @param sqlObjects
   * @param session
   * @param context
   * @return
   */
  def withSQLs(sqlObjects: SQL[_, _]*)(implicit session: SharedRavelDBSession, context: ExecutionContextExecutor = ECGlobal): RavelTxQuery = {
    new RavelTxQuery(sqlObjects)
  }

  def inTransaction[A](tx: TxRavelDBSession, op: (TxRavelDBSession) => Future[A])(implicit context: ExecutionContextExecutor = ECGlobal): Future[A] = {
    val p = Promise[A]()
    val connection = tx.connection.asInstanceOf[RavelConnectionCommonImpl].underlying
    connection.inTransaction(_ => op.apply(tx)).onComplete {
      case Success(result) =>
        tx.release()
        p.success(result)
      case Failure(e) =>
        tx.release()
        p.failure(e)
    }
    p.future
  }

}


class RavelTxQuery(sqls: Seq[SQL[_, _]]) {

  def future()(implicit session: SharedRavelDBSession, context: ExecutionContextExecutor = ECGlobal): Future[Seq[RavelQueryResult]] = {
    def op(tx: TxRavelDBSession) = {
      sqls.foldLeft(Future.successful(Vector.empty[RavelQueryResult])) { (resultsFuture, sql) =>
        for {
          results <- resultsFuture
          current <- tx.connection.sendPreparedStatement(sql.statement, sql.parameters: _*)
        } yield results :+ current
      }
    }
    session.connection.toNonSharedConnection
      .flatMap(conn => RavelTx.inTransaction(TxRavelDBSession(conn), op))
  }

}

