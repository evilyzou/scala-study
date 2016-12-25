import org.scalatest._
import slick.codegen.SourceCodeGenerator
import slick.driver.JdbcProfile

import scala.concurrent.Await
import scala.concurrent.duration.Duration

/**
 * Created by CloudZou on 12/25/16.
 */
class TableGenSpec extends FlatSpec with Matchers{
  "Table Gen" should "ss" in {
    run("slick.driver.MySQLDriver", "com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/ravel?user=root&password=ex299295&nullNamePatternMatchesAll=true", "table1", "table1", "root", "ex299295")

    def run(slickDriver: String, jdbcDriver: String, url: String, outputDir: String, pkg: String, user: String, password: String): Unit = {
      val driver: JdbcProfile =
        Class.forName(slickDriver + "$").getField("MODULE$").get(null).asInstanceOf[JdbcProfile]
      val dbFactory = driver.api.Database
      val db = dbFactory.forURL(url, driver = jdbcDriver, keepAliveConnection = true)
      val included = Seq("guide")
      try {
        import scala.concurrent.ExecutionContext.Implicits.global
        val m = Await.result(db.run(
          driver.defaultTables.map(_.filter(t=> included contains t.name.name))
            .flatMap(driver.createModelBuilder(_,true).buildModel)),Duration.Inf)
        //      val m = Await.result(db.run(driver.createModel(None, true)(ExecutionContext.global).withPinnedSession), Duration.Inf)
        new SourceCodeGenerator(m).writeToFile(slickDriver, outputDir, pkg)
      } finally db.close
    }
    assert(1 === 1)
  }
}
