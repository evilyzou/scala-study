package com.ravel

import akka.actor.ActorSystem
import akka.event.Logging
import com.typesafe.config.ConfigFactory;

/**
 * Created by CloudZou on 12/12/16.
 */
object Config {
  val config = ConfigFactory.load()
  val host = config.getString("http.host")
  println(host)
  val port = config.getInt("http.port")

  implicit val system = ActorSystem("ravel-app")
  implicit val executionContext = system.dispatcher
  val log = Logging.getLogger(system.eventStream, this.getClass)

}
