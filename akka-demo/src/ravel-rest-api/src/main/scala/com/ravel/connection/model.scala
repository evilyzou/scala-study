package com.ravel

/**
 * Created by CloudZou on 2/7/2017.
 */
package object model {

  case class ConnectionIsActive()
  case class QueryStatement(statement: String, index: Int = 0)
  case class QueryStatementWithParameters(statement: String, parameters: Any*)
  case class ConnectionClose()
  case class CheckConnectionIdle()
}
