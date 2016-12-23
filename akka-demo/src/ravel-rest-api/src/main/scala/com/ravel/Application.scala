package com.ravel

import akka.actor.{ActorLogging, ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import com.ravel.RestInterface._
import com.ravel.actors.Starter
import com.ravel.{Config => C}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.io.StdIn

/**
 * Created by CloudZou on 12/12/16.
 */
object Application extends App {
//  val system = ActorSystem("ravel-app")
//
//  val starter = system.actorOf(Props[Starter], name = "main")
//  starter ! Starter.Start
  implicit val system = ActorSystem("my-system")

  import akka.stream.ActorMaterializer
  implicit val materializer = ActorMaterializer()

  Http().bindAndHandle(routes, C.host, C.port) map { binding =>
    C.log.info(s"REST interface bound to ${binding.localAddress}")

    StdIn.readLine() // let it run until user presses return
    binding.unbind().onComplete(e =>{
      C.log.error("error occured")
      system.terminate()
    } )
  } recover {
    case ex => C.log.info(s"REST interface could not bind to $C.host:$C.port", ex.getMessage)
  }
}
