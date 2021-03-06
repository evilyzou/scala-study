import sbt._

object Dependencies {
  val akkaVersion = "2.4.14"
  val akkaHttpVersion = "10.0.0"
  val slickVersion = "3.1.1"
  val json4sVersion     = "3.2.11"
  val scalacTestVersion = "3.0.1"

  val akkaDeps = Seq(
    "akka-actor",
    "akka-stream",
    "akka-slf4j"
  ).map("com.typesafe.akka" %% _ % akkaVersion)

  val akkaHttpDeps = Seq(
    "akka-http-core",
    "akka-http",
    "akka-http-testkit",
    "akka-http-spray-json",
    "akka-http-jackson",
    "akka-http-xml"
  ).map("com.typesafe.akka" %% _ % akkaHttpVersion)

  val slickDeps = Seq(
    "slick",
    "slick-hikaricp",
    "slick-codegen"
  ).map("com.typesafe.slick" %% _ % slickVersion)

  val scalikejdbc = Seq(
    "org.scalikejdbc" %% "scalikejdbc"       % "2.5.0",
    "com.github.mauricio" %% "mysql-async"       % "0.2.+"
  )

  val json4sDeps = Seq(
    "json4s-native",
    "json4s-ext"
  ).map("org.json4s" %% _ % json4sVersion)

  val scalaLogging = "com.typesafe.scala-logging" %% "scala-logging" % "3.4.0"

  val mysqlConnector = "mysql" % "mysql-connector-java" % "latest.release"

  val logback = "ch.qos.logback" % "logback-classic" % "1.1.7"

  val deJson4s = "de.heikoseeberger" %% "akka-http-json4s" % "1.4.2"

  val sprayjson = "io.spray" %%  "spray-json" % "1.3.2" withSources()

  val sslConfig = "com.typesafe" %% "ssl-config-core" % "0.2.1"

  val elasticSearch = "org.elasticsearch" % "elasticsearch" % "2.0.0" withSources()

  val scalacTest = Seq(
    "org.scalactic" %% "scalactic" % scalacTestVersion,
    "org.scalatest" %% "scalatest" % scalacTestVersion % "test"
  )

  def commonDeps = akkaDeps ++ akkaHttpDeps ++ scalikejdbc ++ json4sDeps ++
                   Seq(scalaLogging, mysqlConnector, logback, deJson4s, sslConfig, sprayjson, elasticSearch) ++
                   scalacTest
}
