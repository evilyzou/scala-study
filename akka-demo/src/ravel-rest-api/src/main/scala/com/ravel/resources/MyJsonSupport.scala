package com.ravel.resources

import java.sql.Timestamp
import java.text.SimpleDateFormat

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.ravel.schema.GuideObject.GuideView
import com.ravel.schema.ProductObject
import com.ravel.schema.ProductObject._
import org.joda.time.LocalDateTime
import scala.collection.immutable.Map
import scala.collection.mutable.ArrayBuffer

//import com.ravel.extension.spray.ProductFormatsExtensionInstances
import java.util.Date

import spray.json._

/**
 * Created by CloudZou on 12/11/16.
 */
object MyJsonSupport extends  DefaultJsonProtocol with SprayJsonSupport with ProductFormatsExtensionInstances with NullOptions{

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
  implicit object DateFormat extends JsonFormat[Date] {
    def write(obj: Date) = obj match {
      case t => JsString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(obj))
      case _ => JsString("1970-01-01")
    }
    def read(json: JsValue) = json match {
      case JsNumber(time) => new Date(1970,1,1)
      case _ => throw new DeserializationException("Date expected")
    }
  }

  implicit object AnyJsonFormat extends JsonFormat[Any] {
    def write(x: Any) = x match {
      case n: Int => JsNumber(n)
      case n: Long => JsNumber(n)
      case s: String => JsString(s)
      case t: LocalDateTime => JsString(t.toString)
      case b: Boolean => {
        if(b == true)
          JsTrue
        else
          JsFalse
      }
      case x: Seq[_] => seqFormat[Any].write(x)
      case m: Map[String, _] => mapFormat[String, Any].write(m)
      case spv: SearchProductView => searchProductFormat.write(spv)
      case pv: ProductView => productFormat.write(pv)
      case gvf: GuideView => guideViewFormat.write(gvf)
      case _ => JsNull
      case x => serializationError("Do not understand object of type " + x.getClass.getName)
    }
    def read(value: JsValue) = value match {
      case JsNumber(n) => n.intValue()
      case JsString(s) => s
      case JsTrue => true
      case JsFalse => false
    }
  }

  implicit val searchProductFormat = jsonFormat15(SearchProductView)

  implicit val guideViewFormat = jsonFormat8(GuideView)

  implicit val productFormat = jsonFormat5(ProductView.apply)

}
