import scala.reflect.macros.Context

import scala.language.experimental.macros
/**
 * Created by CloudZou on 12/3/16.
 */
//object Macro {
//  def apply(x: Int): Int = macro impl
//  def impl(c: Context)(x: c.Tree) = {
//    import c.universe._
//    q"$x + 1"
//  }
//}

object Macro2 {
  def apply(x: Int): Int = macro impl
  def impl(c: Context)(x: c.Expr[Int]): c.Expr[Int] = { import c.universe._
    c.Expr(q"$x + 1")
  }
}