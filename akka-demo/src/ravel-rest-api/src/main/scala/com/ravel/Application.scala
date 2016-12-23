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
  val system = ActorSystem("ravel-app")

  val starter = system.actorOf(Props[Starter], name = "main")
  starter ! Starter.Start
}
