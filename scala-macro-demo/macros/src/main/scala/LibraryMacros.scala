package main.scala

import java.util.Date

import scala.language.experimental.macros
import scala.reflect.macros.Context

/**
 * Created by CloudZou on 12/2/2016.
 */

object LibraryMacros {
  def greeting(person: String): Unit = macro greetingMacro

  def greetingMacro(c: Context)(person: c.Expr[String]): c.Expr[Unit] = {
    import c.universe._

    println("compiling greeting...")
    val now = reify { new Date().toString}
    reify {
      println("Hello " + person.splice + ", the time is:" + new Date().toString)
    }
  }

//  def tell(person: String): Unit = macro MacrosImpls.tellMacro

  class MacrosImpls(val c: Context) {
    import c.universe._

    def tellMacro(person: c.Tree) : c.Tree = {
      println("compiling tell ...")
      val now = new Date().toString
      q"""
      println("Hello " + $person+", it is: "+$now)
      """
    }
  }
}



