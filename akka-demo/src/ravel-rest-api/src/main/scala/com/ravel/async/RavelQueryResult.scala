package com.ravel.async

import com.github.mauricio.async.db.ResultSet

import scala.concurrent.Future

/**
 * Created by CloudZou on 12/29/2016.
 */

/**
 * Query Result
 */
abstract class RavelQueryResult(
                                 val rowsAffected: Option[Long],
                                 val statusMessage: Option[String],
                                 val rows: Option[ResultSet]
                                 ) {

  val generatedKey: Future[Option[Long]]

}

//
//trait RavelResultSet extends WrappedResultSet {
//
//  def next(): Boolean
//
//  def tail(): RavelResultSet
//}
//
//class RavelResultSetImpl(rows: IndexedSeq[RowData])
//  extends WrappedResultSet(new RowDataResultSet(rows.headOption, rows.drop(1)), null, 0)
//  with RavelResultSet {
//
//  // RavelResultSet API
//  override def next(): Boolean = rows.headOption.isDefined
//  override def tail(): RavelResultSet = new RavelResultSetImpl(rows.tail)
//
//}
//
//
