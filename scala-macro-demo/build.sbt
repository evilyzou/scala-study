name := "scala-macro-demo"

version := "1.0"

scalaVersion := "2.11.8"

val commonSettings = Seq(
  scalacOptions ++= Seq("-deprecation", "-feature"),
  libraryDependencies ++= Seq(
    "org.scala-lang" % "scala-reflect" % scalaVersion.value,
    "org.scalamacros" %% "quasiquotes" % "2.1.0"
  ),
  addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full)
)

lazy val scalaStudy = (project in file(".")).aggregate(macros, demos)

lazy val macros = project.in(file("macros")).settings(commonSettings: _*)

lazy val demos = project.in(file("demos")).settings(commonSettings: _ *)
  .settings(
    mainClass in assembly := Some("main.scala.HelloMacros")
  )
  .dependsOn(macros)