package com.ravel.services

import akka.actor.{Props, ActorRef, ActorLogging, Actor}
import akka.routing.RandomPool
import akka.util.Timeout
import com.ravel.elasticsearch.{ProductSearch, GuideSearch}
import com.ravel.model.RavelObject.ProductView
import com.ravel.resources.{ProductSearchFilter, GuideSearchFilter}
import com.ravel.services.Guide.SingleQuery
import com.ravel.services.Mediator.{ProductSearchCommand, GuideSearchCommand, GetProductCommand, GetGuideCommand}
import akka.pattern._
import com.ravel.services.Product._
import scala.concurrent.Future
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

  def receive = handleGuide orElse handleProduct

  def handleGuide: Receive = {
    case GetGuideCommand(id: Int) => {
      if (!guideActorMap.contains(id)) {
        guideActorMap += (id -> system.actorOf(Guide.props(id)))
      }
      log.info(s"guide id : ${id}")
      guideActorMap.get(id) match {
        case Some(actorRef) => (actorRef ? SingleQuery).pipeTo(sender())
      }
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
      log.info(s"id:${id}")
      productActorMap.get(id) match {
        case Some(actorRef) => {
          val resultFuture = for {
            product <- (actorRef ? GetProductQuery).mapTo[Map[String, Any]]
            productExt <- (actorRef ? GetProductExtQuery).mapTo[Map[String, Any]]
            productOther <- (actorRef ? GetProductOtherQuery).mapTo[Map[String, Any]]
            productPriceByTeams <- (actorRef ? GetProductPricesQuery).mapTo[Seq[Map[String, Any]]]
          } yield {
            ProductView.apply(product, productExt, productOther, productPriceByTeams)
          }
          resultFuture.pipeTo(sender())
        }
      }
    }
    case ProductSearchCommand(filter: ProductSearchFilter) => ProductSearch.queryProducts(filter).pipeTo(sender())
    case _ =>
  }
}
