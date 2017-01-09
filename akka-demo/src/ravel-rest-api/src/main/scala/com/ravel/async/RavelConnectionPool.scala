package com.ravel.async
import com.ravel.Config.log

/**
 * Created by CloudZou on 12/29/2016.
 */
abstract class RavelConnectionPool(val settings: RavelConnectionPoolSettings = RavelConnectionPoolSettings()) {

  /**
   * Borrows a connection from pool.
   * @return connection
   */
  def borrow(): RavelConnection

  /**
   * Close this pool.
   */
  def close(): Unit

  /**
   * Gives back the connection.
   * @param conn connection
   */
  def giveBack(conn: NonSharedRavelConnection): Unit

}


case class RavelConnectionPoolSettings(maxPoolSize: Int = 20, maxQueueSize: Int = 10, maxIdleMillis: Long = 10 * 1000L)

object RavelConnectionPool {
  type ConcurrentMap[A, B] = scala.collection.concurrent.TrieMap[A, B]
  type CPSettings = RavelConnectionPoolSettings
  type CPFactory = RavelConnectionPoolFactory

  val DEFAULT_NAME: Symbol = 'default

  private[this] val pools = new ConcurrentMap[Any, RavelConnectionPool]()

  def isInitialized(name: Any = DEFAULT_NAME): Boolean = pools.contains(name)

  def get(name: Any = DEFAULT_NAME): RavelConnectionPool = {
    pools.getOrElse(name, {
      val message = ErrorMessage.CONNECTION_POOL_IS_NOT_YET_INITIALIZED + "(name:" + name + ")"
      throw new IllegalStateException(message)
    })
  }

  def apply(name: Any = DEFAULT_NAME): RavelConnectionPool = get(name)

  def add(name: Any, url: String, user: String, password: String, settings: CPSettings = RavelConnectionPoolSettings())(
    implicit
    factory: CPFactory = RavelConnectionPoolFactory
    ): Unit = {
    val newPool: RavelConnectionPool = factory.apply(url, user, password, settings)
    log.debug(s"Registered connection pool (url: ${url}, user: ${user}, settings: ${settings}")
    val replaced = pools.put(name, newPool)
    replaced.foreach(_.close())
  }

  def singleton(url: String, user: String, password: String, settings: CPSettings = RavelConnectionPoolSettings())(
    implicit
    factory: CPFactory = RavelConnectionPoolFactory
    ): Unit = {
    add(DEFAULT_NAME, url, user, password, settings)(factory)
  }

  def borrow(name: Any = DEFAULT_NAME): RavelConnection = {
    val pool = get(name)
    log.debug(s"Borrowed a new connection from pool $name")
    pool.borrow()
  }

  def giveBack(connection: NonSharedRavelConnection, name: Any = DEFAULT_NAME): Unit = {
    val pool = get(name)
    log.debug(s"Gave back previously borrowed connection from pool $name")
    pool.giveBack(connection)
  }

  def close(name: Any = DEFAULT_NAME): Unit = pools.remove(name).foreach(_.close())

  def closeAll(): Unit = pools.keys.foreach(name => close(name))
}


trait RavelConnectionPoolFactory {

  def apply(url: String, user: String, password: String,
            settings: RavelConnectionPoolSettings = RavelConnectionPoolSettings()): RavelConnectionPool

}

/**
 * Ravelhronous Connection Pool Factory
 */
object RavelConnectionPoolFactory extends RavelConnectionPoolFactory {

  override def apply(url: String, user: String, password: String,
                     settings: RavelConnectionPoolSettings = RavelConnectionPoolSettings()): RavelConnectionPool = {

    url match {
      case _ if url.startsWith("jdbc:mysql://") =>
        new MySQLConnectionPoolImpl(url, user, password, settings)
      case _ =>
        throw new UnsupportedOperationException("This RDBMS is not supported yet.")
    }
  }

}
