name := "akka-demo"

version := "1.0"

val commonSettings = Seq(
  scalaVersion := "2.11.8",
  libraryDependencies ++= {
    val akkaVersion = "2.4.14"
    val akkaHttpVersion = "10.0.0"
    val slickVersion = "3.1.1"
    val Json4sVersion     = "3.2.11"
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
      "io.spray" %%  "spray-json" % "1.3.2"
    )
  }
)

lazy val logback = "ch.qos.logback" % "logback-classic" % "1.0.9"

lazy val akkaDemo = (project in file(".")).aggregate(akkaDemoApp)

lazy val akkaDemoApp = project.in(file("src/akka-demo-app")).settings(commonSettings: _*)
  .settings(
    mainClass in assembly := Some("app.WebServer")
  )
//  .dependsOn(macros)

