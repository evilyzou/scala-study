package com.ravel.routing

import akka.http.scaladsl.marshalling.{ToResponseMarshallable, ToResponseMarshaller}
import akka.http.scaladsl.model.headers.Location
import akka.http.scaladsl.server.{Route, Directives}
import com.ravel.serializers.JsonSupport

import scala.concurrent.{Future, ExecutionContext}

/**
 * Created by CloudZou on 12/9/2016.
 */
trait MyResource extends Directives with JsonSupport{
  implicit def executionContext: ExecutionContext

  def completeWithLocationHeader[T](resourceId: Future[Option[T]], ifDefinedStatus: Int, ifEmptyStatus: Int): Route = {
    onSuccess(resourceId) {
      case Some(t) => completeWithLocationHeader(ifDefinedStatus, t)
      case None => complete(ifEmptyStatus, None)
    }
  }

  def completeWithLocationHeader[T](status: Int, resourceId: T): Route = {
    extractRequestContext { requestContext =>
      val request = requestContext.request
      val location = request.uri.copy(path = request.uri.path / resourceId.toString)
      respondWithHeader(Location(location)) {
        complete(status, None)
      }
    }
  }

  def complete[T: ToResponseMarshaller](resource: Future[Option[T]]): Route = {
    onSuccess(resource) {
      case Some(t) => complete(ToResponseMarshallable(t))
      case None => complete(404, None)
    }
  }

  def complete(resource: Future[Unit]): Route = onSuccess(resource)  { complete(204, None) }
}
