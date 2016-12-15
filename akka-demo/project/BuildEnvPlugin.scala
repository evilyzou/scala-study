import sbt._
import sbt.Keys._
import sbt.plugins.JvmPlugin

object BuildEnvPlugin extends AutoPlugin {
  override def trigger = AllRequirements
  override def requires = JvmPlugin

  object autoImport  {
    object BuildEnv extends Enumeration {
      val Production, Development = Value
    }

    val buildEnv = settingKey[BuildEnv.Value]("the current build environment")
  }

  import autoImport._

  override def projectSettings: Seq[Setting[_]] = Seq(
    buildEnv := {
      scala.sys.props.get("env")
          .orElse(sys.env.get("BUILD_ENV"))
          .flatMap {
            case "prod" => Some(BuildEnv.Production)
            case "dev" => Some(BuildEnv.Development)
            case _ => None
          }
          .getOrElse(BuildEnv.Development)
    },
    onLoadMessage := {
      val defaultMessage = onLoadMessage.value
      val env = buildEnv.value
      s"""
         |$defaultMessage
         |Running in build environment:$env""".stripMargin
    }
  )
}