package com.ravel.services

import akka.actor.{Props, ActorLogging, Actor}
import akka.routing.RandomPool

import scala.collection._
import scala.collection.immutable.Map
import scala.concurrent.Future
import scala.util.{Failure, Success}
import scala.concurrent.duration._
import akka.pattern._
import scala.concurrent.ExecutionContext.Implicits._
/**
 * Created by CloudZou on 1/2/17.
 */
object Banner {
  sealed trait BannerQuery
  final case object GetIndexBannerQuery extends BannerQuery
  final case object GetProductBannerQuery extends BannerQuery
  final case object GetGuideBannerQuery extends BannerQuery
  final case object UpdateCacheQuery

  def props: Props = Props(classOf[Banner]).withRouter(RandomPool(20))
}


class Banner extends Actor with ActorLogging with BannerQuery{
  import Banner._

  val system = context.system
  val scheduler = system.scheduler

  var indexBannerCache = Seq.empty[Map[String,Any]]
  var productBannerCache = Seq.empty[Map[String,Any]]
  var guideBannerCache = Seq.empty[Map[String,Any]]

  override def preStart() = {
    scheduler.schedule(0.seconds, 60.seconds, self, UpdateCacheQuery)
  }

  def receive = {
    case GetIndexBannerQuery => getActiveBanners().pipeTo(sender())
    case GetProductBannerQuery => getActiveBanners().pipeTo(sender())
    case GetGuideBannerQuery => getActiveBanners().pipeTo(sender())
    case UpdateCacheQuery => {
      getActiveBanners onComplete {
        case Success(banners: Seq[Map[String, Any]]) =>{
          indexBannerCache = banners
          productBannerCache = banners
          guideBannerCache = banners
        }
        case Failure(e) =>{ log.info(s"update banner cache failed,${e}"); None}
      }
    }
  }
}

trait BannerQuery extends QueryService{
  def getActiveBanners(): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from banner where status=0"
    mulptile(query)
  }
}
