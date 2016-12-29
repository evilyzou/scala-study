package com.ravel.async

import scalikejdbc.WrappedResultSet

/**
 * Created by CloudZou on 12/29/2016.
 */
class RavelResultSetTraversable(var rs: RavelResultSet) extends Traversable[WrappedResultSet] {

  def foreach[U](f: (WrappedResultSet) => U): Unit = while (rs.next()) {
    f.apply(rs)
    rs = rs.tail()
  }

}
