package com.ravel.serializers

import java.sql.Timestamp

import org.json4s.CustomSerializer
import org.json4s.JsonAST.{JNull, JInt}

/**
 * Created by CloudZou on 12/9/2016.
 */
object CustomerSerializers {
  val all = List(CustomTimerstampSerializer)

}

case object CustomTimerstampSerializer extends CustomSerializer[Timestamp]( format =>
  ({
    case JInt(x) => new Timestamp(x.longValue * 1000)
    case JNull => null
  },
  {
    case date: Timestamp => JInt(date.getTime / 1000)
  })
)
