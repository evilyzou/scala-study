package com.ravel.async

import com.github.mauricio.async.db.ResultSet

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/29/2016.
 */

/**
 * Query Result
 */
 class RavelQueryResult(
                                 val rowsAffected: Option[Long],
                                 val statusMessage: Option[String],
                                 val rows: Option[ResultSet]
                                 ) {

  //val generatedKey: Future[Option[Long]]

  override def toString(): String = {
    s"rowsAffected: ${rowsAffected}, statusMessage: ${statusMessage}, rows: ${rows}"
  }

}
