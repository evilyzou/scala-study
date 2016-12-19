import sbt.Keys._
import Dependencies._

name := "ravel-rest-api"

version := "1.0"

val commonSettings = Seq(
  scalaVersion := "2.11.8",
  libraryDependencies ++= commonDeps
)

onLoad in Global := (onLoad in Global).value andThen (Command.process("project ravelRestApi", _))

lazy val ravelRestApi = project.in(file("src/ravel-rest-api")).settings(commonSettings: _*)
  .settings(filterSettings: _*)
  .settings(
    mainClass in (Compile, run) := Some("com.ravel.Application")
  )
  .enablePlugins(JavaServerAppPackaging)
