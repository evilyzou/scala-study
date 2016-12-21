package com.ravel.schema


/**
 * Created by CloudZou on 12/21/16.
 */
object GuideObject {
  case class GuideView(id: Int, title: String, picture: String, mainCategory: String, subCategory: String,
                        systemType: String, customType: String, guideType: String)

  implicit def mapToSearchGuide(sp: Map[String, AnyRef]): GuideView = {
    import ProductObject._

    GuideView(sp.get("id"), sp.get("title"), sp.get("picture"), sp.get("mainCategory"), sp.get("subCategory"),
      sp.get("systemType"), sp.get("customType"), sp.get("guideType"))
  }
}
