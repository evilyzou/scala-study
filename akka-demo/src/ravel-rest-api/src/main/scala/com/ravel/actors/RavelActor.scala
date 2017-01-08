package com.ravel.actors

import akka.actor.Actor.Receive
import akka.actor.{ActorLogging, Actor}
import com.ravel.message.MessageObject.GuideMessageObject.GuideList
import com.ravel.services.GuideService
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 1/8/17.
 */
class RavelActor extends Actor with ActorLogging{
  override def preStart() = {
  }

  override def receive: Receive = {
    case GuideList(filter) => {
      val future = GuideService.list(filter)
      val _sender = sender()
      future onSuccess {
        case result => _sender ! result
      }
      future onFailure {
        case e: Throwable => throw e
      }
    }
  }
}
