name := "akka-demo"

version := "1.0"

val commonSettings = Seq(
  scalaVersion := "2.11.8",
  libraryDependencies ++= {
    val akkaVersion = "2.4.14"
    val akkaHttpVersion = "10.0.0"
    val slickVersion = "3.1.1"
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
      "com.typesafe.slick" %% "slick-codegen" % slickVersion,
      "org.slf4j" % "slf4j-nop" % "1.7.19" ,
      "mysql" % "mysql-connector-java" % "latest.release",
      "com.typesafe.akka" %% "akka-slf4j" % akkaVersion,
      ("ch.qos.logback" % "logback-classic" % "1.0.9" % "provided").exclude("org.slf4j", "slf4j-nop")
    )
  }
)


lazy val akkaDemo = (project in file(".")).aggregate(akkaDemoApp)

lazy val akkaDemoApp = project.in(file("src/akka-demo-app")).settings(commonSettings: _*)
  .settings(
    mainClass in assembly := Some("app.WebServer")
  )
//  .dependsOn(macros)

