import scala.reflect.macros.Context
import scala.language.experimental.macros
/**
 * Created by CloudZou on 12/2/2016.
 */

trait CaseClassMapConverter[C] {
  def toMap(c: C): Map[String, Any]
  def fromMap(m: Map[String, Any]): C
}
object CaseClassConverter {
  implicit def Materializer[C]: CaseClassMapConverter[C] = macro converterMacro[C]
  def converterMacro[C: c.WeakTypeTag](c: Context): c.Expr[CaseClassMapConverter[C]] = {
    import c.universe._

    val tpe = weakTypeOf[C]
    val fields = tpe.declarations.collectFirst{
      case m: MethodSymbol if m.isPrimaryConstructor => m
    }.get.paramss.head

    val companion = tpe.typeSymbol.companionSymbol
    val (toParams, fromParams) = fields.map {
      field =>
        val name = field.name.toTermName
        val decoded = name.decodedName.toString
        val rtype = tpe.declaration(name).typeSignature

        (q"$decoded -> t.$name", q"map($decoded).asInstanceOf[$rtype]")
    }.unzip

    c.Expr[CaseClassMapConverter[C]] (q"""
        new CaseClassMapConverter[$tpe] {
          def toMap(t: $tpe): Map[String, Any] = Map(..$toParams)
          def fromMap(map: Map[String, Any]): $tpe = $companion(..$fromParams)
        }
      """)
  }
}
