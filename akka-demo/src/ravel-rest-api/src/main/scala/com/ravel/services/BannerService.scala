package com.ravel.services

import scala.collection._
import scala.collection.immutable.Map
import scala.concurrent.Future

/**
 * Created by CloudZou on 1/2/17.
 */
object BannerService extends QueryService{
  def getActiveBanners(): Future[Seq[Map[String, Any]]] = {
    val query =s"select * from banner where status=0"
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
}
