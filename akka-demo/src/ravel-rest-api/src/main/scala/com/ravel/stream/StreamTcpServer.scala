package com.ravel.stream

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}
import akka.stream.io.Framing
import akka.stream.scaladsl.{Flow, Source, Tcp, Sink}
import akka.util.ByteString

import scala.concurrent.Future
import scala.util.{Failure, Success}

/**
 * Created by CloudZou on 1/10/2017.
 */
object StreamTcpServer extends App{
  def mkServer(address: String, port: Int)(implicit system: ActorSystem, materializer: Materializer) = {
    import system.dispatcher

    val connectionHandler: Sink[Tcp.IncomingConnection, Future[akka.Done]] =
      Sink.foreach[Tcp.IncomingConnection] { conn =>
        println(s"Incoming connection from: ${conn.remoteAddress}")
        conn.handleWith(serverLogic)
      }

    val incomingConnections: Source[Tcp.IncomingConnection, Future[Tcp.ServerBinding]] =
      Tcp().bind(address, port)

    val binding: Future[Tcp.ServerBinding] = incomingConnections.to(connectionHandler).run()

    binding onComplete {
      case Success(b) =>
        println(s"Server started, listening on: ${b.localAddress}")
      case Failure(e) =>
        println(s"Server could not be bound to $address:$port: ${e.getMessage}")
    }
  }

  val serverLogic = Flow[ByteString]
    .via(Framing.delimiter(ByteString("\n"), maximumFrameLength = 256, allowTruncation = true))
    .map(_.utf8String)
    .map(msg => s"Server hereby responds to message: $msg\n")
    .map(ByteString(_))

  val address = "127.0.0.1"
  val port = 6666

  def mkAkkaServer() = {
    implicit val server = ActorSystem("Server")
    implicit val materializer = ActorMaterializer()

    mkServer(address, port)
  }

  mkAkkaServer()
}
