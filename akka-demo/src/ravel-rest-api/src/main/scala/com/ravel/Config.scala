package com.ravel

import akka.actor.{Props, ActorSystem}
import akka.event.Logging
import akka.routing.{RandomPool, RoundRobinPool}
import akka.util.Timeout
import com.github.mauricio.async.db.Configuration
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.ravel.actors.{Starter}
import com.ravel.connection.{MySQLConnectionPool, MySQLConnectionActor}
import com.ravel.services.Mediator
import com.typesafe.config.ConfigFactory
import scala.concurrent.duration._

/**
 * Created by CloudZou on 12/12/16.
 */
object Config{
  val config = ConfigFactory.load()
  val host = config.getString("http.host")
  val port = config.getInt("http.port")

  implicit val system = ActorSystem("ravel-app")
  implicit val executionContext = system.dispatcher
  val log = Logging.getLogger(system.eventStream, this.getClass)

  val esHost = config.getString("elasticsearch.host")
  val esPort = config.getInt("elasticsearch.port")
  val esIndex = config.getString("elasticsearch.index")
  val esTypeProduct = config.getString("elasticsearch.type.product")
  val esTypeGuide = config.getString("elasticsearch.type.guide")

  val starter = system.actorOf(Props[Starter], name = "main")

  implicit val timeout = Timeout(5 seconds)
  val configuration = Configuration(username = "root", host ="127.0.0.1", port = 3306, password = Option("ex299295"), database = Option("ravel"))

  val pcf = new PoolConfiguration(50, 4, 10)
  val poolActorRef = system.actorOf(Props(classOf[MySQLConnectionPool], pcf), "pool-connection-actor")
  val randomRouter = system.actorOf(Props(classOf[MySQLConnectionActor], poolActorRef, configuration, 5.seconds).withRouter(RoundRobinPool(30)))

  val mediator = system.actorOf(Mediator.props)
}
