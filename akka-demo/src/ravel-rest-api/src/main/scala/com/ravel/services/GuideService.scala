package com.ravel.services

import akka.actor.{ActorLogging, Actor}
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

/**
 * Created by CloudZou on 12/13/16.
 */

object GuideService {
  sealed trait Query
  case class ListQuery(filter: GuideSearchFilter) extends Query
  case class SingleQuery(id: Int) extends Query
  case class GuideInfrasQuery(guideId: Int) extends Query
}

class GuideService extends Actor with ActorLogging {

  def receive = {
    case _ =>
  }
}

object GuideService2 extends InfraService{
  def list(filter: GuideSearchFilter) = {
    GuideSearch.queryGuides(filter)
  }

  def get(id: Int) = {
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
