package com.ravel.resources

import java.sql.Timestamp
import java.text.SimpleDateFormat

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.ravel.model.RavelObject._
import com.ravel.model.RavelObject._
import org.joda.time.LocalDateTime
import scala.collection.immutable.Map

import java.util.Date

import spray.json._

/**
 * Created by CloudZou on 12/11/16.
 */
object RavelJsonSupport extends  DefaultJsonProtocol with SprayJsonSupport with ProductFormatsExtensionInstances with NullOptions{

  implicit object TimestampFormat extends JsonFormat[Timestamp] {
    def write(obj: Timestamp) = obj match{
      case _ => JsString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(obj))
    }

    def read(json: JsValue) = json match {
      case JsNumber(time) => new Timestamp(time.toLong)
      case _ => throw new DeserializationException("Date expected")
    }
  }
  implicit object DateFormat extends JsonFormat[Date] {
    def write(obj: Date) = obj match {
      case _ => JsString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(obj))
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
      case d: BigDecimal => JsNumber(d)
      case s: String => JsString(s)
      case t: LocalDateTime => JsString(t.toString)
      case b: Boolean => {
        if(b == true)
          JsTrue
        else
          JsFalse
      }
      case x: Seq[_] => seqFormat[Any].write(x)
      case m: Map[String, _]@unchecked => mapFormat[String, Any].write(m)
      case spv: SearchProductView => searchProductFormat.write(spv)
      case sgv: SearchGuideView => searchGuideViewFormat.write(sgv)
      case guideView: GuideView => guideViewFormat.write(guideView)
      case _ => JsNull
    }
    def read(value: JsValue) = value match {
      case _ =>
    }
  }

  implicit val searchProductFormat = jsonFormat15(SearchProductView.apply)
  implicit val searchGuideViewFormat = jsonFormat8(SearchGuideView.apply)
  implicit val productFormat = jsonFormat5(ProductView.apply)
  implicit val infraFeatureFormat = jsonFormat2(InfraFeature)
  implicit val infraDescFormat = jsonFormat2(InfraDesc)
  implicit val infraFormat = jsonFormat7(Infra.apply)
  implicit val productHotelFormat = jsonFormat6(ProductHotel.apply)
  implicit val guideInfraFormat = jsonFormat2(GuideInfra.apply)
  implicit val guideViewFormat = jsonFormat2(GuideView.apply)


}
