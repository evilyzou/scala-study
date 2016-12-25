package table1
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.MySQLDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Guide.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Guide
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param systemType Database column system_type SqlType(VARCHAR), Length(255,true)
   *  @param guideCustomType Database column guide_custom_type SqlType(VARCHAR), Length(255,true)
   *  @param guideType Database column guide_type SqlType(VARCHAR), Length(255,true)
   *  @param title Database column title SqlType(VARCHAR), Length(255,true)
   *  @param picture Database column picture SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param content Database column content SqlType(TEXT), Default(None)
   *  @param mainCategory Database column main_category SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param subCategory Database column sub_category SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param status Database column status SqlType(BIT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class GuideRow(id: Int, systemType: String, guideCustomType: String, guideType: String, title: String, picture: Option[String] = None, content: Option[String] = None, mainCategory: Option[String] = None, subCategory: Option[String] = None, status: Option[Boolean] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching GuideRow objects using plain SQL queries */
  implicit def GetResultGuideRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Boolean]], e4: GR[Option[java.sql.Timestamp]]): GR[GuideRow] = GR{
    prs => import prs._
    GuideRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Boolean], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table guide. Objects of this class serve as prototypes for rows in queries. */
  class Guide(_tableTag: Tag) extends Table[GuideRow](_tableTag, "guide") {
    def * = (id, systemType, guideCustomType, guideType, title, picture, content, mainCategory, subCategory, status, createTime, updateTime) <> (GuideRow.tupled, GuideRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(systemType), Rep.Some(guideCustomType), Rep.Some(guideType), Rep.Some(title), picture, content, mainCategory, subCategory, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> GuideRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6, _7, _8, _9, _10, _11, _12)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column system_type SqlType(VARCHAR), Length(255,true) */
    val systemType: Rep[String] = column[String]("system_type", O.Length(255,varying=true))
    /** Database column guide_custom_type SqlType(VARCHAR), Length(255,true) */
    val guideCustomType: Rep[String] = column[String]("guide_custom_type", O.Length(255,varying=true))
    /** Database column guide_type SqlType(VARCHAR), Length(255,true) */
    val guideType: Rep[String] = column[String]("guide_type", O.Length(255,varying=true))
    /** Database column title SqlType(VARCHAR), Length(255,true) */
    val title: Rep[String] = column[String]("title", O.Length(255,varying=true))
    /** Database column picture SqlType(VARCHAR), Length(255,true), Default(None) */
    val picture: Rep[Option[String]] = column[Option[String]]("picture", O.Length(255,varying=true), O.Default(None))
    /** Database column content SqlType(TEXT), Default(None) */
    val content: Rep[Option[String]] = column[Option[String]]("content", O.Default(None))
    /** Database column main_category SqlType(VARCHAR), Length(255,true), Default(None) */
    val mainCategory: Rep[Option[String]] = column[Option[String]]("main_category", O.Length(255,varying=true), O.Default(None))
    /** Database column sub_category SqlType(VARCHAR), Length(255,true), Default(None) */
    val subCategory: Rep[Option[String]] = column[Option[String]]("sub_category", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(BIT), Default(None) */
    val status: Rep[Option[Boolean]] = column[Option[Boolean]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table Guide */
  lazy val Guide = new TableQuery(tag => new Guide(tag))
}
