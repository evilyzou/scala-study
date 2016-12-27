import org.scalatest.{Matchers, FlatSpec}
import scalikejdbc.async.{AsyncDB, AsyncConnectionPool}
import scalikejdbc._, async._,FutureImplicits._

import scala.concurrent._, duration._, ExecutionContext.Implicits.global

/**
 * Created by CloudZou on 12/27/16.
 */
case class Product(id: Int) extends ShortenedNames

class ScalikeJdbcSpec extends FlatSpec with Matchers {
  "A scalike" should "xxx" in {
    Product.init
    val products = AsyncDB withPool { implicit s =>
      Product.findAll()
    }
    Await.result(products, 5.seconds)
    val count = products.value.get.get.size
    println(s"count:${count}")
    assert(count === 169)
  }
}

object Product extends SQLSyntaxSupport[Product] with ShortenedNames {
  def init = {
    //AsyncConnectionPool.singleton("jdbc:mysql://localhost:3306/ravel", "root", "ex299295")
    ConnectionPool.add('mysql, "jdbc:mysql://localhost:3306/ravel", "root", "ex299295")
    AsyncConnectionPool.add('mysql, "jdbc:mysql://localhost:3306/ravel", "root", "ex299295")
  }


  def apply(p: SyntaxProvider[Product])(rs: WrappedResultSet): Product = apply(p.resultName)(rs)

  def apply(p: ResultName[Product])(rs: WrappedResultSet): Product = {
    new Product(id = rs.int(p.id))
  }

  lazy val p = Product.syntax("p")

  def findAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, cxt: EC = ECGlobal): Future[List[Product]] = withSQL {
    select.from(Product as p).orderBy(p.id)
  }.map(Product(p))
}

