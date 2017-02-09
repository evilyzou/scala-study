package com.ravel.connection

import akka.actor.{ActorRef, ActorLogging, Terminated, Actor}
import akka.util.Timeout
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.github.mauricio.async.db.{Configuration, QueryResult, Connection}
import com.ravel.async.RavelQueryResult
import com.ravel.connection.MySQLConnectionPool.{GiveBack, Borrow}
import com.ravel.model._

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Success, Failure}
import akka.pattern.ask

/**
 * Created by CloudZou on 2/7/2017.
 */
class MySQLConnectionActor(val poolActorRef: ActorRef, val configuration: Configuration,  val defaultTimeout: Duration) extends Actor with ActorLogging{
  private val system = context.system
  private lazy val scheduler = system.scheduler

  private var lastQueryTimestamp = System.currentTimeMillis()
  private val maxIdle =  30 * 1000  //30s

  override def preStart() = {
    scheduler.schedule(10.seconds, 30.seconds, self, CheckConnectionIdle)
  }

  def receive = {
//    case _ :ConnectionIsActive => sender() ! connection.isConnected
    case CheckConnectionIdle => {
//      if (isConnected) {
//        val timeElapsed = System.currentTimeMillis() - lastQueryTimestamp
//        if (timeElapsed > maxIdle) {
//          log.info(s"Connection was idle for ${timeElapsed}, maxIdle is ${maxIdle}, close it.")
//          connection.disconnect onComplete {
//            case Success(_) => log.info(s"actor: ${self},connection closed success")
//            case Failure(_) => log.info(s"actor: ${self}, connection closed failed")
//          }
//        }
//      }
    }
    case QueryStatement(statement) => {
      val _sender = sender()
      preQuery().onComplete {
        case Success(connection: Connection) => {
          connection.sendQuery(statement).map { result =>
            poolActorRef ! GiveBack(connection)

            _sender ! buildQueryResult(result)
          }
        }
        case Failure(_) => {
          log.info("connection is closed, will be stop actor")
          context.stop(self)
        }
      }
    }
    case QueryStatementWithParameters(statement, parameters: Seq[Any]) => {
      val _sender = sender()
      preQuery().onComplete {
        case Success(connection: Connection) => {
          val queryResultFuture: Future[QueryResult] = {
            if (parameters.isEmpty) connection.sendQuery(statement)
            else connection.sendPreparedStatement(statement, parameters)
          }
          queryResultFuture.map { result =>
            _sender ! buildQueryResult(result)
          }
        }
        case Failure(_) => {
          log.info("connection is closed, will be stop actor")
          //context.stop(self)
        }
      }
    }
    case Terminated => context.stop(self)
  }

  protected[this] def buildQueryResult(queryResult: QueryResult): RavelQueryResult = {
    new RavelQueryResult(Option(queryResult.rowsAffected), Option(queryResult.statusMessage), queryResult.rows) {
//      lazy val generatedKey = throw new Exception("rr")
    }
  }

  protected[this] def extractGeneratedKey(queryResult: QueryResult): Future[Option[Long]] = {
//    connection.sendQuery("SELECT LAST_INSERT_ID()").map { result =>
//      result.rows.headOption.flatMap { rows =>
//        rows.headOption.map { row => row(0).asInstanceOf[Long] }
//      }
//    }
    throw new Exception("error")
  }

  private def preQuery(): Future[Connection] = {
    resetLastQueryTimestamp
    implicit val timeout = Timeout(5 seconds)


    poolActorRef ? Borrow map { conn =>
      conn.asInstanceOf[Connection]
    }
  }

  private def resetLastQueryTimestamp =  {
    lastQueryTimestamp = System.currentTimeMillis()
  }

//  private def checkConnection(): Future[Connection] = {
////    if (!isConnected) {
////      connection = new MySQLConnection(configuration)
////      connection.connect
////    } else {
////      Future.successful(connection)
////    }
//    poolActorRef ? Borrow map { conn =>
//      conn.asInstanceOf[Connection]
//    }
//  }

//  private def isConnected = connection != null &&  connection.isConnected
}
