package com.ravel.actors

import akka.actor.{Actor, ActorLogging}
import akka.event.{LoggingAdapter, Logging}
import akka.event.Logging.LogLevel
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpEntity, HttpRequest}
import akka.http.scaladsl.server.RouteResult.Complete
import akka.http.scaladsl.server._
import akka.http.scaladsl.server.directives.{LoggingMagnet, DebuggingDirectives, LogEntry}
import akka.stream.scaladsl.Sink
import akka.stream.{Materializer, ActorMaterializer}
import com.ravel.{Config => C, RestInterface}

import scala.concurrent.{Future, ExecutionContext}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.io.StdIn

/**
 * Created by CloudZou on 12/12/16.
 */

object Starter {
  case object Start
  case object Stop
}

class Starter extends Actor with ActorLogging{
  import RestInterface._
  import Starter.Start

  implicit val system = context.system
  implicit val materializer = ActorMaterializer()

  def receive: Receive = {
    case Start =>
      Http().bindAndHandle(routes, C.host, C.port) map { binding =>
        log.info(s"REST interface bound to ${binding.localAddress}")

        Thread.sleep(1000 * 3)
        val s = StdIn.readLine() // let it run until user presses return
        log.info(s"xx:$s")
        binding.unbind().onComplete(e =>{
          log.error("error occured")
          system.terminate()
        } )
      } recover {
        case ex => log.info(s"REST interface could not bind to ${C.host}:${C.port}", ex)
      }
  }
}
