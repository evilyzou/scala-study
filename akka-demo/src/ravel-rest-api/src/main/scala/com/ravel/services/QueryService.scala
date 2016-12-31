package com.ravel.services

import com.github.mauricio.async.db.ResultSet
import com.ravel.async.RavelDB
import scala.collection.immutable.Map

import scala.collection._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

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

  private[services] def capitalizeName(columnName: String): String = {
    val cn = columnName.split('_').map(_.capitalize).mkString("")
    Character.toLowerCase(cn.charAt(0)) + cn.substring(1)
  }

  def queryFuture[T](query: String)(resultFunc: (Option[ResultSet]) => T): Future[T] = {
    RavelDB.withPool { session =>
      val future = session.connection.sendQuery(query)
      future map { queryResult => resultFunc(queryResult.rows) }
    }
  }
}