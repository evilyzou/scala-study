/**
 * Created by CloudZou on 12/4/16.
 */
object TableGenSample extends  App{
  run("slick.driver.MySQLDriver", "com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/ravel?user=root&password=ex299295&nullNamePatternMatchesAll=true", "table2", "table2", "root", "ex299295")

  def run(slickDriver: String, jdbcDriver: String, url: String, outputDir: String, pkg: String, user: String, password: String): Unit = {
    val driver: JdbcProfile =
      Class.forName(slickDriver + "$").getField("MODULE$").get(null).asInstanceOf[JdbcProfile]
    val dbFactory = driver.api.Database
    val db = dbFactory.forURL(url, driver = jdbcDriver, keepAliveConnection = true)
    try {
      val m = Await.result(db.run(driver.createModel(None, true)(ExecutionContext.global).withPinnedSession), Duration.Inf)
      new SourceCodeGenerator(m).writeToFile(slickDriver, outputDir, pkg)
    } finally db.close
  }
}
