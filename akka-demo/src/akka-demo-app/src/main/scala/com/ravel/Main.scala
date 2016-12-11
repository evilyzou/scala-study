package com.ravel

import akka.actor.ActorSystem
import akka.event.Logging
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import akka.util.Timeout
import com.typesafe.config.ConfigFactory

import scala.concurrent.duration._
import scala.io.StdIn

/**
 * Created by CloudZou on 12/9/2016.
 */
object Main extends App with RestInterface with AppEnvironment{
  val config = ConfigFactory.load()
  val host = config.getString("http.host")
  val port = config.getInt("http.port")



  implicit val materializer = ActorMaterializer()
  implicit val timeout = Timeout(10 seconds)
  val api = routes



  Http().bindAndHandle(api, host, port) map { binding =>
    log.info(s"REST interface bound to ${binding.localAddress}")

    StdIn.readLine() // let it run until user presses return
    binding.unbind().onComplete(_ => system.terminate())
  } recover {
    case ex => log.info(s"REST interface could not bind to $host:$port", ex.getMessage)
  }
}

trait AppEnvironment {
  implicit val system = ActorSystem("ravel-app")
  implicit val executionContext = system.dispatcher
  val log = Logging.getLogger(system.eventStream, this.getClass)
}