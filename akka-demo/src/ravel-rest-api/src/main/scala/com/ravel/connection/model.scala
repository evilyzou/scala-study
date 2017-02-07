package com.ravel

/**
 * Created by CloudZou on 2/7/2017.
 */
package object model {

  case class ConnectionIsActive()
  case class QueryStatement(statement: String)
  case class QueryStatementWithParameters(statement: String, parameters: Any*)
  case class ConnectionClose()
}
