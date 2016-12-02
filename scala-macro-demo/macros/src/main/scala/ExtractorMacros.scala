import scala.reflect.macros.Context
import scala.language.experimental.macros
/**
 * Created by CloudZou on 12/2/2016.
 */


trait User  {
  val fname: String
  val lname: String
}

class FreeUser(val fname: String, val lname: String) extends  User {
  val i = 10
  def f = 1 + 2
}

class PremiumUser(val name: String, val gender: Char, val vipnum: String)

object ExtractorMacros {
  implicit class UserInterpolate(sc: StringContext) {
    object usr {
      def apply(args: String*): Any = macro UserMacros.appl
      def unapply(u: User): Any = macro UserMacros.uapl
    }
  }
}

object UserMacros {
  def appl(c: Context)(args: c.Expr[String]*) = {
    import c.universe._
    val argList = args.toList.map {
      p =>p.splice
    }
    c.Expr[Any](q"new FreeUser(..$argList)")
  }
  def uapl(c: Context)(u: c.Tree) = {
    import c.universe._
    val params = u.tpe.members.collectFirst {
      case m: MethodSymbol if m.isPrimaryConstructor => m.asMethod
    }.get.paramss.head.map {p => p.asTerm.name.toString}


    val (qget, qdef) = params.length match {
      case len if len == 0 =>
        (List(q""), List(q""))
      case len if len == 1 =>
        val pn = params.head
        (List(q"def get = u.$pn"), List(q""))
      case _ =>
        val defs = List(q"def _1 = x", q"def _2 = x", q"def _3=x", q"def _4 =x")
        val qdefs = (params zip defs).collect  {
          case (p,d) =>
            val q"def $mname = $mbody" = d
            val pn = p
            q"def $mname = u.$pn"
        }
        (List(q"def get = this", qdefs))
    }

    c.Expr[Any](q"""
        new {
          class Matcher(u: User) {
            def isEmpty = false
            ..$qget
            ..$qdef
          }
          def unapply(u: User) = new Matcher(u)
        }.unapply($u
      """)
  }
}
