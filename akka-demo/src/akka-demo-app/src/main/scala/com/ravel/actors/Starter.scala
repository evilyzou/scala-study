package com.ravel.actors

import akka.actor.{Actor, Props}
import akka.http.scaladsl.Http
import akka.routing.{ActorRefRoutee, RoundRobinRoutingLogic, Router}
import com.ravel.RestInterface
import com.ravel.services.ServerSupervisor
import com.ravel.Config._

import scala.io.StdIn

/**
 * Created by CloudZou on 12/12/16.
 */

object Starter {
  case object Start
  case object Stop
}

class Starter extends Actor {
  import Starter.Start
  import RestInterface._

  implicit val system = context.system

  def receive: Receive = {
    case Start =>
      Http().bindAndHandle(routes, host, port) map { binding =>
        log.info(s"REST interface bound to ${binding.localAddress}")

        StdIn.readLine() // let it run until user presses return
        binding.unbind().onComplete(_ => system.terminate())
      } recover {
        case ex => log.info(s"REST interface could not bind to $host:$port", ex.getMessage)
      }
  }
}
