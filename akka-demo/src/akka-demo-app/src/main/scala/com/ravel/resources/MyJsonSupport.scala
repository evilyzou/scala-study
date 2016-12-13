package com.ravel.resources

import java.sql.Timestamp
import java.text.SimpleDateFormat

//import com.ravel.extension.spray.ProductFormatsExtensionInstances
import com.ravel.schema.Tables._
import spray.json._

/**
 * Created by CloudZou on 12/11/16.
 */
case class Person(name: String, age: Int)


object MyJsonSupport extends  DefaultJsonProtocol with ProductFormatsExtensionInstances with NullOptions{

  implicit object TimestampFormat extends JsonFormat[Timestamp] {
    def write(obj: Timestamp) = obj match{
      case t => JsString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(obj))
      case _ => JsString("1970-01-01")
    }

    def read(json: JsValue) = json match {
      case JsNumber(time) => new Timestamp(time.toLong)

      case _ => throw new DeserializationException("Date expected")
    }
  }

  implicit val productInfo1Format = jsonFormat13(ProductInfo1)
  implicit val productInfo2Format = jsonFormat15(ProductInfo2)
  implicit val productInfo3Format = jsonFormat12(ProductInfo3)
  implicit val productInfo4Format = jsonFormat10(ProductInfo4)
  implicit val productFormat = jsonFormatExtension5(ProductRow)
  implicit val personFormat = jsonFormat2(Person)

}