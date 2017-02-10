package com.ravel.services

import com.github.mauricio.async.db.ResultSet
import com.ravel.async.{RavelQueryResult, RavelDB}
import com.ravel.model.QueryStatement
import com.ravel.model.RavelObject.{Infra, InfraDesc, InfraFeature}
import scala.collection.immutable.Map

import scala.collection._
import scala.concurrent.Future
import com.ravel.Config._
import akka.pattern.ask
/**
 * Created by CloudZou on 12/31/16.
 */
trait QueryService {
  def single(query: String): Future[Map[String, Any]] = {
    queryFuture(query) { optionResultSet =>
      optionResultSet match {
        case Some(resultSet) if resultSet.size > 0 =>  {
          resultSet.columnNames.map(x => (capitalizeName(x), resultSet(0)(x)))(breakOut)
        }
        case Some(resultSet) if resultSet.size == 0 => Map.empty
        case None => Map.empty
      }
    }
  }

  def mulptile(query: String) = {
    queryFuture(query) { optionResultSet =>
      optionResultSet match {
        case Some(resultSet) if resultSet.size > 0 =>  {
          resultSet map { result =>
            resultSet.columnNames.map(x => (capitalizeName(x), result(x)))(breakOut).toMap
          }
        }
        case Some(resultSet) if resultSet.size == 0 => Seq.empty
        case None => Seq.empty
      }
    }
  }

  private[services] def capitalizeName(columnName: String): String = {
    val cn = columnName.split('_').map(_.capitalize).mkString("")
    Character.toLowerCase(cn.charAt(0)) + cn.substring(1)
  }

  def queryFuture[T](query: String)(resultFunc: (Option[ResultSet]) => T): Future[T] = {
    randomRouter ? QueryStatement(query) map { queryResult =>
      resultFunc(queryResult.asInstanceOf[RavelQueryResult].rows)
    }
  }
}

trait InfraService extends QueryService{
  def infraDescQuery(id: Int) = s"select * from infrastructure_desc where infra_id=${id}"
  def infraQuery(id: Int) = s"select * from infrastructure where id=${id}"

  def getInfra(infraId: Int) = {
    import spray.json._
    import com.ravel.model.RavelObject._
    import com.ravel.resources.RavelJsonSupport._

    for {
      infra <- single(infraQuery(infraId))
      infraDescs <- mulptile(infraDescQuery(infraId))
    } yield {
      val infraFeature = infra.get("feature") match {
        case Some(x: String) => x.parseJson.convertTo[InfraFeature]
        case _ => throw new DeserializationException("InfraFeature expected")
      }
      val infraDescSeq = infraDescs map { infraDesc =>
        InfraDesc(infraDesc.get("content"), infraDesc.get("content_picture_url"))
      }
      Infra(infra.get("type"), infra.get("title"), infra.get("city"), infra.get("address"), infra.get("phone"), infraFeature, infraDescSeq)
    }
  }
}
