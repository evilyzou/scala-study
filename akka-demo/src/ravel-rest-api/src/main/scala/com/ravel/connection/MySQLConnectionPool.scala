package com.ravel.connection

import akka.actor.{ActorLogging, Actor}
import akka.actor.Actor.Receive
import com.github.mauricio.async.db.{Configuration, Connection}
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.ravel.connection.MySQLConnectionPool._

import scala.collection.mutable.Queue
import scala.concurrent.{Promise, Future, Await}
import scala.util.{Failure, Success}
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 2/9/2017.
 */

object MySQLConnectionPool {
  sealed trait PoolCommand
  case class Borrow() extends PoolCommand
  case class GiveBack(connection: Connection) extends PoolCommand
  case class Tick() extends PoolCommand
  case class Test() extends PoolCommand

  object ConnectionState extends Enumeration {
    val NotUsed, Used = Value
  }
}


class MySQLConnectionPool(val poolConfiguration: PoolConfiguration = PoolConfiguration.Default) extends Actor with ActorLogging{
  private var connectionMap: Map[Connection, ConnectionState.Value] = Map()
  private val waitQueue = new Queue[Promise[Connection]]()

  val scheduler = context.system.scheduler

  override def preStart() = {
    initConnections()

    scheduler.schedule(0.seconds, 30.seconds, self, Tick)
  }

  override def receive: Receive =  {
    case Borrow =>  {
      val _sender = sender()
      getConnection() map { conn =>
        _sender ! conn
      }
    }
    case GiveBack(conn) => {
      if (waitQueue.nonEmpty) {
        waitQueue.dequeue().success(conn)
      } else {
        connectionMap += (conn -> ConnectionState.NotUsed)
      }
    }
    case Tick => {
      val notUsedCount = connectionMap.values.count(_ == ConnectionState.NotUsed)
      val usedCount = connectionMap.size - notUsedCount
      log.info(s"connection status: notused count(${notUsedCount}), used count(${usedCount}})")
    }
  }

  private def getConnection(): Future[Connection] = {
    val promise = Promise[Connection]()

    if (isFull()) {
      waitQueue += promise
      log.info("pool is full, must be wait")
    } else {
      for((conn, connectionState) <- connectionMap) {
        if (connectionState == ConnectionState.NotUsed) {
          connectionMap += (conn -> ConnectionState.Used)
          promise.success(conn)
          return promise.future
        }
      }
    }
    promise.future
  }

  private def isFull(): Boolean = {
    !connectionMap.values.exists(_ == ConnectionState.NotUsed)
  }

  private def initConnections() = {
    val configuration = Configuration(username = "root", host ="127.0.0.1", port = 3306, password = Option("ex299295"), database = Option("ravel"))
    1 to poolConfiguration.maxObjects foreach {
      _ => {
        val connection = (new MySQLConnection(configuration = configuration)).connect
        connection onComplete {
          case Success(conn) => connectionMap += (conn -> ConnectionState.NotUsed)
          case Failure(e) => log.error(s"init connection failed, exception: ${e}")
        }
        Await.result(connection, 1.seconds)
      }
    }
  }
}
