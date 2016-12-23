package com.ravel.actors

import akka.actor.{Actor, ActorLogging}
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import com.ravel.{Config => C, RestInterface}

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
//  implicit val executionContext = scala.concurrent.ExecutionContext

  def receive: Receive = {
    case Start =>
      Http().bindAndHandle(routes, C.host, C.port) map { binding =>
        log.info(s"REST interface bound to ${binding.localAddress}")

        val s = StdIn.readLine() // let it run until user presses return
        println(s"xx:$s")
        binding.unbind().onComplete(e =>{
          log.error("error occured")
          system.terminate()
        } )
      } recover {
        case ex => log.info(s"REST interface could not bind to $C.host:$C.port", ex.getMessage)
      }
  }
}
