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
    val url = "jdbc:mysql://localhost:3306/ravel?user=root&password=ex299295&nullNamePatternMatchesAll=true"
    val outputDir = "src/ravel-rest-api/src/main/scala"
    val pkg = "com.ravel.schema"
    run("slick.driver.MySQLDriver", "com.mysql.jdbc.Driver", url, outputDir, pkg, "root", "ex299295")

    def run(slickDriver: String, jdbcDriver: String, url: String, outputDir: String, pkg: String, user: String, password: String): Unit = {
      val driver: JdbcProfile =
        Class.forName(slickDriver + "$").getField("MODULE$").get(null).asInstanceOf[JdbcProfile]
      val dbFactory = driver.api.Database
      val db = dbFactory.forURL(url, driver = jdbcDriver, keepAliveConnection = true)
      val included = Seq("guide","guide_infra", "infrastructure","infrastructure_desc",
                         "product", "product_ext","product_other","product_price_by_team",
                          "system_constant","picture")
      try {
        import scala.concurrent.ExecutionContext.Implicits.global
        val m = Await.result(db.run(
          driver.defaultTables.map(_.filter(t=> included contains t.name.name))
            .flatMap(driver.createModelBuilder(_,true).buildModel)),Duration.Inf)
        //      val m = Await.result(db.run(driver.createModel(None, true)(ExecutionContext.global).withPinnedSession), Duration.Inf)
        new SourceCodeGenerator(m).writeToFile(slickDriver, outputDir, pkg, "DBSchema", "DBSchema.scala")
      } finally db.close
    }
    assert(1 === 1)
  }
}
