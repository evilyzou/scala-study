package com.ravel.akka.stream

import akka.actor.ActorSystem
import akka.stream._
import akka.stream.scaladsl._

/**
 * Created by CloudZou on 2/21/2017.
 */
object ComplexGraph extends App{
  implicit val system = ActorSystem("TestSystem")
  implicit val materializer = ActorMaterializer()
  import system.dispatcher



//  RunnableGraph.fromGraph(GraphDSL.create() { implicit b =>
//    import GraphDSL.Implicits._
//
//    val A: Outlet[Int]        = b.add(Source.single(0)).out
//    val B: UniformFanOutShape[Int, Int]  = b.add(Broadcast[Int](2))
//    val C: UniformFanInShape[Int, Int]   = b.add(Merge[Int](2))
//    val D: FlowShape[Int, Int]          = b.add(Flow[Int].map(_ + 1))
//    val E: UniformFanOutShape[Int, Int] = b.add(Balance[Int](2))
//    val F: UniformFanInShape[Int, Int]  = b.add(Merge[Int](2))
//    val G: Inlet[Any]         =  b.add(Sink.foreach(println)).in
//
//              C     <~    F
//    A ~> B ~> C     ~>    F
//         B ~> D  ~> E ~>  F
//                    E ~>  G
//
//    ClosedShape
//  }).run()


  import GraphDSL.Implicits._
  RunnableGraph.fromGraph(GraphDSL.create() { implicit builder =>
    val B = builder.add(Broadcast[Int](2))
    val C = builder.add(Merge[Int](2))
    val E = builder.add(Balance[Int](2))
    val F = builder.add(Merge[Int](2))

    Source.single(0) ~> B.in; B.out(0) ~> C.in(1); C.out ~> F.in(0)
    C.in(0) <~ F.out

    B.out(1).map(_ + 1) ~> E.in; E.out(0) ~> F.in(1)
    E.out(1) ~> Sink.foreach(println)
    ClosedShape
  }).run()
}

