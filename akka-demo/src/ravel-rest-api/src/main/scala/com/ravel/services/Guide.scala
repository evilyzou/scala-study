package com.ravel.services

import akka.actor.{Props, ActorLogging, Actor}
import com.ravel.model.RavelObject.{Infra, InfraDesc, InfraFeature}
import com.ravel.resources.GuideSearchFilter
import com.ravel.elasticsearch.GuideSearch
import spray.json._
import com.ravel.model.RavelObject._

import scala.collection._
import scala.concurrent.Future
import scala.collection.immutable.Map
import scala.concurrent.ExecutionContext.Implicits.global
import com.ravel.resources.RavelJsonSupport._
import scala.concurrent.duration._

import akka.pattern._

import scala.util.{Failure, Success}

/**
 * Created by CloudZou on 12/13/16.
 */

object Guide {
  sealed trait Query
  case object SingleQuery extends Query

  case object UpdateCacheQuery extends Query

  def props(id: Int): Props = Props(classOf[Guide], id)
}

class Guide(id: Int) extends Actor with ActorLogging with GuideQuery{
  import Guide._

  val system = context.system
  val scheduler = system.scheduler

  var guideView: Option[GuideView] = None

  override def preStart() = {
   scheduler.schedule(0.seconds, 60.seconds, self, UpdateCacheQuery)
  }

  def receive = {
    case SingleQuery => {
      val _sender = sender()
      guideView match {
        case Some(gv) => _sender ! gv
        case None => getGuide(id).pipeTo(_sender)
      }
    }
    case UpdateCacheQuery => {
      getGuide(id) onComplete {
        case Success(gv: GuideView) =>{
          guideView = Some(gv)
        }
        case Failure(_) =>{ log.info("update guide cache failed"); None}
      }
    }
    case _ =>
  }


}

trait GuideQuery extends InfraService {
  def getGuide(id: Int): Future[GuideView] = {
    val guideQuery = s"select * from guide where id=${id}"
    for {
      guide <- single(guideQuery)
      guideInfras <- getGuideInfras(id)
    } yield GuideView(guide, guideInfras)
  }

  def getGuideInfras(guideId: Int) = {
    val guideInfraQuery = s"select * from guide_infra where guide_id = ${guideId}"
    for {
      guideInfras <- mulptile(guideInfraQuery)
      infras <- getInfras(guideInfras)
    } yield infras
  }

  def getInfras(guideInfras: Seq[Map[String, Any]]) = {
    Future.sequence {
      guideInfras map { guideInfra =>
        val guideInfraType = guideInfra.get("guideInfraType").get.asInstanceOf[String]
        getGuideInfra(guideInfra.get("infraId").get.asInstanceOf[Int], guideInfraType)
      }
    }
  }

  def getGuideInfra(infraId: Int, guideInfraType: String) = {
    getInfra(infraId) map { infra =>
      GuideInfra(guideInfraType, infra)
    }
  }
}

