import java.io.File
import java.io._
import java.nio.charset.{StandardCharsets, Charset}
import java.util.Properties
import sbt.FileFilter
import sbt._
import Keys._
import collection.JavaConversions._
import Defaults._

import sbt.{TaskKey, Def}

object FilterPropertiesPlugin extends sbt.Plugin {
  import FilterKeys._
  import FileFilter.globFilter

  object FilterKeys {
    val filterDirectoryName = Def.settingKey[String]("Default filter directory name.")
    val filterDirectory = Def.settingKey[File]("Default filter directory, used for filters.")
    val filters = Def.taskKey[Seq[File]]("All filters")
    val extraProps = Def.settingKey[Seq[(String, String)]]("Extra filter properties")
    val projectProps = Def.taskKey[Seq[(String, String)]]("Project filter properties")
    val systemProps = Def.taskKey[Seq[(String, String)]]("System filter properties")
    val envProps = Def.taskKey[Seq[(String, String)]]("Environment filter properties")
    val managedProps = Def.taskKey[Seq[(String, String)]]("Managed filter properties")
    val unmanagedProps = Def.taskKey[Seq[(String, String)]]("Filter properties defined in filters.")
    val props = Def.taskKey[Seq[(String, String)]]("All filter properties")
    val filterResources = Def.taskKey[Seq[(File, File)]]("Filters all resources")
  }

  lazy val filterResourceTask = filterResources <<= filter(copyResources, filterResources) triggeredBy copyResources

  def filter(resources: TaskKey[Seq[(File,File)]], task: TaskKey[Seq[(File, File)]]) = {
    (streams, resources in task, includeFilter in task, excludeFilter in task, props) map {
      (streams, resources: Seq[(File, File)], incl, excl, filterProps) =>
        println("filter starting......")
        val props = Map.empty[String, String] ++ filterProps
        val filtered = resources filter (r => incl.accept(r._1) && !excl.accept(r._1) && !r._1.isDirectory)
        Filter(streams.log, filtered map(_._2), props)
        println(resources)
        resources
    }
  }

  lazy val projectPropsTask = projectProps <<= (organization, name, description, version, scalaVersion, sbtVersion) map {
    (o, n, d, v, scv, sv) =>
      Seq("organization" -> o, "name" -> n, "description" -> d, "version" -> v, "scalaVersion" -> scv, "sbtVersion" -> sv)
  }

  lazy val unmanagedPropsTask = unmanagedProps <<= (streams, filters) map {
    (streams, filters) => (Seq.empty[(String, String)] /: filters) { (acc, rf) => acc ++ properties(streams.log, rf)}
  }

  lazy val filterConfigPaths: Seq[Setting[_]] = Seq(
    filterDirectory <<= (sourceDirectory, filterDirectoryName) apply { (d, name) =>{println(d / name); d / name  }},
    sourceDirectories in filters <<= Seq(filterDirectory).join,
    filters <<= collectFiles(sourceDirectories in filters, includeFilter in filters, excludeFilter in filters),
    includeFilter in filters := "*.properties" | "*.xml" | "*.conf",
    excludeFilter in filters := HiddenFileFilter,
    includeFilter in filterResources := "*.properties" | "*.xml" | "*.conf",
    excludeFilter in filterResources := HiddenFileFilter || ImageFileFilter
  )

  lazy val filterConfigTasks: Seq[Setting[_]] =Seq(
    filterResourceTask,
    copyResources in filterResources <<= copyResources,
    managedProps <<= (projectProps, systemProps, envProps) map (_ ++ _ ++ _),
    unmanagedPropsTask,
    props <<= (extraProps, managedProps, unmanagedProps) map (_ ++ _ ++ _)
  )

  lazy val filterConfigSettings: Seq[Setting[_]] = filterConfigTasks ++ filterConfigPaths


  lazy val baseFilterSettings = Seq(
    filterDirectoryName := "filter",
    extraProps := Nil,
    projectPropsTask,
    envProps := System.getenv.toSeq,
    systemProps := System.getProperties.stringPropertyNames.toSeq map (k => k -> System.getProperty(k)))
  lazy val filterSettings = baseFilterSettings ++ inConfig(Compile)(filterConfigSettings) ++ inConfig(Test)(filterConfigSettings)

  object ImageFileFilter extends FileFilter {
    val formats = Seq("jpg", "jpeg", "png", "gif", "bmp")
    def accept(file: File) = formats.exists(_ == file.ext.toLowerCase)
  }


  def properties(log: Logger, path: File) = {
    val props = new Properties
    IO.load(props, path)
    props
  }

  object Filter {
    import util.matching.Regex._
    import java.io.{ FileReader, BufferedReader, PrintWriter }

    val pattern = """((?:\\?)\$\{.+?\})""".r
    def replacer(props: Map[String, String]) = (m: Match) => {
      m.matched match {
        case s if s.startsWith("\\") =>{
          println(s)
          Some("""\$\{%s\}""" format s.substring(3, s.length -1))
        }
        case s => props.get(s.substring(2, s.length -1))
      }
    }
    def filter(line: String, props: Map[String, String]) = pattern.replaceSomeIn(line, replacer(props))

    def apply(log: Logger, files: Seq[File], props: Map[String, String]): Unit = {
      log debug ("Filter properties: %s" format (props.mkString("{", ", ", "}")))
      IO.withTemporaryDirectory { dir =>
        files foreach { src =>
          log debug ("Filtering %s" format src.absolutePath)
          val dest = new File(dir, src.getName)
          val out = new PrintWriter(dest, "UTF-8")
          val reader =new InputStreamReader(new FileInputStream(src),"UTF-8")
          //new FileReader(src, "UTF-8")
          val in = new BufferedReader(reader)
          IO.foreachLine(in) { line => IO.writeLines(out, Seq(filter(line, props))) }
          in.close()
          out.close()
          IO.copyFile(dest, src, true)
        }
      }
    }

  }
}