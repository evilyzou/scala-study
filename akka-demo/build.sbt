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
    scalacOptions := Seq("-unchecked", "-deprecation", "-feature", "-language:postfixOps", "-language:implicitConversions"),
    mainClass in (Compile, run) := Some("com.ravel.Application"),
    logBuffered in Test := false,
    Keys.mainClass in (Compile) := Some("com.ravel.Application")
  )
  .enablePlugins(JavaServerAppPackaging)
//
//
lazy val akkaStreamStudy = project.in(file("src/ravel-akka-stream")).settings(commonSettings: _*)
  .settings(filterSettings: _*)
  .settings(
    scalacOptions := Seq("-unchecked", "-deprecation", "-feature", "-language:postfixOps", "-language:implicitConversions"),
    mainClass in (Compile, run) := Some("com.ravel.akka.stream.Application"),
    logBuffered in Test := false
  )
  .enablePlugins(JavaServerAppPackaging)