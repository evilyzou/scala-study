package com.ravel.schema

import java.util

import scala.collection.JavaConversions._

/**
 * Created by CloudZou on 12/21/16.
 */
object GuideObject {
  case class GuideView(id: Int, title: String, picture: String, mainCategory: String, subCategory: Seq[Any],
                        systemType: String, customType: String, guideType: String)

  implicit def mapToSearchGuide(sp: Map[String, AnyRef]): GuideView = {
    import ProductObject._
    val scOption = sp.get("subCategory")
    val scValue = scOption match {
      case Some(sc: util.ArrayList[_]) => sc.toIndexedSeq
      case Some(_) => Seq.empty
      case None => Seq.empty
    }

    GuideView(sp.get("id"), sp.get("title"), sp.get("picture"), sp.get("mainCategory"),scValue,
      sp.get("systemType"), sp.get("customType"), sp.get("guideType"))
  }
}
