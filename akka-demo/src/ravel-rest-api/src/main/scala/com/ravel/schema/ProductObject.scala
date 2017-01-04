package com.ravel.schema

/**
 * Created by CloudZou on 12/18/16.
 */
object ProductObject {

  abstract class BaseView {val data: Any}

  implicit def mapToSearchProduct(sp: Map[String, AnyRef]): SearchProductView = {
    SearchProductView(sp.get("id"), sp.get("title"), sp.get("systemType"), sp.get("customType"), sp.get("marketPrice"), sp.get("depature"),
                  sp.get("time"),sp.get("day"), sp.get("pfunction"), sp.get("productFeatures"), sp.get("night"), sp.get("images"),
                  sp.get("advanceDay"), sp.get("arrive"), sp.get("onlineStatus"))
  }

  case class SearchProductView(id: Int, title: String, systemType: String, customType: String,
                            marketPrice: Double, depature: String, time: String,
                            day: Int, pfunction: String, productFeatures: String, night: Int,
                            images: String, advanceDay: Int, arrive: String, onlineStatus: Int)


  implicit def OptionAnyRefToInt(option: Option[AnyRef]):Int = convert(option, 0)
  implicit def OptionAnyRefToString(option: Option[AnyRef]):String = convert(option, "")
  implicit def OptionAnyRefToDouble(option: Option[AnyRef]): Double = convert(option, 0L)

  private[this] def convert[T](option: Option[AnyRef], defaultValue: T): T = {
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

  case class ProductView(productParams: List[Map[String, Any]], product: Map[String, Any], productExt: Map[String, Any], productOther: Map[String, Any], productPrices: Seq[Map[String, Any]])

  object ProductView {
    def apply(product: Map[String, Any], productExt: Map[String, Any], productOther: Map[String, Any], productPrices: Seq[Map[String, Any]]) = {
      val productParams = List(Map("name"->"????", "content"->product.getOrElse("teamNo", "")))
      val productWithMinPrice = product + ("price"-> 8800)
      new ProductView(productParams, productWithMinPrice, productExt, productOther,  productPrices )
    }

    def buildProductHotel(hotelInfo: String) {
      import spray.json._
      import ProductObject._


      if (hotelInfo != "") {
        val hotelAst = hotelInfo.parseJson
        val hotelMap = hotelAst.asJsObject.fields
        ProductHotel(hotelMap.get("infraId"), hotelMap.get("infraName"), hotelMap.get("bookDay"), hotelMap.get("roomName"), hotelMap.get("bedType"),
                    hotelMap.get("roomType"), Seq.empty)
      }
    }
  }

  case class ProductHotel(infraId: Int, infraName: String, bookDay: Int, roomName: String, bedType: String, roomType: Int)

  case class Infra(typ: String, title: String, city: String, address: String, phone: String, feature: InfraFeature, desc: Seq[InfraDesc])
  case class InfraFeature(content: String, pictureId: String, pictureUrl: String)
  case class InfraDesc(content: String, pictureUrl: String)
}
