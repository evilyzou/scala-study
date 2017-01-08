package com.ravel.message

import com.ravel.resources.GuideSearchFilter

/**
 * Created by CloudZou on 1/8/17.
 */
object MessageObject {
  object ProductMessageObject {
    case class ProductList()
    case class ProductDetail()
  }

  object GuideMessageObject {
    case class GuideList(filter: GuideSearchFilter)
    case class GuideDetail()
  }
}
