package com.ravel.stream

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.stream.scaladsl.{Framing, Flow, Tcp}
import akka.util.ByteString

import scala.io.StdIn

/**
 * Created by CloudZou on 1/10/2017.
 */
object SimpleTcpClient extends App{
  implicit val client = ActorSystem("SimpleTcpClient")
  implicit val materializer = ActorMaterializer()

  val address = "127.0.0.1"
  val port = 6666

  val connection = Tcp().outgoingConnection(address, port)

  val flow = Flow[ByteString]
    .via(Framing.delimiter(ByteString("\n"), maximumFrameLength = 256, allowTruncation = true))
    .map(_.utf8String)
    .map(println)
    .map(_=> StdIn.readLine("> "))
    .map(_+"\n")
    .map(ByteString(_))

  connection.join(flow).run()
}
