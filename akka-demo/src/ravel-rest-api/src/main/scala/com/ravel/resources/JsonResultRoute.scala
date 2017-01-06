package com.ravel.resources

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import spray.json._

/**
 * Created by CloudZou on 12/31/16.
 */

object JsonResultRoute {
  object JsonResultKeys {
    val ResultJsonWithPage = List("totalCount", "data")
    val SingleDataJson = List("data")
  }

  case class Success[A](result: A)

  object Success {

    implicit def successFormat[A](implicit format: JsonFormat[A]) = new RootJsonFormat[Success[A]] {

      override def write(value: Success[A]): JsValue = {
        JsObject("success" -> JsBoolean(true),
                 "msg" -> JsString(""),
                 "result" -> format.write(value.result))
      }

      override def read(json: JsValue): Success[A] = {
        deserializationError("not support method")
      }
    }
  }

  case class Failure(reason: String)

  object Failure {

    implicit object failureFormat extends RootJsonFormat[Failure] {

      override def write(value: Failure): JsValue = {
        JsObject("success" -> JsBoolean(false), "msg" -> JsString(value.reason), "result" -> JsNull)
      }

      override def read(json: JsValue): Failure = {
        deserializationError("not support method")
      }
    }
  }

  type Result[A] = Either[Failure, Success[A]]

  implicit def rootEitherFormat[A : RootJsonFormat, B : RootJsonFormat] = new RootJsonFormat[Either[A, B]] {
    val format = DefaultJsonProtocol.eitherFormat[A, B]

    def write(either: Either[A, B]) = format.write(either)

    def read(value: JsValue) = format.read(value)
  }


  def toStandardRoute(result: Result[Map[String, Any]]) = {
    import RavelJsonSupport._
    import spray.json._

    HttpEntity(ContentTypes.`application/json`, result.toJson.compactPrint.getBytes("UTF-8"))
  }
}