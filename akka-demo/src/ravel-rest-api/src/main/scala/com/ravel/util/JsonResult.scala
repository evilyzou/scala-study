package com.ravel.util

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import spray.json._

/**
 * Created by CloudZou on 2/14/2017.
 */

object JsonResult {
  object JsonResultKeys {
    val ResultJsonWithPage = List("totalCount", "data")
    val SingleDataJson = List("data")
  }

  case class JsonResultSuccess[A](result: A)

  object JsonResultSuccess {

    implicit def successFormat[A](implicit format: JsonFormat[A]) = new RootJsonFormat[JsonResultSuccess[A]] {

      override def write(value: JsonResultSuccess[A]): JsValue = {
        JsObject("success" -> JsBoolean(true),
          "msg" -> JsString(""),
          "result" -> format.write(value.result))
      }

      override def read(json: JsValue): JsonResultSuccess[A] = {
        deserializationError("not support method")
      }
    }
  }

  case class JsonResultFailure(reason: String)

  object JsonResultFailure {

    implicit object failureFormat extends RootJsonFormat[JsonResultFailure] {

      override def write(value: JsonResultFailure): JsValue = {
        JsObject("success" -> JsBoolean(false), "msg" -> JsString(value.reason), "result" -> JsNull)
      }

      override def read(json: JsValue): JsonResultFailure = {
        deserializationError("not support method")
      }
    }
  }

  type JsonResult[A] = Either[JsonResultFailure, JsonResultSuccess[A]]

  implicit def rootEitherFormat[A : RootJsonFormat, B : RootJsonFormat] = new RootJsonFormat[Either[A, B]] {
    val format = DefaultJsonProtocol.eitherFormat[A, B]

    def write(either: Either[A, B]) = format.write(either)

    def read(value: JsValue) = format.read(value)
  }

  implicit def toHttpEntity(jsVal: JsValue): Unit = {
    HttpEntity(ContentTypes.`application/json`, jsVal.compactPrint.getBytes("UTF-8"))
  }
}