package app;

/**
 * Created by CloudZou on 12/5/2016.
 */
object AkkaStreamSmaple extends App{
  def mkServer(address: String, port: Int)(implicit system: ActorSystem, materializer: Materializer): Unit = {
//    import system.dispatcher
//
//    val connectionHandler: Sink[Tcp.IncomingConnection, Future[Unit]] =
//      Sink.foreach[Tcp.IncomingConnection] { conn =>
//      println(s"Incoming connection from: ${conn.remoteAddress}")
//      conn.handleWith(serverLogic)
//    }
//
//    val incomingCnnections: Source[Tcp.IncomingConnection, Future[Tcp.ServerBinding]] =
//      Tcp().bind(address, port)
//
//    val binding: Future[Tcp.ServerBinding] =
//      incomingCnnections.to(connectionHandler).run()
//
//    binding onComplete {
//      case Success(b) =>
//        println(s"Server started, listening on: ${b.localAddress}")
//      case Failure(e) =>
//        println(s"Server could not be bound to $address:$port: ${e.getMessage}")
//    }
//  }
//
//  val serverLogic: Flow[ByteString, ByteString, Unit] = {
//    val delimiter = Framing.delimiter(
//      ByteString("\n"),
//      maximumFrameLength = 256,
//      allowTruncation = true)
//
//    val receiver = Flow[ByteString].map { bytes =>
//      val message = bytes.utf8String
//      println(s"Server received: $message")
//      message
//    }
//
//    val responder = Flow[String].map { message =>
//      val answer = s"Server hereby responds to message: $message\n"
//      ByteString(answer)
//    }
//
//    Flow[ByteString]
//      .via(delimiter)
//      .via(receiver)
//      .via(responder)
  }
}
