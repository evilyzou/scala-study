package com.ravel.model

import java.util

import com.ravel.util.MapConvert
import org.joda.time.LocalDateTime
import scala.collection.JavaConversions._

/**
 * Created by CloudZou on 1/4/17.
 */
object RavelObject {

  implicit def OptionAnyRefToInt(option: Option[Any]):Int = convert(option, 0)
  implicit def OptionAnyRefToString(option: Option[Any]):String = convert(option, "")
  implicit def OptionAnyRefToDouble(option: Option[Any]): Double = convert(option, 0L)

  private[this] def convert[T](option: Option[Any], defaultValue: T): T = {
    option match {
      case Some(x) => {
        x match {
          case i: T => x.asInstanceOf[T]
          case _  => defaultValue
        }
      }
      case None => defaultValue
    }
  }

  case class SearchProductView(id: Int, title: String, systemType: String, customType: String,
                               marketPrice: Double, depature: String, time: String,
                               day: Int, pfunction: String, productFeatures: String, night: Int,
                               images: String, advanceDay: Int, arrive: String, onlineStatus: Int)
  object SearchProductView {
    implicit val searchProductView = new MapConvert[SearchProductView] {
      def conv(sp: Map[String, AnyRef]) = {
        SearchProductView(sp.get("id"), sp.get("title"), sp.get("systemType"), sp.get("customType"), sp.get("marketPrice"), sp.get("depature"),
          sp.get("time"),sp.get("day"), sp.get("pfunction"), sp.get("productFeatures"), sp.get("night"), sp.get("images"),
          sp.get("advanceDay"), sp.get("arrive"), sp.get("onlineStatus"))
      }
    }
  }

  case class SearchGuideView(id: Int, title: String, picture: String, mainCategory: String, subCategory: Seq[Any],
                       systemType: String, customType: String, guideType: String)

  object SearchGuideView {
    implicit val searchGuideView = new MapConvert[SearchGuideView] {
      def conv(sp: Map[String, AnyRef]) = {
        val scOption = sp.get("subCategory")
        val scValue = scOption match {
          case Some(sc: util.ArrayList[_]) => sc.toIndexedSeq
          case Some(_) => Seq.empty
          case None => Seq.empty
        }

        SearchGuideView(sp.get("id"), sp.get("title"), sp.get("picture"), sp.get("mainCategory"),scValue,
          sp.get("systemType"), sp.get("customType"), sp.get("guideType"))
      }
    }
  }


  case class ProductView(productParams: List[Map[String, Any]], product: Map[String, Any], productExt: Map[String, Any], productOther: Map[String, Any], productPrices: Seq[Map[String, Any]])

  object ProductView {
    def apply(product: Map[String, Any], productExt: Map[String, Any], productOther: Map[String, Any], productPrices: Seq[Map[String, Any]]) = {
      val productParams = List(Map("name"->"????", "content"->product.getOrElse("teamNo", "")))
      val prices = productPrices map {p => p.get("marketPrice") match {
        case Some(x: BigDecimal) => x.toInt
        case _ => Int.MaxValue
      }}
      val pricesByDate = productPrices map {p =>
        Map(
          "takeOffDate"-> p.get("takeOffDate").get.asInstanceOf[LocalDateTime],
          "marketPrice" -> p.get("marketPrice").get.asInstanceOf[BigDecimal],
          "availableCount" -> p.get("availableCount").get.asInstanceOf[Int]
        )
      }

      val price = prices.foldLeft(prices(0), prices(0)) {
        case ((min, max), e) => (math.min(min, e), math.max(max, e))
      }
      val productWithMinPrice = product + ("price"-> price._1)
      new ProductView(productParams, productWithMinPrice, productExt, productOther,  pricesByDate )
    }
  }

  case class ProductHotel(infraId: String, infraName: String, bookDay: String, roomName: String, bedType: String, roomType: String)

  case class Infra(typ: String, title: String, city: String, address: String, phone: String, feature: InfraFeature, desc: Seq[InfraDesc])
  object Infra {
    def empty = {
      new Infra("","", "", "","", InfraFeature(None, None), Seq.empty)
    }
  }
  case class InfraFeature(content: Option[String], pictureUrl: Option[String])
  case class InfraDesc(content: Option[Any], pictureUrl: Option[Any])

  case class GuideInfra(guideInfraType: String, infra: Infra)
  case class GuideView(guide: Map[String, Any],  guideInfra: Seq[GuideInfra])
}
