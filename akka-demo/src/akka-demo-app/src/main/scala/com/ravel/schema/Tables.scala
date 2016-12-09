package com.ravel.schema

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
  import slick.collection.heterogeneous._
  import slick.collection.heterogeneous.syntax._
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Account.schema, AccountMenuUrl.schema, AccountRole.schema, AccountRoleRelation.schema, AccountRoleUrl.schema, Guide.schema, GuideInfra.schema, Infrastructure.schema, InfrastructureDesc.schema, InfrastructureSelf.schema, MenuResource.schema, PermissionResource.schema, Picture.schema, PictureSpace.schema, Product.schema, ProductCruiseHouse.schema, ProductExt.schema, ProductOther.schema, ProductPriceByTeam.schema, ProductPriceByType.schema, ProductQunarSync.schema, RoleMenu.schema, SystemConstant.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Account
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param userName Database column user_name SqlType(VARCHAR), Length(255,true)
   *  @param phone Database column phone SqlType(VARCHAR), Length(60,true), Default()
   *  @param email Database column email SqlType(VARCHAR), Length(255,true)
   *  @param realName Database column real_name SqlType(VARCHAR), Length(255,true)
   *  @param password Database column password SqlType(VARCHAR), Length(255,true)
   *  @param salt Database column salt SqlType(VARCHAR), Length(255,true)
   *  @param failedNum Database column failed_num SqlType(INT)
   *  @param forbidden Database column forbidden SqlType(TINYINT), Default(0)
   *  @param status Database column status SqlType(TINYINT)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class AccountRow(id: Int, userName: String, phone: String = "", email: String, realName: String, password: String, salt: String, failedNum: Int, forbidden: Byte = 0, status: Byte, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching AccountRow objects using plain SQL queries */
  implicit def GetResultAccountRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte], e3: GR[java.sql.Timestamp]): GR[AccountRow] = GR{
    prs => import prs._
    AccountRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<[String], <<[String], <<[Int], <<[Byte], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table account. Objects of this class serve as prototypes for rows in queries. */
  class Account(_tableTag: Tag) extends Table[AccountRow](_tableTag, "account") {
    def * = (id, userName, phone, email, realName, password, salt, failedNum, forbidden, status, createTime, updateTime) <> (AccountRow.tupled, AccountRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(userName), Rep.Some(phone), Rep.Some(email), Rep.Some(realName), Rep.Some(password), Rep.Some(salt), Rep.Some(failedNum), Rep.Some(forbidden), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> AccountRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get, _9.get, _10.get, _11.get, _12.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column user_name SqlType(VARCHAR), Length(255,true) */
    val userName: Rep[String] = column[String]("user_name", O.Length(255,varying=true))
    /** Database column phone SqlType(VARCHAR), Length(60,true), Default() */
    val phone: Rep[String] = column[String]("phone", O.Length(60,varying=true), O.Default(""))
    /** Database column email SqlType(VARCHAR), Length(255,true) */
    val email: Rep[String] = column[String]("email", O.Length(255,varying=true))
    /** Database column real_name SqlType(VARCHAR), Length(255,true) */
    val realName: Rep[String] = column[String]("real_name", O.Length(255,varying=true))
    /** Database column password SqlType(VARCHAR), Length(255,true) */
    val password: Rep[String] = column[String]("password", O.Length(255,varying=true))
    /** Database column salt SqlType(VARCHAR), Length(255,true) */
    val salt: Rep[String] = column[String]("salt", O.Length(255,varying=true))
    /** Database column failed_num SqlType(INT) */
    val failedNum: Rep[Int] = column[Int]("failed_num")
    /** Database column forbidden SqlType(TINYINT), Default(0) */
    val forbidden: Rep[Byte] = column[Byte]("forbidden", O.Default(0))
    /** Database column status SqlType(TINYINT) */
    val status: Rep[Byte] = column[Byte]("status")
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")

    /** Index over (email) (database name email) */
    val index1 = index("email", email)
    /** Index over (realName) (database name real_name) */
    val index2 = index("real_name", realName)
    /** Index over (userName) (database name userName) */
    val index3 = index("userName", userName)
  }
  /** Collection-like TableQuery object for table Account */
  lazy val Account = new TableQuery(tag => new Account(tag))

  /** Entity class storing rows of table AccountMenuUrl
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param parentId Database column parent_id SqlType(INT)
   *  @param name Database column name SqlType(VARCHAR), Length(127,true)
   *  @param menuUrl Database column menu_url SqlType(VARCHAR), Length(127,true)
   *  @param content Database column content SqlType(MEDIUMTEXT), Length(16777215,true)
   *  @param status Database column status SqlType(TINYINT) */
  case class AccountMenuUrlRow(id: Int, parentId: Int, name: String, menuUrl: String, content: String, status: Byte)
  /** GetResult implicit for fetching AccountMenuUrlRow objects using plain SQL queries */
  implicit def GetResultAccountMenuUrlRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte]): GR[AccountMenuUrlRow] = GR{
    prs => import prs._
    AccountMenuUrlRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<[String], <<[Byte]))
  }
  /** Table description of table account_menu_url. Objects of this class serve as prototypes for rows in queries. */
  class AccountMenuUrl(_tableTag: Tag) extends Table[AccountMenuUrlRow](_tableTag, "account_menu_url") {
    def * = (id, parentId, name, menuUrl, content, status) <> (AccountMenuUrlRow.tupled, AccountMenuUrlRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(parentId), Rep.Some(name), Rep.Some(menuUrl), Rep.Some(content), Rep.Some(status)).shaped.<>({r=>import r._; _1.map(_=> AccountMenuUrlRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column parent_id SqlType(INT) */
    val parentId: Rep[Int] = column[Int]("parent_id")
    /** Database column name SqlType(VARCHAR), Length(127,true) */
    val name: Rep[String] = column[String]("name", O.Length(127,varying=true))
    /** Database column menu_url SqlType(VARCHAR), Length(127,true) */
    val menuUrl: Rep[String] = column[String]("menu_url", O.Length(127,varying=true))
    /** Database column content SqlType(MEDIUMTEXT), Length(16777215,true) */
    val content: Rep[String] = column[String]("content", O.Length(16777215,varying=true))
    /** Database column status SqlType(TINYINT) */
    val status: Rep[Byte] = column[Byte]("status")
  }
  /** Collection-like TableQuery object for table AccountMenuUrl */
  lazy val AccountMenuUrl = new TableQuery(tag => new AccountMenuUrl(tag))

  /** Entity class storing rows of table AccountRole
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param roleName Database column role_name SqlType(VARCHAR), Length(127,true)
   *  @param status Database column status SqlType(TINYINT) */
  case class AccountRoleRow(id: Int, roleName: String, status: Byte)
  /** GetResult implicit for fetching AccountRoleRow objects using plain SQL queries */
  implicit def GetResultAccountRoleRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte]): GR[AccountRoleRow] = GR{
    prs => import prs._
    AccountRoleRow.tupled((<<[Int], <<[String], <<[Byte]))
  }
  /** Table description of table account_role. Objects of this class serve as prototypes for rows in queries. */
  class AccountRole(_tableTag: Tag) extends Table[AccountRoleRow](_tableTag, "account_role") {
    def * = (id, roleName, status) <> (AccountRoleRow.tupled, AccountRoleRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(roleName), Rep.Some(status)).shaped.<>({r=>import r._; _1.map(_=> AccountRoleRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column role_name SqlType(VARCHAR), Length(127,true) */
    val roleName: Rep[String] = column[String]("role_name", O.Length(127,varying=true))
    /** Database column status SqlType(TINYINT) */
    val status: Rep[Byte] = column[Byte]("status")
  }
  /** Collection-like TableQuery object for table AccountRole */
  lazy val AccountRole = new TableQuery(tag => new AccountRole(tag))

  /** Entity class storing rows of table AccountRoleRelation
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param accountId Database column account_id SqlType(INT)
   *  @param roleId Database column role_id SqlType(INT)
   *  @param status Database column status SqlType(TINYINT) */
  case class AccountRoleRelationRow(id: Int, accountId: Int, roleId: Int, status: Byte)
  /** GetResult implicit for fetching AccountRoleRelationRow objects using plain SQL queries */
  implicit def GetResultAccountRoleRelationRow(implicit e0: GR[Int], e1: GR[Byte]): GR[AccountRoleRelationRow] = GR{
    prs => import prs._
    AccountRoleRelationRow.tupled((<<[Int], <<[Int], <<[Int], <<[Byte]))
  }
  /** Table description of table account_role_relation. Objects of this class serve as prototypes for rows in queries. */
  class AccountRoleRelation(_tableTag: Tag) extends Table[AccountRoleRelationRow](_tableTag, "account_role_relation") {
    def * = (id, accountId, roleId, status) <> (AccountRoleRelationRow.tupled, AccountRoleRelationRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(accountId), Rep.Some(roleId), Rep.Some(status)).shaped.<>({r=>import r._; _1.map(_=> AccountRoleRelationRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column account_id SqlType(INT) */
    val accountId: Rep[Int] = column[Int]("account_id")
    /** Database column role_id SqlType(INT) */
    val roleId: Rep[Int] = column[Int]("role_id")
    /** Database column status SqlType(TINYINT) */
    val status: Rep[Byte] = column[Byte]("status")
  }
  /** Collection-like TableQuery object for table AccountRoleRelation */
  lazy val AccountRoleRelation = new TableQuery(tag => new AccountRoleRelation(tag))

  /** Entity class storing rows of table AccountRoleUrl
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param roleId Database column role_id SqlType(INT)
   *  @param permissionResourceId Database column permission_resource_id SqlType(INT), Default(0)
   *  @param permissions Database column permissions SqlType(INT), Default(0)
   *  @param status Database column status SqlType(TINYINT)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class AccountRoleUrlRow(id: Int, roleId: Int, permissionResourceId: Int = 0, permissions: Int = 0, status: Byte, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching AccountRoleUrlRow objects using plain SQL queries */
  implicit def GetResultAccountRoleUrlRow(implicit e0: GR[Int], e1: GR[Byte], e2: GR[java.sql.Timestamp]): GR[AccountRoleUrlRow] = GR{
    prs => import prs._
    AccountRoleUrlRow.tupled((<<[Int], <<[Int], <<[Int], <<[Int], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table account_role_url. Objects of this class serve as prototypes for rows in queries. */
  class AccountRoleUrl(_tableTag: Tag) extends Table[AccountRoleUrlRow](_tableTag, "account_role_url") {
    def * = (id, roleId, permissionResourceId, permissions, status, createTime, updateTime) <> (AccountRoleUrlRow.tupled, AccountRoleUrlRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(roleId), Rep.Some(permissionResourceId), Rep.Some(permissions), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> AccountRoleUrlRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column role_id SqlType(INT) */
    val roleId: Rep[Int] = column[Int]("role_id")
    /** Database column permission_resource_id SqlType(INT), Default(0) */
    val permissionResourceId: Rep[Int] = column[Int]("permission_resource_id", O.Default(0))
    /** Database column permissions SqlType(INT), Default(0) */
    val permissions: Rep[Int] = column[Int]("permissions", O.Default(0))
    /** Database column status SqlType(TINYINT) */
    val status: Rep[Byte] = column[Byte]("status")
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table AccountRoleUrl */
  lazy val AccountRoleUrl = new TableQuery(tag => new AccountRoleUrl(tag))

  /** Entity class storing rows of table Guide
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param systemType Database column system_type SqlType(VARCHAR), Length(255,true)
   *  @param guideCustomType Database column guide_custom_type SqlType(VARCHAR), Length(255,true)
   *  @param guideType Database column guide_type SqlType(VARCHAR), Length(255,true)
   *  @param title Database column title SqlType(VARCHAR), Length(255,true)
   *  @param content Database column content SqlType(TEXT), Default(None)
   *  @param mainCategory Database column main_category SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param subCategory Database column sub_category SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param status Database column status SqlType(BIT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class GuideRow(id: Int, systemType: String, guideCustomType: String, guideType: String, title: String, content: Option[String] = None, mainCategory: Option[String] = None, subCategory: Option[String] = None, status: Option[Boolean] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching GuideRow objects using plain SQL queries */
  implicit def GetResultGuideRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Boolean]], e4: GR[Option[java.sql.Timestamp]]): GR[GuideRow] = GR{
    prs => import prs._
    GuideRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<?[String], <<?[String], <<?[String], <<?[Boolean], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table guide. Objects of this class serve as prototypes for rows in queries. */
  class Guide(_tableTag: Tag) extends Table[GuideRow](_tableTag, "guide") {
    def * = (id, systemType, guideCustomType, guideType, title, content, mainCategory, subCategory, status, createTime, updateTime) <> (GuideRow.tupled, GuideRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(systemType), Rep.Some(guideCustomType), Rep.Some(guideType), Rep.Some(title), content, mainCategory, subCategory, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> GuideRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6, _7, _8, _9, _10, _11)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

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

  /** Entity class storing rows of table GuideInfra
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param guideId Database column guide_id SqlType(INT)
   *  @param infraId Database column infra_id SqlType(INT)
   *  @param infraName Database column infra_name SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param guideInfraType Database column guide_infra_type SqlType(VARCHAR), Length(255,true)
   *  @param status Database column status SqlType(BIT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class GuideInfraRow(id: Int, guideId: Int, infraId: Int, infraName: Option[String] = None, guideInfraType: String, status: Option[Boolean] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching GuideInfraRow objects using plain SQL queries */
  implicit def GetResultGuideInfraRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[String], e3: GR[Option[Boolean]], e4: GR[Option[java.sql.Timestamp]]): GR[GuideInfraRow] = GR{
    prs => import prs._
    GuideInfraRow.tupled((<<[Int], <<[Int], <<[Int], <<?[String], <<[String], <<?[Boolean], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table guide_infra. Objects of this class serve as prototypes for rows in queries. */
  class GuideInfra(_tableTag: Tag) extends Table[GuideInfraRow](_tableTag, "guide_infra") {
    def * = (id, guideId, infraId, infraName, guideInfraType, status, createTime, updateTime) <> (GuideInfraRow.tupled, GuideInfraRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(guideId), Rep.Some(infraId), infraName, Rep.Some(guideInfraType), status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> GuideInfraRow.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6, _7, _8)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column guide_id SqlType(INT) */
    val guideId: Rep[Int] = column[Int]("guide_id")
    /** Database column infra_id SqlType(INT) */
    val infraId: Rep[Int] = column[Int]("infra_id")
    /** Database column infra_name SqlType(VARCHAR), Length(255,true), Default(None) */
    val infraName: Rep[Option[String]] = column[Option[String]]("infra_name", O.Length(255,varying=true), O.Default(None))
    /** Database column guide_infra_type SqlType(VARCHAR), Length(255,true) */
    val guideInfraType: Rep[String] = column[String]("guide_infra_type", O.Length(255,varying=true))
    /** Database column status SqlType(BIT), Default(None) */
    val status: Rep[Option[Boolean]] = column[Option[Boolean]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table GuideInfra */
  lazy val GuideInfra = new TableQuery(tag => new GuideInfra(tag))

  /** Entity class storing rows of table Infrastructure
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param `type` Database column type SqlType(VARCHAR), Length(45,true)
   *  @param title Database column title SqlType(VARCHAR), Length(1024,true), Default(None)
   *  @param feature Database column feature SqlType(TEXT), Default(None)
   *  @param content Database column content SqlType(TEXT), Default(None)
   *  @param attachment Database column attachment SqlType(VARCHAR), Length(2048,true), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None)
   *  @param rank Database column rank SqlType(VARCHAR), Length(2048,true), Default(None)
   *  @param titlePicture Database column title_picture SqlType(VARCHAR), Length(2048,true), Default(None)
   *  @param description Database column description SqlType(TEXT), Default(None)
   *  @param subject Database column subject SqlType(VARCHAR), Length(2048,true), Default(None)
   *  @param weather Database column weather SqlType(VARCHAR), Length(2048,true), Default(None)
   *  @param subTitle Database column sub_title SqlType(VARCHAR), Length(1024,true), Default(None)
   *  @param address Database column address SqlType(VARCHAR), Length(1024,true), Default(None)
   *  @param phone Database column phone SqlType(VARCHAR), Length(1024,true), Default(None)
   *  @param city Database column city SqlType(VARCHAR), Length(1024,true), Default(None) */
  case class InfrastructureRow(id: Int, `type`: String, title: Option[String] = None, feature: Option[String] = None, content: Option[String] = None, attachment: Option[String] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None, rank: Option[String] = None, titlePicture: Option[String] = None, description: Option[String] = None, subject: Option[String] = None, weather: Option[String] = None, subTitle: Option[String] = None, address: Option[String] = None, phone: Option[String] = None, city: Option[String] = None)
  /** GetResult implicit for fetching InfrastructureRow objects using plain SQL queries */
  implicit def GetResultInfrastructureRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Long]], e4: GR[Option[java.sql.Timestamp]]): GR[InfrastructureRow] = GR{
    prs => import prs._
    InfrastructureRow.tupled((<<[Int], <<[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String]))
  }
  /** Table description of table infrastructure. Objects of this class serve as prototypes for rows in queries.
   *  NOTE: The following names collided with Scala keywords and were escaped: type */
  class Infrastructure(_tableTag: Tag) extends Table[InfrastructureRow](_tableTag, "infrastructure") {
    def * = (id, `type`, title, feature, content, attachment, status, createTime, updateTime, rank, titlePicture, description, subject, weather, subTitle, address, phone, city) <> (InfrastructureRow.tupled, InfrastructureRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(`type`), title, feature, content, attachment, status, createTime, updateTime, rank, titlePicture, description, subject, weather, subTitle, address, phone, city).shaped.<>({r=>import r._; _1.map(_=> InfrastructureRow.tupled((_1.get, _2.get, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column type SqlType(VARCHAR), Length(45,true)
     *  NOTE: The name was escaped because it collided with a Scala keyword. */
    val `type`: Rep[String] = column[String]("type", O.Length(45,varying=true))
    /** Database column title SqlType(VARCHAR), Length(1024,true), Default(None) */
    val title: Rep[Option[String]] = column[Option[String]]("title", O.Length(1024,varying=true), O.Default(None))
    /** Database column feature SqlType(TEXT), Default(None) */
    val feature: Rep[Option[String]] = column[Option[String]]("feature", O.Default(None))
    /** Database column content SqlType(TEXT), Default(None) */
    val content: Rep[Option[String]] = column[Option[String]]("content", O.Default(None))
    /** Database column attachment SqlType(VARCHAR), Length(2048,true), Default(None) */
    val attachment: Rep[Option[String]] = column[Option[String]]("attachment", O.Length(2048,varying=true), O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
    /** Database column rank SqlType(VARCHAR), Length(2048,true), Default(None) */
    val rank: Rep[Option[String]] = column[Option[String]]("rank", O.Length(2048,varying=true), O.Default(None))
    /** Database column title_picture SqlType(VARCHAR), Length(2048,true), Default(None) */
    val titlePicture: Rep[Option[String]] = column[Option[String]]("title_picture", O.Length(2048,varying=true), O.Default(None))
    /** Database column description SqlType(TEXT), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Default(None))
    /** Database column subject SqlType(VARCHAR), Length(2048,true), Default(None) */
    val subject: Rep[Option[String]] = column[Option[String]]("subject", O.Length(2048,varying=true), O.Default(None))
    /** Database column weather SqlType(VARCHAR), Length(2048,true), Default(None) */
    val weather: Rep[Option[String]] = column[Option[String]]("weather", O.Length(2048,varying=true), O.Default(None))
    /** Database column sub_title SqlType(VARCHAR), Length(1024,true), Default(None) */
    val subTitle: Rep[Option[String]] = column[Option[String]]("sub_title", O.Length(1024,varying=true), O.Default(None))
    /** Database column address SqlType(VARCHAR), Length(1024,true), Default(None) */
    val address: Rep[Option[String]] = column[Option[String]]("address", O.Length(1024,varying=true), O.Default(None))
    /** Database column phone SqlType(VARCHAR), Length(1024,true), Default(None) */
    val phone: Rep[Option[String]] = column[Option[String]]("phone", O.Length(1024,varying=true), O.Default(None))
    /** Database column city SqlType(VARCHAR), Length(1024,true), Default(None) */
    val city: Rep[Option[String]] = column[Option[String]]("city", O.Length(1024,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table Infrastructure */
  lazy val Infrastructure = new TableQuery(tag => new Infrastructure(tag))

  /** Entity class storing rows of table InfrastructureDesc
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param content Database column content SqlType(TEXT), Default(None)
   *  @param contentPictureId Database column content_picture_id SqlType(INT), Default(None)
   *  @param contentPictureUrl Database column content_picture_url SqlType(VARCHAR), Length(128,true), Default(None)
   *  @param priority Database column priority SqlType(INT), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None)
   *  @param infraId Database column infra_id SqlType(INT), Default(None) */
  case class InfrastructureDescRow(id: Int, content: Option[String] = None, contentPictureId: Option[Int] = None, contentPictureUrl: Option[String] = None, priority: Option[Int] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None, infraId: Option[Int] = None)
  /** GetResult implicit for fetching InfrastructureDescRow objects using plain SQL queries */
  implicit def GetResultInfrastructureDescRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[Option[Int]], e3: GR[Option[Long]], e4: GR[Option[java.sql.Timestamp]]): GR[InfrastructureDescRow] = GR{
    prs => import prs._
    InfrastructureDescRow.tupled((<<[Int], <<?[String], <<?[Int], <<?[String], <<?[Int], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[Int]))
  }
  /** Table description of table infrastructure_desc. Objects of this class serve as prototypes for rows in queries. */
  class InfrastructureDesc(_tableTag: Tag) extends Table[InfrastructureDescRow](_tableTag, "infrastructure_desc") {
    def * = (id, content, contentPictureId, contentPictureUrl, priority, status, createTime, updateTime, infraId) <> (InfrastructureDescRow.tupled, InfrastructureDescRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), content, contentPictureId, contentPictureUrl, priority, status, createTime, updateTime, infraId).shaped.<>({r=>import r._; _1.map(_=> InfrastructureDescRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column content SqlType(TEXT), Default(None) */
    val content: Rep[Option[String]] = column[Option[String]]("content", O.Default(None))
    /** Database column content_picture_id SqlType(INT), Default(None) */
    val contentPictureId: Rep[Option[Int]] = column[Option[Int]]("content_picture_id", O.Default(None))
    /** Database column content_picture_url SqlType(VARCHAR), Length(128,true), Default(None) */
    val contentPictureUrl: Rep[Option[String]] = column[Option[String]]("content_picture_url", O.Length(128,varying=true), O.Default(None))
    /** Database column priority SqlType(INT), Default(None) */
    val priority: Rep[Option[Int]] = column[Option[Int]]("priority", O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
    /** Database column infra_id SqlType(INT), Default(None) */
    val infraId: Rep[Option[Int]] = column[Option[Int]]("infra_id", O.Default(None))
  }
  /** Collection-like TableQuery object for table InfrastructureDesc */
  lazy val InfrastructureDesc = new TableQuery(tag => new InfrastructureDesc(tag))

  /** Entity class storing rows of table InfrastructureSelf
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param childInfraId Database column child_infra_id SqlType(INT), Default(None)
   *  @param infraId Database column infra_id SqlType(INT), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class InfrastructureSelfRow(id: Int, childInfraId: Option[Int] = None, infraId: Option[Int] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching InfrastructureSelfRow objects using plain SQL queries */
  implicit def GetResultInfrastructureSelfRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[Long]], e3: GR[Option[java.sql.Timestamp]]): GR[InfrastructureSelfRow] = GR{
    prs => import prs._
    InfrastructureSelfRow.tupled((<<[Int], <<?[Int], <<?[Int], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table infrastructure_self. Objects of this class serve as prototypes for rows in queries. */
  class InfrastructureSelf(_tableTag: Tag) extends Table[InfrastructureSelfRow](_tableTag, "infrastructure_self") {
    def * = (id, childInfraId, infraId, status, createTime, updateTime) <> (InfrastructureSelfRow.tupled, InfrastructureSelfRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), childInfraId, infraId, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> InfrastructureSelfRow.tupled((_1.get, _2, _3, _4, _5, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column child_infra_id SqlType(INT), Default(None) */
    val childInfraId: Rep[Option[Int]] = column[Option[Int]]("child_infra_id", O.Default(None))
    /** Database column infra_id SqlType(INT), Default(None) */
    val infraId: Rep[Option[Int]] = column[Option[Int]]("infra_id", O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table InfrastructureSelf */
  lazy val InfrastructureSelf = new TableQuery(tag => new InfrastructureSelf(tag))

  /** Entity class storing rows of table MenuResource
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param menuId Database column menu_id SqlType(INT)
   *  @param resourceId Database column resource_id SqlType(INT), Default(0)
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class MenuResourceRow(id: Int, menuId: Int, resourceId: Int = 0, status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching MenuResourceRow objects using plain SQL queries */
  implicit def GetResultMenuResourceRow(implicit e0: GR[Int], e1: GR[Byte], e2: GR[java.sql.Timestamp]): GR[MenuResourceRow] = GR{
    prs => import prs._
    MenuResourceRow.tupled((<<[Int], <<[Int], <<[Int], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table menu_resource. Objects of this class serve as prototypes for rows in queries. */
  class MenuResource(_tableTag: Tag) extends Table[MenuResourceRow](_tableTag, "menu_resource") {
    def * = (id, menuId, resourceId, status, createTime, updateTime) <> (MenuResourceRow.tupled, MenuResourceRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(menuId), Rep.Some(resourceId), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> MenuResourceRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column menu_id SqlType(INT) */
    val menuId: Rep[Int] = column[Int]("menu_id")
    /** Database column resource_id SqlType(INT), Default(0) */
    val resourceId: Rep[Int] = column[Int]("resource_id", O.Default(0))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table MenuResource */
  lazy val MenuResource = new TableQuery(tag => new MenuResource(tag))

  /** Entity class storing rows of table PermissionResource
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param url Database column url SqlType(VARCHAR), Length(255,true), Default()
   *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default()
   *  @param resource Database column resource SqlType(VARCHAR), Length(255,true), Default()
   *  @param category Database column category SqlType(VARCHAR), Length(255,true), Default()
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class PermissionResourceRow(id: Int, url: String = "", name: String = "", resource: String = "", category: String = "", status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching PermissionResourceRow objects using plain SQL queries */
  implicit def GetResultPermissionResourceRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte], e3: GR[java.sql.Timestamp]): GR[PermissionResourceRow] = GR{
    prs => import prs._
    PermissionResourceRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table permission_resource. Objects of this class serve as prototypes for rows in queries. */
  class PermissionResource(_tableTag: Tag) extends Table[PermissionResourceRow](_tableTag, "permission_resource") {
    def * = (id, url, name, resource, category, status, createTime, updateTime) <> (PermissionResourceRow.tupled, PermissionResourceRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(url), Rep.Some(name), Rep.Some(resource), Rep.Some(category), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> PermissionResourceRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column url SqlType(VARCHAR), Length(255,true), Default() */
    val url: Rep[String] = column[String]("url", O.Length(255,varying=true), O.Default(""))
    /** Database column name SqlType(VARCHAR), Length(255,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(255,varying=true), O.Default(""))
    /** Database column resource SqlType(VARCHAR), Length(255,true), Default() */
    val resource: Rep[String] = column[String]("resource", O.Length(255,varying=true), O.Default(""))
    /** Database column category SqlType(VARCHAR), Length(255,true), Default() */
    val category: Rep[String] = column[String]("category", O.Length(255,varying=true), O.Default(""))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table PermissionResource */
  lazy val PermissionResource = new TableQuery(tag => new PermissionResource(tag))

  /** Entity class storing rows of table Picture
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param spaceId Database column space_id SqlType(INT)
   *  @param name Database column name SqlType(VARCHAR), Length(127,true)
   *  @param originalName Database column original_name SqlType(VARCHAR), Length(127,true)
   *  @param pictureUrl Database column picture_url SqlType(VARCHAR), Length(511,true)
   *  @param pictureLocalUrl Database column picture_local_url SqlType(VARCHAR), Length(511,true)
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class PictureRow(id: Int, spaceId: Int, name: String, originalName: String, pictureUrl: String, pictureLocalUrl: String, status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching PictureRow objects using plain SQL queries */
  implicit def GetResultPictureRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte], e3: GR[java.sql.Timestamp]): GR[PictureRow] = GR{
    prs => import prs._
    PictureRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<[String], <<[String], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table picture. Objects of this class serve as prototypes for rows in queries. */
  class Picture(_tableTag: Tag) extends Table[PictureRow](_tableTag, "picture") {
    def * = (id, spaceId, name, originalName, pictureUrl, pictureLocalUrl, status, createTime, updateTime) <> (PictureRow.tupled, PictureRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(spaceId), Rep.Some(name), Rep.Some(originalName), Rep.Some(pictureUrl), Rep.Some(pictureLocalUrl), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> PictureRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get, _9.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column space_id SqlType(INT) */
    val spaceId: Rep[Int] = column[Int]("space_id")
    /** Database column name SqlType(VARCHAR), Length(127,true) */
    val name: Rep[String] = column[String]("name", O.Length(127,varying=true))
    /** Database column original_name SqlType(VARCHAR), Length(127,true) */
    val originalName: Rep[String] = column[String]("original_name", O.Length(127,varying=true))
    /** Database column picture_url SqlType(VARCHAR), Length(511,true) */
    val pictureUrl: Rep[String] = column[String]("picture_url", O.Length(511,varying=true))
    /** Database column picture_local_url SqlType(VARCHAR), Length(511,true) */
    val pictureLocalUrl: Rep[String] = column[String]("picture_local_url", O.Length(511,varying=true))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table Picture */
  lazy val Picture = new TableQuery(tag => new Picture(tag))

  /** Entity class storing rows of table PictureSpace
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param parentId Database column parent_id SqlType(INT), Default(0)
   *  @param name Database column name SqlType(VARCHAR), Length(127,true)
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class PictureSpaceRow(id: Int, parentId: Int = 0, name: String, status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching PictureSpaceRow objects using plain SQL queries */
  implicit def GetResultPictureSpaceRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte], e3: GR[java.sql.Timestamp]): GR[PictureSpaceRow] = GR{
    prs => import prs._
    PictureSpaceRow.tupled((<<[Int], <<[Int], <<[String], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table picture_space. Objects of this class serve as prototypes for rows in queries. */
  class PictureSpace(_tableTag: Tag) extends Table[PictureSpaceRow](_tableTag, "picture_space") {
    def * = (id, parentId, name, status, createTime, updateTime) <> (PictureSpaceRow.tupled, PictureSpaceRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(parentId), Rep.Some(name), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> PictureSpaceRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column parent_id SqlType(INT), Default(0) */
    val parentId: Rep[Int] = column[Int]("parent_id", O.Default(0))
    /** Database column name SqlType(VARCHAR), Length(127,true) */
    val name: Rep[String] = column[String]("name", O.Length(127,varying=true))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table PictureSpace */
  lazy val PictureSpace = new TableQuery(tag => new PictureSpace(tag))

  /** Row type of table Product */
  type ProductRow = HCons[Int,HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[Int],HCons[Option[String],HCons[Option[String],HCons[Option[Int],HCons[Option[Int],HCons[Option[Int],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[Int],HCons[Option[String],HCons[Option[java.sql.Timestamp],HCons[Option[java.sql.Timestamp],HCons[Option[String],HCons[Option[String],HCons[Option[Int],HCons[Option[java.sql.Timestamp],HCons[Option[java.sql.Timestamp],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HCons[Option[String],HNil]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  /** Constructor for ProductRow providing default values if available in the database schema. */
  def ProductRow(id: Int, title: Option[String] = None, teamNo: Option[String] = None, pfunction: Option[String] = None, teamType: Option[String] = None, productFeatures: Option[String] = None, pcomposition: Option[String] = None, passengerInfo: Option[Int] = None, promise: Option[String] = None, productTopic: Option[String] = None, day: Option[Int] = None, night: Option[Int] = None, advanceDay: Option[Int] = None, advanceDayType: Option[String] = None, departure: Option[String] = None, arrive: Option[String] = None, arriveType: Option[String] = None, freeTripToTraffic: Option[String] = None, freeTripBackTraffic: Option[String] = None, image: Option[String] = None, recommendation: Option[String] = None, feature: Option[String] = None, visa: Option[String] = None, feeInclude: Option[String] = None, feeExclude: Option[String] = None, attention: Option[String] = None, tip: Option[String] = None, payway: Option[String] = None, servicePhone: Option[String] = None, isTaocan: Option[String] = None, taocanAdultCount: Option[String] = None, taocanChildCount: Option[String] = None, taocanRoomCount: Option[String] = None, groupMethod: Option[String] = None, assembly: Option[String] = None, refundDesc: Option[String] = None, refundId: Option[Int] = None, offlineType: Option[String] = None, offlineStartDate: Option[java.sql.Timestamp] = None, offlineEndDate: Option[java.sql.Timestamp] = None, scheduleDays: Option[String] = None, isTransparentTrip: Option[String] = None, status: Option[Int] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None, cruiseRouteCode: Option[String] = None, cruiseCode: Option[String] = None, cruiseDeparture: Option[String] = None, viaPort: Option[String] = None, systemType: Option[String] = Some(""), customType: Option[String] = Some("")): ProductRow = {
    id :: title :: teamNo :: pfunction :: teamType :: productFeatures :: pcomposition :: passengerInfo :: promise :: productTopic :: day :: night :: advanceDay :: advanceDayType :: departure :: arrive :: arriveType :: freeTripToTraffic :: freeTripBackTraffic :: image :: recommendation :: feature :: visa :: feeInclude :: feeExclude :: attention :: tip :: payway :: servicePhone :: isTaocan :: taocanAdultCount :: taocanChildCount :: taocanRoomCount :: groupMethod :: assembly :: refundDesc :: refundId :: offlineType :: offlineStartDate :: offlineEndDate :: scheduleDays :: isTransparentTrip :: status :: createTime :: updateTime :: cruiseRouteCode :: cruiseCode :: cruiseDeparture :: viaPort :: systemType :: customType :: HNil
  }
  /** GetResult implicit for fetching ProductRow objects using plain SQL queries */
  implicit def GetResultProductRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[Option[Int]], e3: GR[Option[java.sql.Timestamp]]): GR[ProductRow] = GR{
    prs => import prs._
    <<[Int] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[Int] :: <<?[Int] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[String] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: HNil
  }
  /** Table description of table product. Objects of this class serve as prototypes for rows in queries. */
  class Product(_tableTag: Tag) extends Table[ProductRow](_tableTag, "product") {
    def * = id :: title :: teamNo :: pfunction :: teamType :: productFeatures :: pcomposition :: passengerInfo :: promise :: productTopic :: day :: night :: advanceDay :: advanceDayType :: departure :: arrive :: arriveType :: freeTripToTraffic :: freeTripBackTraffic :: image :: recommendation :: feature :: visa :: feeInclude :: feeExclude :: attention :: tip :: payway :: servicePhone :: isTaocan :: taocanAdultCount :: taocanChildCount :: taocanRoomCount :: groupMethod :: assembly :: refundDesc :: refundId :: offlineType :: offlineStartDate :: offlineEndDate :: scheduleDays :: isTransparentTrip :: status :: createTime :: updateTime :: cruiseRouteCode :: cruiseCode :: cruiseDeparture :: viaPort :: systemType :: customType :: HNil

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column title SqlType(VARCHAR), Length(255,true), Default(None) */
    val title: Rep[Option[String]] = column[Option[String]]("title", O.Length(255,varying=true), O.Default(None))
    /** Database column team_no SqlType(VARCHAR), Length(255,true), Default(None) */
    val teamNo: Rep[Option[String]] = column[Option[String]]("team_no", O.Length(255,varying=true), O.Default(None))
    /** Database column pfunction SqlType(VARCHAR), Length(255,true), Default(None) */
    val pfunction: Rep[Option[String]] = column[Option[String]]("pfunction", O.Length(255,varying=true), O.Default(None))
    /** Database column team_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val teamType: Rep[Option[String]] = column[Option[String]]("team_type", O.Length(255,varying=true), O.Default(None))
    /** Database column product_features SqlType(VARCHAR), Length(255,true), Default(None) */
    val productFeatures: Rep[Option[String]] = column[Option[String]]("product_features", O.Length(255,varying=true), O.Default(None))
    /** Database column pcomposition SqlType(VARCHAR), Length(255,true), Default(None) */
    val pcomposition: Rep[Option[String]] = column[Option[String]]("pcomposition", O.Length(255,varying=true), O.Default(None))
    /** Database column passenger_info SqlType(INT), Default(None) */
    val passengerInfo: Rep[Option[Int]] = column[Option[Int]]("passenger_info", O.Default(None))
    /** Database column promise SqlType(VARCHAR), Length(255,true), Default(None) */
    val promise: Rep[Option[String]] = column[Option[String]]("promise", O.Length(255,varying=true), O.Default(None))
    /** Database column product_topic SqlType(VARCHAR), Length(255,true), Default(None) */
    val productTopic: Rep[Option[String]] = column[Option[String]]("product_topic", O.Length(255,varying=true), O.Default(None))
    /** Database column day SqlType(INT), Default(None) */
    val day: Rep[Option[Int]] = column[Option[Int]]("day", O.Default(None))
    /** Database column night SqlType(INT), Default(None) */
    val night: Rep[Option[Int]] = column[Option[Int]]("night", O.Default(None))
    /** Database column advance_day SqlType(INT), Default(None) */
    val advanceDay: Rep[Option[Int]] = column[Option[Int]]("advance_day", O.Default(None))
    /** Database column advance_day_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val advanceDayType: Rep[Option[String]] = column[Option[String]]("advance_day_type", O.Length(255,varying=true), O.Default(None))
    /** Database column departure SqlType(VARCHAR), Length(255,true), Default(None) */
    val departure: Rep[Option[String]] = column[Option[String]]("departure", O.Length(255,varying=true), O.Default(None))
    /** Database column arrive SqlType(VARCHAR), Length(255,true), Default(None) */
    val arrive: Rep[Option[String]] = column[Option[String]]("arrive", O.Length(255,varying=true), O.Default(None))
    /** Database column arrive_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val arriveType: Rep[Option[String]] = column[Option[String]]("arrive_type", O.Length(255,varying=true), O.Default(None))
    /** Database column free_trip_to_traffic SqlType(VARCHAR), Length(255,true), Default(None) */
    val freeTripToTraffic: Rep[Option[String]] = column[Option[String]]("free_trip_to_traffic", O.Length(255,varying=true), O.Default(None))
    /** Database column free_trip_back_traffic SqlType(VARCHAR), Length(255,true), Default(None) */
    val freeTripBackTraffic: Rep[Option[String]] = column[Option[String]]("free_trip_back_traffic", O.Length(255,varying=true), O.Default(None))
    /** Database column image SqlType(TEXT), Default(None) */
    val image: Rep[Option[String]] = column[Option[String]]("image", O.Default(None))
    /** Database column recommendation SqlType(TEXT), Default(None) */
    val recommendation: Rep[Option[String]] = column[Option[String]]("recommendation", O.Default(None))
    /** Database column feature SqlType(VARCHAR), Length(255,true), Default(None) */
    val feature: Rep[Option[String]] = column[Option[String]]("feature", O.Length(255,varying=true), O.Default(None))
    /** Database column visa SqlType(VARCHAR), Length(255,true), Default(None) */
    val visa: Rep[Option[String]] = column[Option[String]]("visa", O.Length(255,varying=true), O.Default(None))
    /** Database column fee_include SqlType(VARCHAR), Length(255,true), Default(None) */
    val feeInclude: Rep[Option[String]] = column[Option[String]]("fee_include", O.Length(255,varying=true), O.Default(None))
    /** Database column fee_exclude SqlType(VARCHAR), Length(255,true), Default(None) */
    val feeExclude: Rep[Option[String]] = column[Option[String]]("fee_exclude", O.Length(255,varying=true), O.Default(None))
    /** Database column attention SqlType(VARCHAR), Length(255,true), Default(None) */
    val attention: Rep[Option[String]] = column[Option[String]]("attention", O.Length(255,varying=true), O.Default(None))
    /** Database column tip SqlType(VARCHAR), Length(255,true), Default(None) */
    val tip: Rep[Option[String]] = column[Option[String]]("tip", O.Length(255,varying=true), O.Default(None))
    /** Database column payway SqlType(VARCHAR), Length(255,true), Default(None) */
    val payway: Rep[Option[String]] = column[Option[String]]("payway", O.Length(255,varying=true), O.Default(None))
    /** Database column service_phone SqlType(VARCHAR), Length(255,true), Default(None) */
    val servicePhone: Rep[Option[String]] = column[Option[String]]("service_phone", O.Length(255,varying=true), O.Default(None))
    /** Database column is_taocan SqlType(VARCHAR), Length(255,true), Default(None) */
    val isTaocan: Rep[Option[String]] = column[Option[String]]("is_taocan", O.Length(255,varying=true), O.Default(None))
    /** Database column taocan_adult_count SqlType(VARCHAR), Length(255,true), Default(None) */
    val taocanAdultCount: Rep[Option[String]] = column[Option[String]]("taocan_adult_count", O.Length(255,varying=true), O.Default(None))
    /** Database column taocan_child_count SqlType(VARCHAR), Length(255,true), Default(None) */
    val taocanChildCount: Rep[Option[String]] = column[Option[String]]("taocan_child_count", O.Length(255,varying=true), O.Default(None))
    /** Database column taocan_room_count SqlType(VARCHAR), Length(255,true), Default(None) */
    val taocanRoomCount: Rep[Option[String]] = column[Option[String]]("taocan_room_count", O.Length(255,varying=true), O.Default(None))
    /** Database column group_method SqlType(VARCHAR), Length(255,true), Default(None) */
    val groupMethod: Rep[Option[String]] = column[Option[String]]("group_method", O.Length(255,varying=true), O.Default(None))
    /** Database column assembly SqlType(VARCHAR), Length(255,true), Default(None) */
    val assembly: Rep[Option[String]] = column[Option[String]]("assembly", O.Length(255,varying=true), O.Default(None))
    /** Database column refund_desc SqlType(VARCHAR), Length(255,true), Default(None) */
    val refundDesc: Rep[Option[String]] = column[Option[String]]("refund_desc", O.Length(255,varying=true), O.Default(None))
    /** Database column refund_Id SqlType(INT), Default(None) */
    val refundId: Rep[Option[Int]] = column[Option[Int]]("refund_Id", O.Default(None))
    /** Database column offline_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val offlineType: Rep[Option[String]] = column[Option[String]]("offline_type", O.Length(255,varying=true), O.Default(None))
    /** Database column offline_start_date SqlType(DATETIME), Default(None) */
    val offlineStartDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("offline_start_date", O.Default(None))
    /** Database column offline_end_date SqlType(DATETIME), Default(None) */
    val offlineEndDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("offline_end_date", O.Default(None))
    /** Database column schedule_days SqlType(TEXT), Default(None) */
    val scheduleDays: Rep[Option[String]] = column[Option[String]]("schedule_days", O.Default(None))
    /** Database column is_transparent_trip SqlType(VARCHAR), Length(255,true), Default(None) */
    val isTransparentTrip: Rep[Option[String]] = column[Option[String]]("is_transparent_trip", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(INT), Default(None) */
    val status: Rep[Option[Int]] = column[Option[Int]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
    /** Database column cruise_route_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseRouteCode: Rep[Option[String]] = column[Option[String]]("cruise_route_code", O.Length(255,varying=true), O.Default(None))
    /** Database column cruise_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseCode: Rep[Option[String]] = column[Option[String]]("cruise_code", O.Length(255,varying=true), O.Default(None))
    /** Database column cruise_departure SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseDeparture: Rep[Option[String]] = column[Option[String]]("cruise_departure", O.Length(255,varying=true), O.Default(None))
    /** Database column via_port SqlType(VARCHAR), Length(255,true), Default(None) */
    val viaPort: Rep[Option[String]] = column[Option[String]]("via_port", O.Length(255,varying=true), O.Default(None))
    /** Database column system_type SqlType(VARCHAR), Length(255,true), Default(Some()) */
    val systemType: Rep[Option[String]] = column[Option[String]]("system_type", O.Length(255,varying=true), O.Default(Some("")))
    /** Database column custom_type SqlType(VARCHAR), Length(255,true), Default(Some()) */
    val customType: Rep[Option[String]] = column[Option[String]]("custom_type", O.Length(255,varying=true), O.Default(Some("")))
  }
  /** Collection-like TableQuery object for table Product */
  lazy val Product = new TableQuery(tag => new Product(tag))

  /** Entity class storing rows of table ProductCruiseHouse
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(INT), Default(None)
   *  @param uniqueNum Database column unique_num SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param houseCode Database column house_code SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param englishName Database column english_name SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param minPeople Database column min_people SqlType(INT), Default(None)
   *  @param maxPeople Database column max_people SqlType(INT), Default(None)
   *  @param minArea Database column min_area SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param maxArea Database column max_area SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param windowType Database column window_type SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param floor Database column floor SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param descCode Database column desc_code SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param description Database column description SqlType(TEXT), Default(None)
   *  @param image Database column image SqlType(TEXT), Default(None)
   *  @param guestTreatment Database column guest_treatment SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param onlineStatus Database column online_status SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class ProductCruiseHouseRow(id: Int, productId: Option[Int] = None, uniqueNum: Option[String] = None, houseCode: Option[String] = None, name: Option[String] = None, englishName: Option[String] = None, minPeople: Option[Int] = None, maxPeople: Option[Int] = None, minArea: Option[String] = None, maxArea: Option[String] = None, windowType: Option[String] = None, floor: Option[String] = None, descCode: Option[String] = None, description: Option[String] = None, image: Option[String] = None, guestTreatment: Option[String] = None, onlineStatus: Option[String] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching ProductCruiseHouseRow objects using plain SQL queries */
  implicit def GetResultProductCruiseHouseRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[String]], e3: GR[Option[Long]], e4: GR[Option[java.sql.Timestamp]]): GR[ProductCruiseHouseRow] = GR{
    prs => import prs._
    ProductCruiseHouseRow.tupled((<<[Int], <<?[Int], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Int], <<?[Int], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table product_cruise_house. Objects of this class serve as prototypes for rows in queries. */
  class ProductCruiseHouse(_tableTag: Tag) extends Table[ProductCruiseHouseRow](_tableTag, "product_cruise_house") {
    def * = (id, productId, uniqueNum, houseCode, name, englishName, minPeople, maxPeople, minArea, maxArea, windowType, floor, descCode, description, image, guestTreatment, onlineStatus, status, createTime, updateTime) <> (ProductCruiseHouseRow.tupled, ProductCruiseHouseRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), productId, uniqueNum, houseCode, name, englishName, minPeople, maxPeople, minArea, maxArea, windowType, floor, descCode, description, image, guestTreatment, onlineStatus, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> ProductCruiseHouseRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT), Default(None) */
    val productId: Rep[Option[Int]] = column[Option[Int]]("product_id", O.Default(None))
    /** Database column unique_num SqlType(VARCHAR), Length(255,true), Default(None) */
    val uniqueNum: Rep[Option[String]] = column[Option[String]]("unique_num", O.Length(255,varying=true), O.Default(None))
    /** Database column house_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val houseCode: Rep[Option[String]] = column[Option[String]]("house_code", O.Length(255,varying=true), O.Default(None))
    /** Database column name SqlType(VARCHAR), Length(255,true), Default(None) */
    val name: Rep[Option[String]] = column[Option[String]]("name", O.Length(255,varying=true), O.Default(None))
    /** Database column english_name SqlType(VARCHAR), Length(255,true), Default(None) */
    val englishName: Rep[Option[String]] = column[Option[String]]("english_name", O.Length(255,varying=true), O.Default(None))
    /** Database column min_people SqlType(INT), Default(None) */
    val minPeople: Rep[Option[Int]] = column[Option[Int]]("min_people", O.Default(None))
    /** Database column max_people SqlType(INT), Default(None) */
    val maxPeople: Rep[Option[Int]] = column[Option[Int]]("max_people", O.Default(None))
    /** Database column min_area SqlType(VARCHAR), Length(255,true), Default(None) */
    val minArea: Rep[Option[String]] = column[Option[String]]("min_area", O.Length(255,varying=true), O.Default(None))
    /** Database column max_area SqlType(VARCHAR), Length(255,true), Default(None) */
    val maxArea: Rep[Option[String]] = column[Option[String]]("max_area", O.Length(255,varying=true), O.Default(None))
    /** Database column window_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val windowType: Rep[Option[String]] = column[Option[String]]("window_type", O.Length(255,varying=true), O.Default(None))
    /** Database column floor SqlType(VARCHAR), Length(255,true), Default(None) */
    val floor: Rep[Option[String]] = column[Option[String]]("floor", O.Length(255,varying=true), O.Default(None))
    /** Database column desc_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val descCode: Rep[Option[String]] = column[Option[String]]("desc_code", O.Length(255,varying=true), O.Default(None))
    /** Database column description SqlType(TEXT), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Default(None))
    /** Database column image SqlType(TEXT), Default(None) */
    val image: Rep[Option[String]] = column[Option[String]]("image", O.Default(None))
    /** Database column guest_treatment SqlType(VARCHAR), Length(255,true), Default(None) */
    val guestTreatment: Rep[Option[String]] = column[Option[String]]("guest_treatment", O.Length(255,varying=true), O.Default(None))
    /** Database column online_status SqlType(VARCHAR), Length(255,true), Default(None) */
    val onlineStatus: Rep[Option[String]] = column[Option[String]]("online_status", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductCruiseHouse */
  lazy val ProductCruiseHouse = new TableQuery(tag => new ProductCruiseHouse(tag))

  /** Entity class storing rows of table ProductExt
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(INT), Default(None)
   *  @param feature Database column feature SqlType(TEXT), Default(None)
   *  @param gatherTime Database column gather_time SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param gatherSpot Database column gather_spot SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param assembly Database column assembly SqlType(TEXT), Default(None)
   *  @param toBackTraffic Database column to_back_traffic SqlType(TEXT), Default(None)
   *  @param spotInfo Database column spot_info SqlType(TEXT), Default(None)
   *  @param hotelInfo Database column hotel_info SqlType(TEXT), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class ProductExtRow(id: Int, productId: Option[Int] = None, feature: Option[String] = None, gatherTime: Option[String] = None, gatherSpot: Option[String] = None, assembly: Option[String] = None, toBackTraffic: Option[String] = None, spotInfo: Option[String] = None, hotelInfo: Option[String] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching ProductExtRow objects using plain SQL queries */
  implicit def GetResultProductExtRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[String]], e3: GR[Option[Long]], e4: GR[Option[java.sql.Timestamp]]): GR[ProductExtRow] = GR{
    prs => import prs._
    ProductExtRow.tupled((<<[Int], <<?[Int], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table product_ext. Objects of this class serve as prototypes for rows in queries. */
  class ProductExt(_tableTag: Tag) extends Table[ProductExtRow](_tableTag, "product_ext") {
    def * = (id, productId, feature, gatherTime, gatherSpot, assembly, toBackTraffic, spotInfo, hotelInfo, status, createTime, updateTime) <> (ProductExtRow.tupled, ProductExtRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), productId, feature, gatherTime, gatherSpot, assembly, toBackTraffic, spotInfo, hotelInfo, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> ProductExtRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT), Default(None) */
    val productId: Rep[Option[Int]] = column[Option[Int]]("product_id", O.Default(None))
    /** Database column feature SqlType(TEXT), Default(None) */
    val feature: Rep[Option[String]] = column[Option[String]]("feature", O.Default(None))
    /** Database column gather_time SqlType(VARCHAR), Length(255,true), Default(None) */
    val gatherTime: Rep[Option[String]] = column[Option[String]]("gather_time", O.Length(255,varying=true), O.Default(None))
    /** Database column gather_spot SqlType(VARCHAR), Length(255,true), Default(None) */
    val gatherSpot: Rep[Option[String]] = column[Option[String]]("gather_spot", O.Length(255,varying=true), O.Default(None))
    /** Database column assembly SqlType(TEXT), Default(None) */
    val assembly: Rep[Option[String]] = column[Option[String]]("assembly", O.Default(None))
    /** Database column to_back_traffic SqlType(TEXT), Default(None) */
    val toBackTraffic: Rep[Option[String]] = column[Option[String]]("to_back_traffic", O.Default(None))
    /** Database column spot_info SqlType(TEXT), Default(None) */
    val spotInfo: Rep[Option[String]] = column[Option[String]]("spot_info", O.Default(None))
    /** Database column hotel_info SqlType(TEXT), Default(None) */
    val hotelInfo: Rep[Option[String]] = column[Option[String]]("hotel_info", O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductExt */
  lazy val ProductExt = new TableQuery(tag => new ProductExt(tag))

  /** Entity class storing rows of table ProductOther
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(INT), Default(None)
   *  @param visa Database column visa SqlType(TEXT), Default(None)
   *  @param feeInclude Database column fee_include SqlType(TEXT), Default(None)
   *  @param feeExclude Database column fee_exclude SqlType(TEXT), Default(None)
   *  @param attention Database column attention SqlType(TEXT), Default(None)
   *  @param tip Database column tip SqlType(TEXT), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None)
   *  @param cancelChangeDes Database column cancel_change_des SqlType(TEXT), Default(None) */
  case class ProductOtherRow(id: Int, productId: Option[Int] = None, visa: Option[String] = None, feeInclude: Option[String] = None, feeExclude: Option[String] = None, attention: Option[String] = None, tip: Option[String] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None, cancelChangeDes: Option[String] = None)
  /** GetResult implicit for fetching ProductOtherRow objects using plain SQL queries */
  implicit def GetResultProductOtherRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[String]], e3: GR[Option[Long]], e4: GR[Option[java.sql.Timestamp]]): GR[ProductOtherRow] = GR{
    prs => import prs._
    ProductOtherRow.tupled((<<[Int], <<?[Int], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[String]))
  }
  /** Table description of table product_other. Objects of this class serve as prototypes for rows in queries. */
  class ProductOther(_tableTag: Tag) extends Table[ProductOtherRow](_tableTag, "product_other") {
    def * = (id, productId, visa, feeInclude, feeExclude, attention, tip, status, createTime, updateTime, cancelChangeDes) <> (ProductOtherRow.tupled, ProductOtherRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), productId, visa, feeInclude, feeExclude, attention, tip, status, createTime, updateTime, cancelChangeDes).shaped.<>({r=>import r._; _1.map(_=> ProductOtherRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT), Default(None) */
    val productId: Rep[Option[Int]] = column[Option[Int]]("product_id", O.Default(None))
    /** Database column visa SqlType(TEXT), Default(None) */
    val visa: Rep[Option[String]] = column[Option[String]]("visa", O.Default(None))
    /** Database column fee_include SqlType(TEXT), Default(None) */
    val feeInclude: Rep[Option[String]] = column[Option[String]]("fee_include", O.Default(None))
    /** Database column fee_exclude SqlType(TEXT), Default(None) */
    val feeExclude: Rep[Option[String]] = column[Option[String]]("fee_exclude", O.Default(None))
    /** Database column attention SqlType(TEXT), Default(None) */
    val attention: Rep[Option[String]] = column[Option[String]]("attention", O.Default(None))
    /** Database column tip SqlType(TEXT), Default(None) */
    val tip: Rep[Option[String]] = column[Option[String]]("tip", O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
    /** Database column cancel_change_des SqlType(TEXT), Default(None) */
    val cancelChangeDes: Rep[Option[String]] = column[Option[String]]("cancel_change_des", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductOther */
  lazy val ProductOther = new TableQuery(tag => new ProductOther(tag))

  /** Entity class storing rows of table ProductPriceByTeam
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(INT), Default(None)
   *  @param isTaocan Database column is_taocan SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param taocanPrice Database column taocan_price SqlType(DECIMAL), Default(None)
   *  @param qunarPrice Database column qunar_price SqlType(DECIMAL), Default(None)
   *  @param takeOffDate Database column take_off_date SqlType(DATETIME), Default(None)
   *  @param marketPrice Database column market_price SqlType(DECIMAL), Default(None)
   *  @param adultPrice Database column adult_price SqlType(DECIMAL), Default(None)
   *  @param containChildPrice Database column contain_child_price SqlType(VARCHAR), Length(10,true), Default(None)
   *  @param childPrice Database column child_price SqlType(DECIMAL), Default(None)
   *  @param childPriceDesc Database column child_price_desc SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param roomNum Database column room_num SqlType(INT), Default(None)
   *  @param roomSendPrice Database column room_send_price SqlType(DECIMAL), Default(None)
   *  @param availableCount Database column available_count SqlType(INT), Default(None)
   *  @param minBuyCount Database column min_buy_count SqlType(INT), Default(None)
   *  @param maxBuyCount Database column max_buy_count SqlType(INT), Default(None)
   *  @param priceDesc Database column price_desc SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param status Database column status SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None)
   *  @param referenceId Database column reference_id SqlType(INT), Default(None) */
  case class ProductPriceByTeamRow(id: Int, productId: Option[Int] = None, isTaocan: Option[String] = None, taocanPrice: Option[scala.math.BigDecimal] = None, qunarPrice: Option[scala.math.BigDecimal] = None, takeOffDate: Option[java.sql.Timestamp] = None, marketPrice: Option[scala.math.BigDecimal] = None, adultPrice: Option[scala.math.BigDecimal] = None, containChildPrice: Option[String] = None, childPrice: Option[scala.math.BigDecimal] = None, childPriceDesc: Option[String] = None, roomNum: Option[Int] = None, roomSendPrice: Option[scala.math.BigDecimal] = None, availableCount: Option[Int] = None, minBuyCount: Option[Int] = None, maxBuyCount: Option[Int] = None, priceDesc: Option[String] = None, status: Option[String] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None, referenceId: Option[Int] = None)
  /** GetResult implicit for fetching ProductPriceByTeamRow objects using plain SQL queries */
  implicit def GetResultProductPriceByTeamRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[String]], e3: GR[Option[scala.math.BigDecimal]], e4: GR[Option[java.sql.Timestamp]]): GR[ProductPriceByTeamRow] = GR{
    prs => import prs._
    ProductPriceByTeamRow.tupled((<<[Int], <<?[Int], <<?[String], <<?[scala.math.BigDecimal], <<?[scala.math.BigDecimal], <<?[java.sql.Timestamp], <<?[scala.math.BigDecimal], <<?[scala.math.BigDecimal], <<?[String], <<?[scala.math.BigDecimal], <<?[String], <<?[Int], <<?[scala.math.BigDecimal], <<?[Int], <<?[Int], <<?[Int], <<?[String], <<?[String], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[Int]))
  }
  /** Table description of table product_price_by_team. Objects of this class serve as prototypes for rows in queries. */
  class ProductPriceByTeam(_tableTag: Tag) extends Table[ProductPriceByTeamRow](_tableTag, "product_price_by_team") {
    def * = (id, productId, isTaocan, taocanPrice, qunarPrice, takeOffDate, marketPrice, adultPrice, containChildPrice, childPrice, childPriceDesc, roomNum, roomSendPrice, availableCount, minBuyCount, maxBuyCount, priceDesc, status, createTime, updateTime, referenceId) <> (ProductPriceByTeamRow.tupled, ProductPriceByTeamRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), productId, isTaocan, taocanPrice, qunarPrice, takeOffDate, marketPrice, adultPrice, containChildPrice, childPrice, childPriceDesc, roomNum, roomSendPrice, availableCount, minBuyCount, maxBuyCount, priceDesc, status, createTime, updateTime, referenceId).shaped.<>({r=>import r._; _1.map(_=> ProductPriceByTeamRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT), Default(None) */
    val productId: Rep[Option[Int]] = column[Option[Int]]("product_id", O.Default(None))
    /** Database column is_taocan SqlType(VARCHAR), Length(255,true), Default(None) */
    val isTaocan: Rep[Option[String]] = column[Option[String]]("is_taocan", O.Length(255,varying=true), O.Default(None))
    /** Database column taocan_price SqlType(DECIMAL), Default(None) */
    val taocanPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("taocan_price", O.Default(None))
    /** Database column qunar_price SqlType(DECIMAL), Default(None) */
    val qunarPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("qunar_price", O.Default(None))
    /** Database column take_off_date SqlType(DATETIME), Default(None) */
    val takeOffDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("take_off_date", O.Default(None))
    /** Database column market_price SqlType(DECIMAL), Default(None) */
    val marketPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("market_price", O.Default(None))
    /** Database column adult_price SqlType(DECIMAL), Default(None) */
    val adultPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("adult_price", O.Default(None))
    /** Database column contain_child_price SqlType(VARCHAR), Length(10,true), Default(None) */
    val containChildPrice: Rep[Option[String]] = column[Option[String]]("contain_child_price", O.Length(10,varying=true), O.Default(None))
    /** Database column child_price SqlType(DECIMAL), Default(None) */
    val childPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("child_price", O.Default(None))
    /** Database column child_price_desc SqlType(VARCHAR), Length(255,true), Default(None) */
    val childPriceDesc: Rep[Option[String]] = column[Option[String]]("child_price_desc", O.Length(255,varying=true), O.Default(None))
    /** Database column room_num SqlType(INT), Default(None) */
    val roomNum: Rep[Option[Int]] = column[Option[Int]]("room_num", O.Default(None))
    /** Database column room_send_price SqlType(DECIMAL), Default(None) */
    val roomSendPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("room_send_price", O.Default(None))
    /** Database column available_count SqlType(INT), Default(None) */
    val availableCount: Rep[Option[Int]] = column[Option[Int]]("available_count", O.Default(None))
    /** Database column min_buy_count SqlType(INT), Default(None) */
    val minBuyCount: Rep[Option[Int]] = column[Option[Int]]("min_buy_count", O.Default(None))
    /** Database column max_buy_count SqlType(INT), Default(None) */
    val maxBuyCount: Rep[Option[Int]] = column[Option[Int]]("max_buy_count", O.Default(None))
    /** Database column price_desc SqlType(VARCHAR), Length(255,true), Default(None) */
    val priceDesc: Rep[Option[String]] = column[Option[String]]("price_desc", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(VARCHAR), Length(255,true), Default(None) */
    val status: Rep[Option[String]] = column[Option[String]]("status", O.Length(255,varying=true), O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
    /** Database column reference_id SqlType(INT), Default(None) */
    val referenceId: Rep[Option[Int]] = column[Option[Int]]("reference_id", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductPriceByTeam */
  lazy val ProductPriceByTeam = new TableQuery(tag => new ProductPriceByTeam(tag))

  /** Row type of table ProductPriceByType */
  type ProductPriceByTypeRow = HCons[Int,HCons[Option[Int],HCons[Option[String],HCons[Option[Long],HCons[Option[scala.math.BigDecimal],HCons[Option[String],HCons[Option[String],HCons[Option[java.sql.Timestamp],HCons[Option[java.sql.Timestamp],HCons[Option[scala.math.BigDecimal],HCons[Option[scala.math.BigDecimal],HCons[Option[scala.math.BigDecimal],HCons[Option[scala.math.BigDecimal],HCons[Option[Int],HCons[Option[scala.math.BigDecimal],HCons[Option[Int],HCons[Option[Int],HCons[Option[Int],HCons[Option[String],HCons[Option[String],HCons[Option[Long],HCons[Option[java.sql.Timestamp],HCons[Option[java.sql.Timestamp],HNil]]]]]]]]]]]]]]]]]]]]]]]
  /** Constructor for ProductPriceByTypeRow providing default values if available in the database schema. */
  def ProductPriceByTypeRow(id: Int, productId: Option[Int] = None, title: Option[String] = None, isTaocan: Option[Long] = None, taocanPrice: Option[scala.math.BigDecimal] = None, priceType: Option[String] = None, accurateDayOfWeek: Option[String] = None, beginDate: Option[java.sql.Timestamp] = None, endDate: Option[java.sql.Timestamp] = None, marketPrice: Option[scala.math.BigDecimal] = None, adultPrice: Option[scala.math.BigDecimal] = None, containChildPrice: Option[scala.math.BigDecimal] = None, childPrice: Option[scala.math.BigDecimal] = None, roomNum: Option[Int] = None, romSendPrice: Option[scala.math.BigDecimal] = None, availableCount: Option[Int] = None, minBuyCount: Option[Int] = None, maxBuyCount: Option[Int] = None, feeDescription: Option[String] = None, usedDescription: Option[String] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None): ProductPriceByTypeRow = {
    id :: productId :: title :: isTaocan :: taocanPrice :: priceType :: accurateDayOfWeek :: beginDate :: endDate :: marketPrice :: adultPrice :: containChildPrice :: childPrice :: roomNum :: romSendPrice :: availableCount :: minBuyCount :: maxBuyCount :: feeDescription :: usedDescription :: status :: createTime :: updateTime :: HNil
  }
  /** GetResult implicit for fetching ProductPriceByTypeRow objects using plain SQL queries */
  implicit def GetResultProductPriceByTypeRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[String]], e3: GR[Option[Long]], e4: GR[Option[scala.math.BigDecimal]], e5: GR[Option[java.sql.Timestamp]]): GR[ProductPriceByTypeRow] = GR{
    prs => import prs._
    <<[Int] :: <<?[Int] :: <<?[String] :: <<?[Long] :: <<?[scala.math.BigDecimal] :: <<?[String] :: <<?[String] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: <<?[scala.math.BigDecimal] :: <<?[scala.math.BigDecimal] :: <<?[scala.math.BigDecimal] :: <<?[scala.math.BigDecimal] :: <<?[Int] :: <<?[scala.math.BigDecimal] :: <<?[Int] :: <<?[Int] :: <<?[Int] :: <<?[String] :: <<?[String] :: <<?[Long] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: HNil
  }
  /** Table description of table product_price_by_type. Objects of this class serve as prototypes for rows in queries. */
  class ProductPriceByType(_tableTag: Tag) extends Table[ProductPriceByTypeRow](_tableTag, "product_price_by_type") {
    def * = id :: productId :: title :: isTaocan :: taocanPrice :: priceType :: accurateDayOfWeek :: beginDate :: endDate :: marketPrice :: adultPrice :: containChildPrice :: childPrice :: roomNum :: romSendPrice :: availableCount :: minBuyCount :: maxBuyCount :: feeDescription :: usedDescription :: status :: createTime :: updateTime :: HNil

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT), Default(None) */
    val productId: Rep[Option[Int]] = column[Option[Int]]("product_id", O.Default(None))
    /** Database column title SqlType(VARCHAR), Length(255,true), Default(None) */
    val title: Rep[Option[String]] = column[Option[String]]("title", O.Length(255,varying=true), O.Default(None))
    /** Database column is_taocan SqlType(BIGINT), Default(None) */
    val isTaocan: Rep[Option[Long]] = column[Option[Long]]("is_taocan", O.Default(None))
    /** Database column taocan_price SqlType(DECIMAL), Default(None) */
    val taocanPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("taocan_price", O.Default(None))
    /** Database column price_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val priceType: Rep[Option[String]] = column[Option[String]]("price_type", O.Length(255,varying=true), O.Default(None))
    /** Database column accurate_day_of_week SqlType(VARCHAR), Length(255,true), Default(None) */
    val accurateDayOfWeek: Rep[Option[String]] = column[Option[String]]("accurate_day_of_week", O.Length(255,varying=true), O.Default(None))
    /** Database column begin_date SqlType(DATETIME), Default(None) */
    val beginDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("begin_date", O.Default(None))
    /** Database column end_date SqlType(DATETIME), Default(None) */
    val endDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("end_date", O.Default(None))
    /** Database column market_price SqlType(DECIMAL), Default(None) */
    val marketPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("market_price", O.Default(None))
    /** Database column adult_price SqlType(DECIMAL), Default(None) */
    val adultPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("adult_price", O.Default(None))
    /** Database column contain_child_price SqlType(DECIMAL), Default(None) */
    val containChildPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("contain_child_price", O.Default(None))
    /** Database column child_price SqlType(DECIMAL), Default(None) */
    val childPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("child_price", O.Default(None))
    /** Database column room_num SqlType(INT), Default(None) */
    val roomNum: Rep[Option[Int]] = column[Option[Int]]("room_num", O.Default(None))
    /** Database column rom_send_price SqlType(DECIMAL), Default(None) */
    val romSendPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("rom_send_price", O.Default(None))
    /** Database column available_count SqlType(INT), Default(None) */
    val availableCount: Rep[Option[Int]] = column[Option[Int]]("available_count", O.Default(None))
    /** Database column min_buy_count SqlType(INT), Default(None) */
    val minBuyCount: Rep[Option[Int]] = column[Option[Int]]("min_buy_count", O.Default(None))
    /** Database column max_buy_count SqlType(INT), Default(None) */
    val maxBuyCount: Rep[Option[Int]] = column[Option[Int]]("max_buy_count", O.Default(None))
    /** Database column fee_description SqlType(VARCHAR), Length(255,true), Default(None) */
    val feeDescription: Rep[Option[String]] = column[Option[String]]("fee_description", O.Length(255,varying=true), O.Default(None))
    /** Database column used_description SqlType(VARCHAR), Length(255,true), Default(None) */
    val usedDescription: Rep[Option[String]] = column[Option[String]]("used_description", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductPriceByType */
  lazy val ProductPriceByType = new TableQuery(tag => new ProductPriceByType(tag))

  /** Entity class storing rows of table ProductQunarSync
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(INT)
   *  @param syncStatus Database column sync_status SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param syncUrl Database column sync_url SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param syncCount Database column sync_count SqlType(INT), Default(None)
   *  @param lastSyncTime Database column last_sync_time SqlType(DATETIME), Default(None)
   *  @param status Database column status SqlType(BIGINT), Default(None)
   *  @param createTime Database column create_time SqlType(DATETIME), Default(None)
   *  @param updateTime Database column update_time SqlType(DATETIME), Default(None) */
  case class ProductQunarSyncRow(id: Int, productId: Int, syncStatus: Option[String] = None, syncUrl: Option[String] = None, syncCount: Option[Int] = None, lastSyncTime: Option[java.sql.Timestamp] = None, status: Option[Long] = None, createTime: Option[java.sql.Timestamp] = None, updateTime: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching ProductQunarSyncRow objects using plain SQL queries */
  implicit def GetResultProductQunarSyncRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[Option[Int]], e3: GR[Option[java.sql.Timestamp]], e4: GR[Option[Long]]): GR[ProductQunarSyncRow] = GR{
    prs => import prs._
    ProductQunarSyncRow.tupled((<<[Int], <<[Int], <<?[String], <<?[String], <<?[Int], <<?[java.sql.Timestamp], <<?[Long], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp]))
  }
  /** Table description of table product_qunar_sync. Objects of this class serve as prototypes for rows in queries. */
  class ProductQunarSync(_tableTag: Tag) extends Table[ProductQunarSyncRow](_tableTag, "product_qunar_sync") {
    def * = (id, productId, syncStatus, syncUrl, syncCount, lastSyncTime, status, createTime, updateTime) <> (ProductQunarSyncRow.tupled, ProductQunarSyncRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(productId), syncStatus, syncUrl, syncCount, lastSyncTime, status, createTime, updateTime).shaped.<>({r=>import r._; _1.map(_=> ProductQunarSyncRow.tupled((_1.get, _2.get, _3, _4, _5, _6, _7, _8, _9)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(INT) */
    val productId: Rep[Int] = column[Int]("product_id")
    /** Database column sync_status SqlType(VARCHAR), Length(255,true), Default(None) */
    val syncStatus: Rep[Option[String]] = column[Option[String]]("sync_status", O.Length(255,varying=true), O.Default(None))
    /** Database column sync_url SqlType(VARCHAR), Length(255,true), Default(None) */
    val syncUrl: Rep[Option[String]] = column[Option[String]]("sync_url", O.Length(255,varying=true), O.Default(None))
    /** Database column sync_count SqlType(INT), Default(None) */
    val syncCount: Rep[Option[Int]] = column[Option[Int]]("sync_count", O.Default(None))
    /** Database column last_sync_time SqlType(DATETIME), Default(None) */
    val lastSyncTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("last_sync_time", O.Default(None))
    /** Database column status SqlType(BIGINT), Default(None) */
    val status: Rep[Option[Long]] = column[Option[Long]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time", O.Default(None))
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time", O.Default(None))
  }
  /** Collection-like TableQuery object for table ProductQunarSync */
  lazy val ProductQunarSync = new TableQuery(tag => new ProductQunarSync(tag))

  /** Entity class storing rows of table RoleMenu
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param menuId Database column menu_id SqlType(INT)
   *  @param roleId Database column role_id SqlType(INT), Default(0)
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class RoleMenuRow(id: Int, menuId: Int, roleId: Int = 0, status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching RoleMenuRow objects using plain SQL queries */
  implicit def GetResultRoleMenuRow(implicit e0: GR[Int], e1: GR[Byte], e2: GR[java.sql.Timestamp]): GR[RoleMenuRow] = GR{
    prs => import prs._
    RoleMenuRow.tupled((<<[Int], <<[Int], <<[Int], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table role_menu. Objects of this class serve as prototypes for rows in queries. */
  class RoleMenu(_tableTag: Tag) extends Table[RoleMenuRow](_tableTag, "role_menu") {
    def * = (id, menuId, roleId, status, createTime, updateTime) <> (RoleMenuRow.tupled, RoleMenuRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(menuId), Rep.Some(roleId), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> RoleMenuRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column menu_id SqlType(INT) */
    val menuId: Rep[Int] = column[Int]("menu_id")
    /** Database column role_id SqlType(INT), Default(0) */
    val roleId: Rep[Int] = column[Int]("role_id", O.Default(0))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table RoleMenu */
  lazy val RoleMenu = new TableQuery(tag => new RoleMenu(tag))

  /** Entity class storing rows of table SystemConstant
   *  @param id Database column id SqlType(INT), AutoInc, PrimaryKey
   *  @param constKey Database column const_key SqlType(VARCHAR), Length(255,true), Default()
   *  @param constValue Database column const_value SqlType(VARCHAR), Length(255,true), Default()
   *  @param constComment Database column const_comment SqlType(VARCHAR), Length(255,true), Default()
   *  @param constCategory Database column const_category SqlType(VARCHAR), Length(255,true), Default()
   *  @param status Database column status SqlType(TINYINT), Default(0)
   *  @param createTime Database column create_time SqlType(DATETIME)
   *  @param updateTime Database column update_time SqlType(DATETIME) */
  case class SystemConstantRow(id: Int, constKey: String = "", constValue: String = "", constComment: String = "", constCategory: String = "", status: Byte = 0, createTime: java.sql.Timestamp, updateTime: java.sql.Timestamp)
  /** GetResult implicit for fetching SystemConstantRow objects using plain SQL queries */
  implicit def GetResultSystemConstantRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Byte], e3: GR[java.sql.Timestamp]): GR[SystemConstantRow] = GR{
    prs => import prs._
    SystemConstantRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<[Byte], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  /** Table description of table system_constant. Objects of this class serve as prototypes for rows in queries. */
  class SystemConstant(_tableTag: Tag) extends Table[SystemConstantRow](_tableTag, "system_constant") {
    def * = (id, constKey, constValue, constComment, constCategory, status, createTime, updateTime) <> (SystemConstantRow.tupled, SystemConstantRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(constKey), Rep.Some(constValue), Rep.Some(constComment), Rep.Some(constCategory), Rep.Some(status), Rep.Some(createTime), Rep.Some(updateTime)).shaped.<>({r=>import r._; _1.map(_=> SystemConstantRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column const_key SqlType(VARCHAR), Length(255,true), Default() */
    val constKey: Rep[String] = column[String]("const_key", O.Length(255,varying=true), O.Default(""))
    /** Database column const_value SqlType(VARCHAR), Length(255,true), Default() */
    val constValue: Rep[String] = column[String]("const_value", O.Length(255,varying=true), O.Default(""))
    /** Database column const_comment SqlType(VARCHAR), Length(255,true), Default() */
    val constComment: Rep[String] = column[String]("const_comment", O.Length(255,varying=true), O.Default(""))
    /** Database column const_category SqlType(VARCHAR), Length(255,true), Default() */
    val constCategory: Rep[String] = column[String]("const_category", O.Length(255,varying=true), O.Default(""))
    /** Database column status SqlType(TINYINT), Default(0) */
    val status: Rep[Byte] = column[Byte]("status", O.Default(0))
    /** Database column create_time SqlType(DATETIME) */
    val createTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("create_time")
    /** Database column update_time SqlType(DATETIME) */
    val updateTime: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("update_time")
  }
  /** Collection-like TableQuery object for table SystemConstant */
  lazy val SystemConstant = new TableQuery(tag => new SystemConstant(tag))
}
