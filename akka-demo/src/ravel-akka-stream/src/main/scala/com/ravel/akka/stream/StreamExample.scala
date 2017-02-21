package com.ravel.akka.stream

import akka.NotUsed
import akka.actor.ActorSystem
import akka.stream._
import akka.stream.FanInShape._
import akka.stream.scaladsl._
import scala.collection.immutable
/**
 * Created by CloudZou on 2/21/2017.
 */

object SteamExample extends App {
  implicit val system = ActorSystem("TestSystem")
  implicit val materializer = ActorMaterializer()
  import system.dispatcher

  val worker1 = Flow[String].map("step 1 " + _)
  val worker2 = Flow[String].map("step 2 " + _)

  RunnableGraph.fromGraph(GraphDSL.create() { implicit  b =>
    import GraphDSL.Implicits._

    val priorityPool1 = b.add(PriorityWorkerPool(worker1, 4))
    val priorityPool2 = b.add(PriorityWorkerPool(worker2, 2))

    Source(1 to 10000000).map("job: "+ _) ~> priorityPool1.jobsIn
    Source(1 to 10000000).map("priority job: " + _) ~> priorityPool1.priorityJobsIn

    priorityPool1.resultsOut ~> priorityPool2.jobsIn
    Source(1 to 1000000).map("one-step, priority:" + _) ~> priorityPool2.priorityJobsIn

    priorityPool2.resultsOut ~> Sink.foreach(println)
    ClosedShape
  }).run()
}


object PriorityWorkerPool {
  def apply[In, Out](worker: Flow[In, Out, Any], workerCount: Int): Graph[PriorityWorkerPoolShape[In, Out], Unit] = {
    GraphDSL.create() { implicit b =>
      import GraphDSL.Implicits._

      val priorityMerge = b.add(MergePreferred[In](1))
      val balance = b.add(Balance[In] (workerCount))
      val resultsMerge = b.add(Merge[Out](workerCount))

      priorityMerge ~> balance

      for (i <- 0 until workerCount)
        balance.out(i) ~> worker ~> resultsMerge.in(i)

      PriorityWorkerPoolShape(jobsIn = priorityMerge.in(0), priorityJobsIn = priorityMerge.preferred, resultsOut = resultsMerge.out)
    }
  }
}

//class PriorityWorkerPoolShape2[In, Out](_init: Init[Out] = Name("PriorityWorkerPool"))
//  extends FanInShape[Out](_init) {
//  protected override def construct(i: Init[Out]) = new PriorityWorkerPoolShape2(i)
//
//  val jobsIn = newInlet[In]("jobsIn")
//  val priorityJobsIn = newInlet[In]("priorityJobsIn")
//}

case class PriorityWorkerPoolShape[In, Out](
                                             jobsIn:         Inlet[In],
                                             priorityJobsIn: Inlet[In],
                                             resultsOut:     Outlet[Out]) extends Shape {

  // It is important to provide the list of all input and output
  // ports with a stable order. Duplicates are not allowed.
  override val inlets: immutable.Seq[Inlet[_]] =
    jobsIn :: priorityJobsIn :: Nil
  override val outlets: immutable.Seq[Outlet[_]] =
    resultsOut :: Nil

  // A Shape must be able to create a copy of itself. Basically
  // it means a new instance with copies of the ports
  override def deepCopy() = PriorityWorkerPoolShape(
    jobsIn.carbonCopy(),
    priorityJobsIn.carbonCopy(),
    resultsOut.carbonCopy())

  // A Shape must also be able to create itself from existing ports
  override def copyFromPorts(
                              inlets:  immutable.Seq[Inlet[_]],
                              outlets: immutable.Seq[Outlet[_]]) = {
    assert(inlets.size == this.inlets.size)
    assert(outlets.size == this.outlets.size)
    // This is why order matters when overriding inlets and outlets.
    PriorityWorkerPoolShape[In, Out](inlets(0).as[In], inlets(1).as[In], outlets(0).as[Out])
  }
}