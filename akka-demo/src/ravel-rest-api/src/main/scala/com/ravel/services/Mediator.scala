package com.ravel.services

import java.util.concurrent.TimeoutException

import akka.actor.{Props, ActorRef, ActorLogging, Actor}
import akka.routing.RandomPool
import akka.util.Timeout
import com.ravel.elasticsearch.{ProductSearch, GuideSearch}
import com.ravel.model.RavelObject.{GuideView, ProductView}
import com.ravel.resources.{ProductSearchFilter, GuideSearchFilter}
import com.ravel.services.Guide.{GetGuideQuery}
import com.ravel.services.Mediator.{ProductSearchCommand, GuideSearchCommand, GetProductCommand, GetGuideCommand}
import akka.pattern._
import com.ravel.services.Product._
import scala.concurrent.{Promise, Future}
import scala.concurrent.duration._

/**
 * Created by CloudZou on 2/10/2017.
 */

object Mediator {
  sealed trait MediatorCommand
  final case class GetGuideCommand(id: Int) extends MediatorCommand
  final case class GuideSearchCommand(filter: GuideSearchFilter) extends MediatorCommand

  final case class GetProductCommand(id: Int) extends MediatorCommand
  final case class ProductSearchCommand(filter: ProductSearchFilter) extends MediatorCommand

  def props: Props = Props(classOf[Mediator]).withRouter(RandomPool(20))
}
class Mediator extends Actor with ActorLogging{
  var guideActorMap: Map[Int, ActorRef] = Map()
  var productActorMap: Map[Int, ActorRef] = Map()
  implicit val timeout = new Timeout(5.seconds)
  implicit val dispatcher = context.dispatcher

  val system = context.system
  val scheduler = system.scheduler

  def receive = handleGuide orElse handleProduct

  def handleGuide: Receive = {
    case GetGuideCommand(id: Int) => {
      if (!guideActorMap.contains(id)) {
        guideActorMap += (id -> system.actorOf(Guide.props(id)))
      }
      fetchObject[Option[GuideView]](guideActorMap.get(id), GetGuideQuery).pipeTo(sender())
    }
    case GuideSearchCommand(filter: GuideSearchFilter) => {
      GuideSearch.queryGuides(filter).pipeTo(sender())
    }
  }

  def handleProduct: Receive = {
    case GetProductCommand(id: Int) => {
      if (!productActorMap.contains(id)) {
        productActorMap += (id -> system.actorOf(Product.props(id)))
      }
      fetchObject[Option[ProductView]](productActorMap.get(id), GetProductQuery).pipeTo(sender())
    }
    case ProductSearchCommand(filter: ProductSearchFilter) => ProductSearch.queryProducts(filter).pipeTo(sender())
  }

  def fetchObject[T](actorRefOption: Option[ActorRef], message: AnyRef): Future[T] = {
    val promise = Promise[T]
    actorRefOption match {
      case Some(actorRef) => {
        scheduler.scheduleOnce(5.seconds) {
          promise tryFailure new TimeoutException
        }

        actorRef ! message
        context.become(objectReceive(promise))
      }
      case None => promise tryFailure new Exception("actor ref is null")
    }
    promise.future
  }

  def objectReceive[T](promise: Promise[T]): Receive = {
    case obj: T@unchecked => {
      promise.success(obj)
      context.unbecome()
    }
  }

}
