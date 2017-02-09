package com.ravel.connection

import akka.actor.{ActorLogging, Actor}
import akka.actor.Actor.Receive
import com.github.mauricio.async.db.{Configuration, Connection}
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.ravel.connection.MySQLConnectionPool.{Tick, GiveBack, ConnectionState, Borrow}

import scala.concurrent.Await
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

  object ConnectionState extends Enumeration {
    val NotUsed, Used = Value
  }
}


class MySQLConnectionPool(val poolConfiguration: PoolConfiguration = PoolConfiguration.Default) extends Actor with ActorLogging{
  private var connectionMap: Map[Connection, ConnectionState.Value] = Map()

  val scheduler = context.system.scheduler

  override def preStart() = {
    initConnections()

    scheduler.schedule(0.seconds, 30.seconds, self, Tick)
  }

  override def receive: Receive =  {
    case Borrow =>  {
      val _sender = sender()
      getConnection() match {
        case Some(conn) => _sender ! conn
        case _ => log.info("get connection failed")
      }
    }
    case GiveBack(conn) => {
      connectionMap += (conn -> ConnectionState.NotUsed)
    }
    case Tick => {
      log.info(s"connection status: ${connectionMap}")
    }
  }

  private def getConnection(): Option[Connection] = {
    for((conn, connectionState) <- connectionMap) {
      if (connectionState == ConnectionState.NotUsed) {
        connectionMap += (conn -> ConnectionState.Used)
        return Some(conn)
      }
    }
    None
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
