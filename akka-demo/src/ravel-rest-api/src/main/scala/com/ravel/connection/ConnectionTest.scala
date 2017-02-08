package com.ravel.connection

import akka.actor.{ActorRef, Actor, Props, ActorSystem}
import akka.pattern.ask
import akka.util.Timeout
import com.github.mauricio.async.db.Configuration
import com.github.mauricio.async.db.mysql.MySQLConnection
import com.github.mauricio.async.db.pool.PoolConfiguration
import com.ravel.connection.ConnectionPool.Borrow
import com.ravel.model.QueryStatement
import scala.concurrent.Future
import scala.concurrent.duration._
import scala.util.{Success, Failure}

/**
 * Created by CloudZou on 2/8/2017.
 */
object ConnectionTest extends App{
  implicit val system = ActorSystem("ravel-connection-test")
  implicit val executionContext = system.dispatcher
  implicit val timeout = Timeout(5 seconds)


  val configuration = Configuration(username = "root", host ="127.0.0.1", port = 3306, password = Option("ex299295"), database = Option("ravel"))
  val objectFactory = new MySQLConnectionFactory(configuration = configuration)
  val connectionPool = system.actorOf(Props(classOf[ConnectionPool[MySQLConnection]], objectFactory, PoolConfiguration.Default), "connection-pool")
  val connectionActorFuture = connectionPool ? Borrow
  val resultFuture = connectionActorFuture.flatMap { actor =>
    val s = actor.asInstanceOf[ActorRef]
    s ? QueryStatement("select count(1) from product")
  }
  resultFuture.flatMap { t =>
    println(t)
    Future.successful(1)
  }
}
