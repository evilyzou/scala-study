/**
 * Created by CloudZou on 12/2/2016.
 */
import CaseClassConverter._

object ConvertDemo  extends App{

  def ccToMap[C: CaseClassMapConverter](c: C): Map[String, Any] =
   implicitly[CaseClassMapConverter[C]].toMap(c)

  case class Person(name: String, age: Int)
  case class Car(make: String, year: Int, manu: String)

  val civic = Car("civic", 2016, "Honda")
  def mapTocc[C: CaseClassMapConverter](m: Map[String, Any]) =
   implicitly[CaseClassMapConverter[C]].fromMap(m)

  val mapJohn = ccToMap[Person](Person("john", 16))

  println(mapJohn)
  val mapCivic = ccToMap[Car](civic)
  println(mapTocc[Person](mapJohn))
  println(mapTocc[Car](mapCivic))
}
