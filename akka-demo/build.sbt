import sbt.Keys._
import Dependencies._

name := "ravel-rest-api"

version := "1.0"

val commonSettings = Seq(
  scalaVersion := "2.11.8",
  libraryDependencies ++= commonDeps
)

lazy val ravelRestApi = project.in(file("src/ravel-rest-api")).settings(commonSettings: _*)
  .settings(filterSettings: _*)
  .settings(
    mainClass in Compile := Some("com.ravel.Application")
  )
  .enablePlugins(JavaServerAppPackaging)
