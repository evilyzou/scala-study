package com.ravel.schema


// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object DBSchema extends {
  val profile = slick.driver.MySQLDriver
} with DBSchema

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait DBSchema {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  import slick.collection.heterogeneous._
  import slick.collection.heterogeneous.syntax._
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Guide.schema, GuideInfra.schema, Infrastructure.schema, InfrastructureDesc.schema, Picture.schema, Product.schema, ProductExt.schema, ProductOther.schema, ProductPriceByTeam.schema, SystemConstant.schema).reduceLeft(_ ++ _)
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

  case class ProductInfo1(title: Option[String], teamNo: Option[String], pfunction: Option[String], teamType: Option[String], productFeatures: Option[String], pcomposition: Option[String],
                          passengerInfo: Option[Int], promise: Option[String], productTopic: Option[String], day: Option[Int], night: Option[Int], advanceDay: Option[Int], advanceDayType: Option[String])
  case class ProductInfo2(departure: Option[String], arrive: Option[String], arriveType: Option[String], freeTripToTraffic: Option[String], freeTripBackTraffic: Option[String],
                          image: Option[String], recommendation: Option[String],feature: Option[String], visa: Option[String], feeInclude: Option[String], feeExclude: Option[String], attention: Option[String],
                          tip: Option[String], payway: Option[String], servicePhone: Option[String])

  case class ProductInfo3(isTaocan: Option[String],taocanAdultCount: Option[String],  taocanChildCount: Option[String], taocanRoomCount: Option[String], groupMethod: Option[String],
                          assembly: Option[String], refundDesc: Option[String],refundId: Option[Int], offlineType: Option[String], offlineStartDate: Option[java.sql.Timestamp],
                          offlineEndDate: Option[java.sql.Timestamp], scheduleDays: Option[String])

  case class ProductInfo4(isTransparentTrip: Option[String],status: Option[Int], createTime: Option[java.sql.Timestamp], updateTime: Option[java.sql.Timestamp],
                          cruiseRouteCode: Option[String], cruiseCode: Option[String], cruiseDeparture: Option[String], viaPort: Option[String], systemType: Option[String], customType: Option[String])

  case class ProductRow(id: Int, p1: ProductInfo1, p2: ProductInfo2, p3: ProductInfo3, p4: ProductInfo4)

  /** GetResult implicit for fetching ProductRow objects using plain SQL queries */
  //  implicit def GetResultProductRow(implicit e0: GR[Int], e1: GR[Option[Option[String]]], e2: GR[Option[Int]], e3: GR[Option[java.sql.Timestamp]]): GR[ProductRow] = GR{
  //    prs => import prs._
  //    <<[Int] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[Int] :: <<?[Int] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[String] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: <<?[String] :: <<?[String] :: <<?[Int] :: <<?[java.sql.Timestamp] :: <<?[java.sql.Timestamp] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: <<?[String] :: HNil
  //  }
  /** Table description of table product. Objects of this class serve as prototypes for rows in queries. */
  class Product(_tableTag: Tag) extends Table[ProductRow](_tableTag, "product") {
    //    def * = id :: title :: teamNo :: pfunction :: teamType :: productFeatures :: pcomposition :: passengerInfo :: promise :: productTopic :: day :: night :: advanceDay :: advanceDayType :: departure :: arrive :: arriveType :: freeTripToTraffic :: freeTripBackTraffic :: image :: recommendation :: feature :: visa :: feeInclude :: feeExclude :: attention :: tip :: payway :: servicePhone :: isTaocan :: taocanAdultCount :: taocanChildCount :: taocanRoomCount :: groupMethod :: assembly :: refundDesc :: refundId :: offlineType :: offlineStartDate :: offlineEndDate :: scheduleDays :: isTransparentTrip :: status :: createTime :: updateTime :: cruiseRouteCode :: cruiseCode :: cruiseDeparture :: viaPort :: systemType :: customType :: HNil
    //    def * = id :: title :: teamNo :: pfunction :: teamType :: productFeatures :: pcomposition :: passengerInfo :: promise :: productTopic :: day :: night :: advanceDay :: advanceDayType :: departure :: arrive :: arriveType :: freeTripToTraffic :: freeTripBackTraffic :: image :: recommendation :: feature :: visa :: feeInclude :: feeExclude :: attention :: tip :: payway :: servicePhone :: isTaocan :: taocanAdultCount :: taocanChildCount :: taocanRoomCount :: groupMethod :: assembly :: refundDesc :: refundId :: offlineType :: offlineStartDate :: offlineEndDate :: scheduleDays :: isTransparentTrip :: status :: createTime :: updateTime :: cruiseRouteCode :: cruiseCode :: cruiseDeparture :: viaPort :: systemType :: customType :: HNil
    def * = (id ,
      (title , teamNo , pfunction , teamType , productFeatures , pcomposition , passengerInfo , promise , productTopic , day , night , advanceDay , advanceDayType ),
      (departure , arrive , arriveType , freeTripToTraffic , freeTripBackTraffic , image , recommendation , feature , visa , feeInclude , feeExclude , attention , tip , payway , servicePhone ),
      (isTaocan , taocanAdultCount , taocanChildCount , taocanRoomCount , groupMethod , assembly , refundDesc , refundId , offlineType , offlineStartDate , offlineEndDate , scheduleDays ),
      (isTransparentTrip , status , createTime , updateTime , cruiseRouteCode , cruiseCode , cruiseDeparture , viaPort , systemType , customType ))
      .shaped <> ({
      case (id, p1, p2, p3, p4) =>
        ProductRow(id, ProductInfo1.tupled.apply(p1), ProductInfo2.tupled.apply(p2), ProductInfo3.tupled.apply(p3), ProductInfo4.tupled.apply(p4))
    }, { p: ProductRow =>
      def f1(p1: ProductInfo1) = ProductInfo1.unapply(p1).get
      def f2(p2: ProductInfo2) = ProductInfo2.unapply(p2).get
      def f3(p3: ProductInfo3) = ProductInfo3.unapply(p3).get
      def f4(p4: ProductInfo4) = ProductInfo4.unapply(p4).get

      Some((p.id, f1(p.p1), f2(p.p2), f3(p.p3), f4(p.p4)))
    })

    /** Database column id SqlType(INT), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column title SqlType(VARCHAR), Length(255,true), Default(None) */
    val title: Rep[Option[String]] = column[Option[String]]("title", O.Length(255,varying=true))
    /** Database column team_no SqlType(VARCHAR), Length(255,true), Default(None) */
    val teamNo: Rep[Option[String]] = column[Option[String]]("team_no", O.Length(255,varying=true))
    /** Database column pfunction SqlType(VARCHAR), Length(255,true), Default(None) */
    val pfunction: Rep[Option[String]] = column[Option[String]]("pfunction", O.Length(255,varying=true))
    /** Database column team_type SqlType(VARCHAR), Length(255,true), Default(None) */
    val teamType: Rep[Option[String]] = column[Option[String]]("team_type", O.Length(255,varying=true))
    /** Database column product_features SqlType(VARCHAR), Length(255,true), Default(None) */
    val productFeatures: Rep[Option[String]] = column[Option[String]]("product_features", O.Length(255,varying=true))
    /** Database column pcomposition SqlType(VARCHAR), Length(255,true), Default(None) */
    val pcomposition: Rep[Option[String]] = column[Option[String]]("pcomposition", O.Length(255,varying=true))
    /** Database column passenger_info SqlType(INT), Default(None) */
    val passengerInfo: Rep[Option[Int]] = column[Option[Int]]("passenger_info", O.Default(None))
    /** Database column promise SqlType(VARCHAR), Length(255,true), Default(None) */
    val promise: Rep[Option[String]] = column[Option[String]]("promise", O.Length(255,varying=true))
    /** Database column product_topic SqlType(VARCHAR), Length(255,true), Default(None) */
    val productTopic: Rep[Option[String]] = column[Option[String]]("product_topic", O.Length(255,varying=true))
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
    val offlineStartDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("offline_start_date")
    /** Database column offline_end_date SqlType(DATETIME), Default(None) */
    val offlineEndDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("offline_end_date")
    /** Database column schedule_days SqlType(TEXT), Default(None) */
    val scheduleDays: Rep[Option[String]] = column[Option[String]]("schedule_days", O.Default(None))
    /** Database column is_transparent_trip SqlType(VARCHAR), Length(255,true), Default(None) */
    val isTransparentTrip: Rep[Option[String]] = column[Option[String]]("is_transparent_trip", O.Length(255,varying=true), O.Default(None))
    /** Database column status SqlType(INT), Default(None) */
    val status: Rep[Option[Int]] = column[Option[Int]]("status", O.Default(None))
    /** Database column create_time SqlType(DATETIME), Default(None) */
    val createTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("create_time")
    /** Database column update_time SqlType(DATETIME), Default(None) */
    val updateTime: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("update_time")
    /** Database column cruise_route_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseRouteCode: Rep[Option[String]] = column[Option[String]]("cruise_route_code", O.Length(255,varying=true), O.Default(None))
    /** Database column cruise_code SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseCode: Rep[Option[String]] = column[Option[String]]("cruise_code", O.Length(255,varying=true), O.Default(None))
    /** Database column cruise_departure SqlType(VARCHAR), Length(255,true), Default(None) */
    val cruiseDeparture: Rep[Option[String]] = column[Option[String]]("cruise_departure", O.Length(255,varying=true), O.Default(None))
    /** Database column via_port SqlType(VARCHAR), Length(255,true), Default(None) */
    val viaPort: Rep[Option[String]] = column[Option[String]]("via_port", O.Length(255,varying=true), O.Default(None))
    /** Database column system_type SqlType(VARCHAR), Length(255,true), Default(Some()) */
    val systemType: Rep[Option[String]] = column[Option[String]]("system_type", O.Length(255,varying=true), O.Default(None))
    /** Database column custom_type SqlType(VARCHAR), Length(255,true), Default(Some()) */
    val customType: Rep[Option[String]] = column[Option[String]]("custom_type", O.Length(255,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table Product */
  lazy val Product = new TableQuery(tag => new Product(tag))

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
