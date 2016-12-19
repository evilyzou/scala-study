package com.ravel.schema

import java.util.Date

/**
 * Created by CloudZou on 12/18/16.
 */
object ProductObject {
  import SearchProduct._

  implicit def mapToSearchProduct(sp: Map[String, AnyRef]): SearchProductView = {
    SearchProductView(sp.get("id"), sp.get("title"), sp.get("systemType"), sp.get("customType"), sp.get("marketPrice"), sp.get("depature"),
                  sp.get("dumpTime"),sp.get("day"), sp.get("pfunction"), sp.get("productFeatures"), sp.get("night"), sp.get("images"),
                  sp.get("advanceDay"), sp.get("arrive"), sp.get("onlineStatus"))
  }

  case class SearchProductView(id: Int, title: String, systemType: String, customType: String,
                            marketPrice: Long, depature: String, dumpTime: Date,
                            day: Int, pfunction: String, productFeatures: String, night: Int,
                            images: String, advanceDay: Int, arrive: String, onlineStatus: Int)
  object SearchProduct{
    def apply(id: Option[AnyRef], title: Option[AnyRef], systemType: Option[AnyRef], customType: Option[AnyRef],
              marketPrice: Option[AnyRef], depature: Option[AnyRef], dumpTime: Option[AnyRef],
              day: Option[AnyRef], pfunction: Option[AnyRef], productFeatures: Option[AnyRef], night: Option[AnyRef],
              images: Option[AnyRef], advanceDay: Option[AnyRef], arrive: Option[String], onlineStatus: Option[AnyRef]) = {
      innerApply(id, title, systemType, customType, marketPrice, depature, dumpTime,
             day, pfunction, productFeatures, night, images, advanceDay, arrive, onlineStatus)
    }

    private[this] def innerApply(id: Int, title: String, systemType: String, customType: String,
              marketPrice: Long, depature: String, dumpTime: Date,
              day: Int, pfunction: String, productFeatures: String, night: Int,
              images: String, advanceDay: Int, arrive: String, onlineStatus: Int) = {
      new SearchProductView(id, title, systemType, customType, marketPrice, depature, dumpTime,
                        day, pfunction, productFeatures, night, images, advanceDay, arrive, onlineStatus)
    }

    implicit def OptionAnyRefToInt(option: Option[AnyRef]):Int = convert(option, 0)
    implicit def OptionAnyRefToString(option: Option[AnyRef]):String = convert(option, "")
    implicit def OptionAnyRefToLong(option: Option[AnyRef]): Long = convert(option, 0L)
    implicit def OptionAnyRefToDate(option: Option[AnyRef]):Date = convert(option, new Date(1970,1,1))

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
  }

}
