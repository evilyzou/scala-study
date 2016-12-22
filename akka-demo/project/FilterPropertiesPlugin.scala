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

  object BuildEnv extends Enumeration {
    val Production, Development = Value
  }

  object FilterKeys {
    val filterDirectoryName = Def.settingKey[String]("Default filter directory name.")
    val filterDirectory = Def.settingKey[File]("Default filter directory, used for filters.")
    val extraProps = Def.settingKey[Seq[(String, String)]]("Extra filter properties")

    val filters = Def.taskKey[Seq[File]]("All filters")
    val systemProps = Def.taskKey[Seq[(String, String)]]("System filter properties")
    val envProps = Def.taskKey[Seq[(String, String)]]("Environment filter properties")
    val managedProps = Def.taskKey[Seq[(String, String)]]("Managed filter properties")
    val unmanagedProps = Def.taskKey[Seq[(String, String)]]("Filter properties defined in filters.")
    val props = Def.taskKey[Seq[(String, String)]]("All filter properties")
    val filterResources = Def.taskKey[Seq[(File, File)]]("Filters all resources")
  }

  lazy val filterResourceTask = filterResources <<= filter(copyResources, filterResources) triggeredBy compile

  def filter(resources: TaskKey[Seq[(File,File)]], task: TaskKey[Seq[(File, File)]]) = {
    (streams, resources in task, includeFilter in task, excludeFilter in task, props) map {
      (streams, resources: Seq[(File, File)], incl, excl, filterProps) =>
        val props = Map.empty[String, String] ++ filterProps
        val filtered = resources filter (r => incl.accept(r._1) && !excl.accept(r._1) && !r._1.isDirectory)
        Filter(streams.log, filtered map(_._2), props)
        resources
    }
  }

  lazy val unmanagedPropsTask = unmanagedProps <<= (streams, filters) map {
    (streams, filters) => (Seq.empty[(String, String)] /: filters) { (acc, rf) => acc ++ properties(streams.log, rf)}
  }

  lazy val filterConfigPaths: Seq[Setting[_]] = Seq(
    filterDirectory <<= (sourceDirectory, filterDirectoryName) apply { (d, name) =>{println(d / name); d / name  }},
    sourceDirectories in filters <<= Seq(filterDirectory).join,
    filters <<={
      val files = collectFiles(sourceDirectories in filters, includeFilter in filters, excludeFilter in filters)
      files map {
        f =>
          val t = propertiesSource(f)
          t
      }
    } ,
    includeFilter in filters := "*.properties" ,
    excludeFilter in filters := HiddenFileFilter,
    includeFilter in filterResources := "*.xml" | "*.conf",
    excludeFilter in filterResources := HiddenFileFilter || ImageFileFilter
  )

  def propertiesSource(files: Seq[File]) = {
      val env = scala.sys.props.get("env")
        .orElse(sys.env.get("env"))
        .getOrElse("dev")
      println(s"env:${env}")
      val targetPropertiesFile = files filter (f => f.name.indexOf(s"${env}.properties") > 0)
      targetPropertiesFile
  }


  lazy val filterConfigTasks: Seq[Setting[_]] =Seq(
    filterResourceTask,
    copyResources in filterResources <<= copyResources,
    managedProps <<= (systemProps, envProps) map ( _ ++ _),
    unmanagedPropsTask,
    props <<= (extraProps, managedProps, unmanagedProps) map (_ ++ _ ++ _)
  )

  lazy val filterConfigSettings: Seq[Setting[_]] = filterConfigTasks ++ filterConfigPaths

  lazy val baseFilterSettings = Seq(
    filterDirectoryName := "filter",
    extraProps := Nil,
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
          Some("""\$\{%s\}""" format s.substring(3, s.length -1))
        }
        case s => props.get(s.substring(2, s.length -1))
      }
    }
    def filter(line: String, props: Map[String, String]) ={
      try {
        val some = replacer(props)
        val  t=  pattern.replaceSomeIn(line, some);
        t
      }catch{
        case e: Exception => {
          println(e)
          line
        }
      }
    }

    def apply(log: Logger, files: Seq[File], props: Map[String, String]): Unit = {
      log.info("Filter properties: %s" format (props.mkString("{", ", ", "}")))
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