package com.ravel

import akka.actor.{ActorSystem, Props}
import com.ravel.actors.Starter
import com.ravel.{Config => c}
/**
 * Created by CloudZou on 12/12/16.
 */
object Application extends App{
  val system = ActorSystem("ravel-app")

  val starter = system.actorOf(Props[Starter], name = "main")
  starter ! Starter.Start
}
