import NativePackagerHelper._
import com.typesafe.sbt.packager.archetypes.JavaAppPackaging.autoImport._
import BuildEnvPlugin.autoImport._
import sbt.Keys._

name := "akka-demo"

version := "1.0"

val commonSettings = Seq(
  scalaVersion := "2.11.8",
  libraryDependencies ++= {
    val akkaVersion = "2.4.14"
    val akkaHttpVersion = "10.0.0"
    val slickVersion = "3.1.1"
    val Json4sVersion     = "3.2.11"
    val elastic4sVersion = "2.0.1"
    Seq(
      "com.typesafe.akka" %% "akka-actor" % akkaVersion,
      "com.typesafe.akka" %% "akka-stream" % akkaVersion,
      "com.typesafe.akka" %% "akka-http-core" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-jackson" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-xml" % akkaHttpVersion,
      "com.typesafe.slick" %% "slick" % slickVersion,
      "com.typesafe.slick" %% "slick-hikaricp" % slickVersion,
      "com.typesafe.slick" %% "slick-codegen" % slickVersion,
      "com.typesafe.scala-logging" %% "scala-logging" % "3.4.0",
      "mysql" % "mysql-connector-java" % "latest.release",
      "com.typesafe.akka" %% "akka-slf4j" % akkaVersion,
      "ch.qos.logback" % "logback-classic" % "1.1.7",
      "org.json4s"        %% "json4s-native"   % Json4sVersion,
      "org.json4s"        %% "json4s-ext"      % Json4sVersion,
      "de.heikoseeberger" %% "akka-http-json4s" % "1.4.2",
      "io.spray" %%  "spray-json" % "1.3.2",
      "com.sksamuel.elastic4s" %% "elastic4s-streams" % elastic4sVersion
    )
  }
)

lazy val logback = "ch.qos.logback" % "logback-classic" % "1.0.9"

lazy val akkaDemo = (project in file(".")).aggregate(akkaDemoApp)

lazy val akkaDemoApp = project.in(file("src/akka-demo-app")).settings(commonSettings: _*)
  .settings(
  fork in run := true,
  javaOptions += {
    val devConf = "-Dconfig.resource=dev/application.conf"
    val prodConf = "-Dconfig.file=C:/config/application.conf"
    buildEnv.value match {
      case BuildEnv.Production => prodConf
      case BuildEnv.Development => devConf
      case _ => devConf
    }
  },
  mainClass in Compile := Some("com.ravel.Application"),
  resourceDirectory in Compile := (resourceDirectory in Compile).value,
  excludeFilter in unmanagedResources := "*.conf" || "*.xml",
  mappings in Universal ++= {
    val confFile = buildEnv.value match {
      case BuildEnv.Production => "prod"
      case BuildEnv.Development => "dev"
      case _ => "dev"
    }
    directory("scripts") ++ contentOf((resourceDirectory in Compile).value / confFile).toMap.mapValues("config/" + _)
  })
  .enablePlugins(JavaServerAppPackaging)
  .enablePlugins(BuildEnvPlugin)


