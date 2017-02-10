package com.ravel.resources

import akka.actor.Actor
import akka.http.scaladsl.marshalling.ToResponseMarshallable
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.{Route, RouteResult, RequestContext}
import com.ravel.Config._
import com.ravel.model.RavelObject.SearchGuideView
import com.ravel.resources.JsonResultRoute.JsonResultKeys._
import com.ravel.resources.JsonResultRoute._

import scala.concurrent.Promise

/**
 * Created by CloudZou on 1/12/2017.
 */
object RequestHandler{
  case class Handle(context: ImperativeRequestContext)


  def imperativelyComplete(inner: ImperativeRequestContext => Unit): Route = { ctx: RequestContext =>
    val p = Promise[RouteResult]()
    inner(new ImperativeRequestContext(ctx, p))
    p.future
  }

}


final class ImperativeRequestContext(context: RequestContext, promise: Promise[RouteResult]) {
  private implicit val  executionContext = context.executionContext
  def complete(obj: ToResponseMarshallable) = context.complete(obj).onComplete(promise.complete)
  def fail(error: Throwable) = context.fail(error).onComplete(promise.complete)
  def context1 = context
}
