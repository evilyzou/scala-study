package com.ravel

import akka.actor.{Props, ActorSystem}
import akka.event.Logging
import akka.routing.RoundRobinPool
import akka.routing.{RandomPool, RoundRobinPool}
import akka.util.Timeout
import com.github.mauricio.async.db.Configuration
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.ravel.actors.{Starter}
import com.ravel.connection.{MySQLConnectionPool, MySQLConnectionActor}
import com.ravel.services.{Banner, Mediator}
import com.typesafe.config.{Config, ConfigFactory}
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

  val mysqlUser = config.getString("mysql.user")


  val configuration = getMySqlConfiguration(config)
  val poolActorRef = system.actorOf(Props(classOf[MySQLConnectionPool], PoolConfiguration.Default), "pool-connection-actor")
  val randomRouter = system.actorOf(Props(classOf[MySQLConnectionActor], poolActorRef, configuration, 5.seconds).withRouter(RoundRobinPool(30)))

  val mediator = system.actorOf(Mediator.props)
  val banner = system.actorOf(Banner.props)

  def getMySqlConfiguration(config: Config) = {
    val user = config.getString("mysql.user")
    val host = config.getString("mysql.host")
    val port = config.getInt("mysql.port")
    val password = config.getString("mysql.password")
    val database = config.getString("mysql.database")
    Configuration(username = user, host = host, port = port, password = Option(password), database = Option(database))
  }
}
