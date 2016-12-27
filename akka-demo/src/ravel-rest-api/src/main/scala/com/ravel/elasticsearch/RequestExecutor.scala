package com.ravel.elasticsearch

import org.elasticsearch.action.{ActionRequestBuilder, ActionResponse, ActionListener}

import scala.concurrent.{Future, Promise}

/**
 * Created by CloudZou on 12/27/2016.
 */
object RequestExecutor {
  def apply[T <: ActionResponse](): RequestExecutor[T] = {
    new RequestExecutor[T]
  }
}

class RequestExecutor[T <: ActionResponse]  extends  ActionListener[T]{
  private val promise = Promise[T]()

  def onResponse(response: T) {
    println("xxx: success")
    promise.success(response)
  }

  def onFailure(e: Throwable) {
    println("xxx: failure")
    promise.failure(e)
  }

  def execute[RB <: ActionRequestBuilder[_, T, _]](request: RB): Future[T] = {
    request.execute(this)
    promise.future
  }
}
