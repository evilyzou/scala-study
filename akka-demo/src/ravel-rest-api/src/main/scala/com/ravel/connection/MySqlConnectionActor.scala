package com.ravel.connection

import akka.actor.{ActorRef, ActorLogging, Terminated, Actor}
import akka.util.Timeout
import com.github.mauricio.async.db.{Configuration, QueryResult, Connection}
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
  implicit val timeout = Timeout(5 seconds)

  override def preStart() = {
    scheduler.schedule(10.seconds, 30.seconds, self, CheckConnectionIdle)
  }

  def receive = {
    case QueryStatement(statement, index) => {
      val _sender = sender()
      preQuery().onComplete {
        case Success(connection: Connection) => {
          connection.sendQuery(statement).map { result =>
            println(s"current time: ${System.currentTimeMillis()}")
            poolActorRef ! GiveBack(connection)

            _sender ! buildQueryResult(result)
          }
        }
        case Failure(_) => {
          log.info("connection is closed, will be stop actor")

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
    }
  }

  private def preQuery(): Future[Connection] = {
    resetLastQueryTimestamp
    (poolActorRef ? Borrow).mapTo[Connection]
  }

  private def resetLastQueryTimestamp =  {
    lastQueryTimestamp = System.currentTimeMillis()
  }

}
