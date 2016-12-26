package com.ravel.schema

import com.ravel.schema.DBSchema._


/**
 * Created by CloudZou on 12/18/16.
 */
object ProductObject {

  implicit def mapToSearchProduct(sp: Map[String, AnyRef]): SearchProductView = {
    SearchProductView(sp.get("id"), sp.get("title"), sp.get("systemType"), sp.get("customType"), sp.get("marketPrice"), sp.get("depature"),
                  sp.get("dumpTime"),sp.get("day"), sp.get("pfunction"), sp.get("productFeatures"), sp.get("night"), sp.get("images"),
                  sp.get("advanceDay"), sp.get("arrive"), sp.get("onlineStatus"))
  }

  case class SearchProductView(id: Int, title: String, systemType: Int, customType: Int,
                            marketPrice: Double, depature: String, dumpTime: String,
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
        }
      }
      case None => defaultValue
    }
  }

  case class ProductView(product: Option[ProductRow], productExt: Option[ProductExtRow], productOther: Option[ProductOtherRow], productPrices: Seq[ProductPriceByTeamRow])

}
