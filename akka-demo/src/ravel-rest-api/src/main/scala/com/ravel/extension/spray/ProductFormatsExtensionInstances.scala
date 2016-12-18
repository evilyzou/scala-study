//package com.ravel.extension.spray

package spray.json

/**
 * Created by CloudZou on 12/11/16.
 */
trait ProductFormatsExtensionInstances {
  self: ProductFormats with StandardFormats =>


  // Case classes with 5 parameters

  def jsonFormatExtension5[P1 :JF, P2 :JF, P3 :JF, P4 :JF, P5 :JF, T <: Product :ClassManifest](construct: (P1, P2, P3, P4, P5) => T): RootJsonFormat[T] = {
    val Array(p1, p2, p3, p4, p5) = extractFieldNames(classManifest[T])
    jsonFormatExtension(construct, p1, p2, p3, p4, p5)
  }
  def jsonFormatExtension[P1 :JF, P2 :JF, P3 :JF, P4 :JF, P5 :JF, T <: Product](construct: (P1, P2, P3, P4, P5) => T, fieldName1: String, fieldName2: String, fieldName3: String, fieldName4: String, fieldName5: String): RootJsonFormat[T] = new RootJsonFormat[T]{
    def write(p: T) = {
      val fields = new collection.mutable.ListBuffer[(String, JsValue)]
      fields.sizeHint(5 * 6)
      fields ++= productElement2Field[P1](fieldName1, p, 0)

      val productInfo1 = productElement2Field[P2](fieldName2, p, 1).head._2.asInstanceOf[JsObject]
      for((key, value) <- productInfo1.fields) {
        fields ++= (key, value):: Nil
      }

      val productInfo2 = productElement2Field[P3](fieldName3, p, 2).head._2.asInstanceOf[JsObject]
      for((key, value) <- productInfo2.fields) {
        fields ++= (key, value):: Nil
      }

      val productInfo3 = productElement2Field[P4](fieldName4, p, 3).head._2.asInstanceOf[JsObject]
      for((key, value) <- productInfo3.fields) {
        fields ++= (key, value):: Nil
      }

      val productInfo4 = productElement2Field[P5](fieldName5, p, 4).head._2.asInstanceOf[JsObject]
      for((key, value) <- productInfo4.fields) {
        fields ++= (key, value):: Nil
      }
      JsObject(fields: _*)
    }
    def read(value: JsValue) = {
      val p1V = fromField[P1](value, fieldName1)
      val p2V = fromField[P2](value, fieldName2)
      val p3V = fromField[P3](value, fieldName3)
      val p4V = fromField[P4](value, fieldName4)
      val p5V = fromField[P5](value, fieldName5)
      construct(p1V, p2V, p3V, p4V, p5V)
    }
  }



}
