import sbt.Keys._

name := "ravel-rest-api"

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

lazy val ravelRestApi = project.in(file("src/ravel-rest-api")).settings(commonSettings: _*)
  .settings(filterSettings: _*)
  .settings(
    mainClass in Compile := Some("com.ravel.Application")
  )
  .enablePlugins(JavaServerAppPackaging)
