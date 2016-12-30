package com.ravel.async

import com.github.mauricio.async.db.pool.{PoolConfiguration, ConnectionPool, ObjectFactory}
import com.github.mauricio.async.db.{Connection, Configuration}
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.mysql.pool.MySQLConnectionFactory
import com.ravel.Config._

/**
 * Created by CloudZou on 12/29/16.
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

