package com.ravel

import akka.actor.{Props, ActorSystem}
import akka.event.Logging
import akka.util.Timeout
import com.ravel.actors.{Starter, RavelActor}
import com.ravel.async.RavelConnectionPool
import com.typesafe.config.ConfigFactory
import scalikejdbc.ConnectionPool
import scala.concurrent.duration._

/**
 * Created by CloudZou on 12/12/16.
 */
object Config{
  val config = ConfigFactory.load()
  val host = config.getString("http.host")
  println(host)
  val port = config.getInt("http.port")

  implicit val system = ActorSystem("ravel-app")
  implicit val executionContext = system.dispatcher
  val log = Logging.getLogger(system.eventStream, this.getClass)

  val esHost = config.getString("elasticsearch.host")
  val esPort = config.getInt("elasticsearch.port")
  val esIndex = config.getString("elasticsearch.index")
  val esTypeProduct = config.getString("elasticsearch.type.product")
  val esTypeGuide = config.getString("elasticsearch.type.guide")

  ConnectionPool.singleton(config.getString("mysql.jdbc.url"), config.getString("mysql.jdbc.user"), config.getString("mysql.jdbc.password"))
  RavelConnectionPool.singleton(config.getString("mysql.jdbc.url"), config.getString("mysql.jdbc.user"), config.getString("mysql.jdbc.password"))

  val starter = system.actorOf(Props[Starter], name = "main")
  val ravelActor = system.actorOf(Props[RavelActor], "ravel")

  implicit val ravelActorTimeout = Timeout(5 seconds)
}
