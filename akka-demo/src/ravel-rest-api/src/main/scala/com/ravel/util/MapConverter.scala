package com.ravel.util

import scala.collection.immutable.Map
/**
 * Created by CloudZou on 1/4/17.
 */
object MapConverterImplicits {
  implicit class Map2Class(values: Map[String, AnyRef]) {
    def convert[A](implicit mapper: MapConvert[A]) = mapper conv values
  }
}

trait MapConvert[A] {
  def conv(values: Map[String, AnyRef]): A
}

