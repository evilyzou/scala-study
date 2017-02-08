package com.ravel.connection

import akka.actor.{Props, ActorLogging, Actor}
import com.github.mauricio.async.db.Connection
import com.github.mauricio.async.db.pool.{PoolExhaustedException, PoolConfiguration}

import scala.collection.mutable
import scala.collection.mutable.{Stack, ArrayBuffer}
import scala.concurrent.Promise
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 2/7/2017.
 */
object ConnectionPool {
  sealed trait PoolCommand
  case class Ticker() extends PoolCommand
  case class Borrow() extends PoolCommand
  case class GiveBack() extends PoolCommand

  val defaultTimeOut = 10 seconds
}

class ConnectionPool[T](val factory: ObjectFactory[T], val configuration: PoolConfiguration) extends Actor with ActorLogging{
  import ConnectionPool._

  private val checkouts = new ArrayBuffer[T]()
  private val waitQueue = new mutable.Queue[Promise[T]]()
  private val poolables = new Stack[T]()

  private val system = context.system
  private lazy val scheduler = system.scheduler

  override def preStart(): Unit = {
    scheduler.schedule(500.millisecond, 30.seconds, self, Ticker)
  }

  def receive = {
    case Ticker => {
      log.info("ticker scheduler")
    }
    case Borrow => {
      val _sender = sender()
      val promise = Promise[T]
      if (isFull) {
        enqueuePromise(promise)
      } else {
        createOrReturnItem(promise)
      }
      promise.future map { f =>
        val connection = f.asInstanceOf[Connection]
        connection.connect map { c=>
          checkouts += f
          log.info("Borrow here")
          val actorRef = system.actorOf(Props(classOf[MySqlConnectionActor], c, defaultTimeOut))
          _sender ! actorRef
        }
      }
    }
    case _ => None
  }

  private def enqueuePromise(promise: Promise[T]) {
    if (this.waitQueue.size >= configuration.maxQueueSize) {
      val exception = new PoolExhaustedException("There are no objects available and the waitQueue is full")
      exception.fillInStackTrace()
      promise.failure(exception)
    } else {
      this.waitQueue += promise
    }
  }

  private def createOrReturnItem(promise: Promise[T]) {
    if (poolables.isEmpty) {
      try {
        val item = factory.create
        promise.completeWith(item)
      } catch {
        case e: Exception => promise.failure(e)
      }
    } else {
      val item = poolables.pop()
      checkouts += item
      promise.success(item)
    }
  }

  private def isFull: Boolean = poolables.isEmpty && checkouts.size == configuration.maxObjects

}
