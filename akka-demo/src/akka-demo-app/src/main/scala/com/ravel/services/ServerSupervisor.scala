package com.ravel.services

import akka.actor._

/**
 * Created by CloudZou on 12/12/16.
 */
class ServerSupervisor extends Actor{
  def actorRefFactory = context
  def receive = runRoute(
    pathPrefix("api" / "v1") {
      taskServiceRoutes
    }
  )
}
