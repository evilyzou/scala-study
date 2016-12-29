package com.ravel.async

import com.github.mauricio.async.db.pool.{ConnectionPool, PoolConfiguration, ObjectFactory}
import com.github.mauricio.async.db.{Connection, QueryResult, Configuration}
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.mysql.pool.MySQLConnectionFactory
import com.ravel.Config.log
import RavelGlobal._

import scala.concurrent.{ExecutionContextExecutor, Future}

/**
 * Created by CloudZou on 12/29/2016.
 */
class MySQLConnectionPoolImpl(
                               url: String,
                               user: String,
                               password: String,
                               override val settings: RavelConnectionPoolSettings = RavelConnectionPoolSettings()
                               )
  extends RavelConnectionPoolCommonImpl[MySQLConnection](url, user, password,
    (c: Configuration) => new MySQLConnectionFactory(c), settings) {

  override def borrow(): RavelConnection = new PoolableRavelConnection(pool) with MySQLConnectionImpl

}


abstract class RavelConnectionPoolCommonImpl[T <: Connection](
                                                               url: String,
                                                               user: String,
                                                               password: String,
                                                               factoryF: Configuration => ObjectFactory[T],
                                                               settings: RavelConnectionPoolSettings = RavelConnectionPoolSettings()
                                                               ) extends RavelConnectionPool(settings) with MauricioConfiguration  {

  val factory = factoryF(configuration(url, user, password))
  val pool = new ConnectionPool[T](
    factory = factory,
    configuration = PoolConfiguration(
      maxObjects = settings.maxPoolSize,
      maxIdle = settings.maxIdleMillis,
      maxQueueSize = settings.maxQueueSize
    )
  )

  override def close(): Unit = pool.disconnect

  override def giveBack(conn: NonSharedRavelConnection): Unit = conn match {
    case conn: NonSharedRavelConnectionImpl => pool.giveBack(conn.underlying.asInstanceOf[T])
    case _ => log.debug("You don't need to give back this connection to the pool.")
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
