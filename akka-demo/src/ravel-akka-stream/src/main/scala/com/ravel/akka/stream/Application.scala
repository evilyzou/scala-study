package com.ravel.akka.stream

/**
 * Created by CloudZou on 2/17/2017.
 */

import scala.concurrent._
import akka._
import akka.actor._
import akka.stream._
import akka.stream.scaladsl._
import akka.actor.ActorDSL._
import akka.util._
import scala.concurrent.duration._
import scala.util.{Try, Success}


object Application extends App{
  implicit val system = ActorSystem("TestSystem")
  implicit val materializer = ActorMaterializer()
  import system.dispatcher

//  Source.single("xxx")
//
//  def run(actor: ActorRef) = {
//    Future {Thread.sleep(300); actor ! 1}
//    Future {Thread.sleep(300); actor ! 2}
//    Future {Thread.sleep(300); actor ! 3}
//  }
//
//  val s = Source.actorRef[Int](bufferSize = 0, OverflowStrategy.fail)
//          .mapMaterializedValue(run)
//
//  s runForeach println
//
//

//  val actor = system.actorOf(Props(new Actor {
//    override def receive = {
//      case msg => println(s"actor recevied : ${msg} ")
//    }
//  }))
//
//  val sink = Sink.actorRef[Int](actor, onCompleteMessage = "stream completed")
//  val runnable = Source(1 to 3 ) to sink
//  runnable.run()
//


//  val source = Source(1 to 3)
//
//  val sink = Sink.foreach[Int](println)
//
//  val invert = Flow[Int].map(elem => elem * -1)
//
//  val doubler = Flow[Int].map(elem => elem * 2)
//
//  val runnable = source via invert via doubler to sink
//  runnable.run()


//  Source(1 to 6).via(Flow[Int].map(_ * 2)).to(Sink.foreach(println(_))).run()

//  val f = Flow[Int].map(_ * 2).runWith(Source(1 to 10), Sink.ignore)

//  val value = Source("Hello world".toList)
//    .map(c => c.toUpper)
//    .concat(Source("!!!"))
//    .runWith(Sink.fold("12") { case (acc, c) => acc + c})
//
//  value.onComplete {
//    case text =>  println(text)
//  }

//  val g = RunnableGraph.fromGraph(GraphDSL.create() { implicit builder: GraphDSL.Builder[NotUsed] =>
//    import GraphDSL.Implicits._
//
//    val in = Source(1 to 10)
//    val out = Sink.ignore
//
//    val bcast = builder.add(Broadcast[Int](2))
//    val merge = builder.add(Merge[Int](2))
//
//    val f1, f2, f3, f4 = Flow[Int].map(_ + 10)
//
//    in ~> f1 ~>bcast ~> f2 ~> merge ~> f3 ~> out
//    bcast ~> f4 ~> merge
//    ClosedShape
//  })

//  val topHeadSink = Sink.head[Int]
//  val bottomHeadSink = Sink.head[Int]
//  val sharedDoubler = Flow[Int].map(_ * 2)
//
//  val f = RunnableGraph.fromGraph(GraphDSL.create(topHeadSink, bottomHeadSink)((_, _)) { implicit builder =>
//    (topHS, bottomHS) =>
//      import GraphDSL.Implicits._
//      val broadcast = builder.add(Broadcast[Int](2))
//      Source.single(1) ~> broadcast.in
//
//      broadcast.out(0) ~> sharedDoubler ~> topHS.in
//      broadcast.out(1) ~> sharedDoubler ~> bottomHS.in
//      ClosedShape
//  })
//  f.run()._1 onComplete {
//    case x => println(x)
//  }


  //
  //xxxx111

//  val pickMaxOfThree = GraphDSL.create() { implicit  b =>
//    import GraphDSL.Implicits._
//
//    val zip1 = b.add(ZipWith[Int, Int, Int](math.max _))
//    val zip2 = b.add(ZipWith[Int, Int, Int](math.max _))
//    zip1.out ~> zip2.in0
//
//    UniformFanInShape(zip2.out, zip1.in0, zip1.in1, zip2.in1)
//  }
//
//  val resultSink = Sink.head[Int]
//
//  val g = RunnableGraph.fromGraph(GraphDSL.create(resultSink) { implicit b => sink =>
//    import GraphDSL.Implicits._
//
//    val pm3 = b.add(pickMaxOfThree)
//
//    Source.single(1) ~> pm3.in(0)
//    Source.single(2) ~> pm3.in(1)
//    Source.single(3) ~> pm3.in(2)
//
//    pm3.out ~> sink.in
//    ClosedShape
//  })
//
//  val max: Future[Int] = g.run()
//  println(s"result is :${Await.result(max, 300.millisecond)}")


//  val pairs = Source.fromGraph(GraphDSL.create() { implicit b =>
//    import GraphDSL.Implicits._
//
//    val zip = b.add(Zip[Int, Int]())
//    def ints = Source.fromIterator(() => Iterator.from(1,3))
//
//    ints.filter(_ % 2 != 0) ~> zip.in0
//    ints.filter(_ % 2 == 0) ~> zip.in1
//
//    SourceShape(zip.out)
//  })
//  val firstPair: Future[(Int, Int)] = pairs.runWith(Sink.head)
//  firstPair onComplete {
//    case Success(t) =>{
//      val (x,y) = t.asInstanceOf[Tuple2[Int,Int]]
//      println(s"x:${x},y: ${y}")
//    }
//  }



  val sourceOne = Source(List(1))
  val sourceTwo = Source(List(2))
  val merged = Source.combine(sourceOne, sourceTwo)(Merge(_))
  val mergedResult = merged.runWith(Sink.fold(0)(_ + _))
  mergedResult onComplete {
    case Success(x) => println(s"merged: ${x}")
  }


}
