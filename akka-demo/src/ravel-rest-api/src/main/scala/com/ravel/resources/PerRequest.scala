package com.ravel.resources

import akka.actor.SupervisorStrategy.Stop
import akka.actor.{Props, OneForOneStrategy, ActorRef, Actor}
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{ContentTypes, HttpEntity, StatusCode}
import akka.http.scaladsl.server.RequestContext
import com.ravel.resources.PerRequest.{WithProps, WithActorRef}
import akka.http.scaladsl.model.{HttpRequest, HttpEntity, ContentTypes}

import scala.concurrent.duration._
/**
 * Created by CloudZou on 1/11/2017.
 */

case class RestMessage(msg: String)

trait PerRequest extends Actor {
  import context._

  def r: RequestContext
  def target: ActorRef
  def message: RestMessage

  setReceiveTimeout(2.seconds)
  target ! message

  def receive = {
    case res: RestMessage => complete(OK, "<h1>say hello to akka-http</h1>")
  }

  def complete[T <: AnyRef](status: StatusCode, obj: T) = {
    complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>say hello to akka-http</h1>"))
    stop(self)
  }

  override val supervisorStrategy =
    OneForOneStrategy() {
      case e =>
        complete(InternalServerError, e.getMessage)
        Stop
    }
}

object PerRequest {
  case class WithActorRef(r: RequestContext, target: ActorRef, message: RestMessage) extends PerRequest

  case class WithProps(r: RequestContext, props: Props, message: RestMessage) extends PerRequest {
    lazy val target = context.actorOf(props)
  }
}

trait PerRequestCreator {
  this: Actor =>

  def perRequest(r: RequestContext, target: ActorRef, message: RestMessage) =
    context.actorOf(Props(new WithActorRef(r, target, message)))

  def perRequest(r: RequestContext, props: Props, message: RestMessage) =
    context.actorOf(Props(new WithProps(r, props, message)))
}

case class TestMessage(msg: String)

class TestPerRequestActor extends Actor {
  def receive = {
    case t: TestMessage => {
      sender() ! t.msg
    }
  }
}