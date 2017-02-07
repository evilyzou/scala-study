package com.ravel.connection

import akka.actor.Actor
import com.github.mauricio.async.db.pool.{PoolExhaustedException, ObjectFactory, PoolConfiguration}

import scala.collection.mutable
import scala.collection.mutable.{Stack, ArrayBuffer}
import scala.concurrent.Promise
import scala.concurrent.duration._

/**
 * Created by CloudZou on 2/7/2017.
 */
object ConnectionPool {
  sealed trait PoolCommand
  case class Ticker() extends PoolCommand
  case class Borrow() extends PoolCommand
  case class GiveBack() extends PoolCommand
}

class ConnectionPool[T](val factory: ObjectFactory[T], val configuration: PoolConfiguration) extends Actor{
  import ConnectionPool._

  private val checkouts = new ArrayBuffer[T]()
  private val waitQueue = new mutable.Queue[Promise[T]]()
  private var poolables = new Stack[T]()

  private lazy val scheduler = context.system.scheduler

  override def preStart(): Unit = {
    scheduler.schedule(500.millisecond, 30 seconds, self, Ticker)
  }

  def receive = {
    case Ticker => {

    }
    case Borrow => {
      val promise = Promise[T]
      if (isFull) {
        enqueuePromise(promise)
      } else {
        createOrReturnItem(promise)
      }
      promise.future
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
    if (this.poolables.isEmpty) {
      try {
        val item = this.factory.create
        this.checkouts += item
        promise.success(item)
      } catch {
        case e: Exception => promise.failure(e)
      }
    } else {
      val item = this.poolables.pop()
      this.checkouts += item
      promise.success(item)
    }
  }

  private def isFull: Boolean = checkouts.size == configuration.maxObjects

}
