package com.ravel.resources

import akka.actor.SupervisorStrategy.Stop
import akka.actor._
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
  //target ! message

  def receive: Receive = {
    case res: RestMessage => {
      val future = complete(OK, "<h1>say hello to akka-http</h1>")

      val _sender = sender()
      future onSuccess {
        case result => _sender ! result
      }
      future onFailure {
        case e: Throwable => throw e
      }
    }
    case _ => {
      println("xxxx here")
    }
  }

  def complete[T <: AnyRef](status: StatusCode, obj: T) = {
    val routeResult = r.complete(HttpEntity("<h1>say hello to akka-http</h1>"))
    stop(self)
    routeResult
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

object PerRequestCreator {
  def perRequest(context: ActorContext, r: RequestContext, target: ActorRef, message: RestMessage) =
    context.actorOf(Props(new WithActorRef(r, target, message)))

  def perRequest(context: ActorContext,r: RequestContext, props: Props, message: RestMessage) = {
    context.actorOf(Props(new WithProps(r, props, message)))
  }
}

class TestPerRequestActor extends Actor {
  def receive = {
    case t: RestMessage => {
      context.parent ! RestMessage("message from TestPerRequestActor")
    }
  }
}