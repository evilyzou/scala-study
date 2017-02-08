package com.ravel.connection

import com.github.mauricio.async.db.Configuration
import com.github.mauricio.async.db.exceptions.{ConnectionStillRunningQueryException, ConnectionNotConnectedException, ConnectionTimeoutedException}
import com.github.mauricio.async.db.mysql.MySQLConnection

import scala.concurrent.Future
import scala.util.Try
import scala.concurrent.ExecutionContext.Implicits.global

trait ObjectFactory[T] {
  def create: Future[T]
  def destroy(item: T): Future[T]
  def validate(item: T): Try[T]
  def test(item: T): Try[T] = validate(item)
}

class MySQLConnectionFactory(configuration: Configuration) extends ObjectFactory[MySQLConnection]{
  def create: Future[MySQLConnection] ={
    val connection = new MySQLConnection(configuration)
    Future.successful(connection)
  }

  def destroy(item: MySQLConnection): Future[MySQLConnection] = {
    item.disconnect.map(_.asInstanceOf[MySQLConnection])
  }

  def validate(item: MySQLConnection): Try[MySQLConnection] = {
    Try{
      if ( item.isTimeouted ) {
        throw new ConnectionTimeoutedException(item)
      }
      if ( !item.isConnected ) {
        throw new ConnectionNotConnectedException(item)
      }

      if (item.lastException != null) {
        throw item.lastException
      }

      if ( item.isQuerying ) {
        throw new ConnectionStillRunningQueryException(item.count, false)
      }

      item
    }
  }
}
