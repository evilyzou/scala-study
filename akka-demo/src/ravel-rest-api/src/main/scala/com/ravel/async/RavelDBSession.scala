package com.ravel.async

import scalikejdbc.GlobalSettings._
import scalikejdbc._

import scala.collection.mutable.LinkedHashMap
import scala.concurrent.{ExecutionContextExecutor, Future}
import RavelGlobal._

/**
 * Created by CloudZou on 12/29/2016.
 */
trait RavelDBSession extends LogSupport {

  val connection: RavelConnection

  def execute(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Boolean] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rowsAffected.exists(_ > 0)
      }
    }
  }

  def update(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Int] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)
      if (connection.isShared) {
        // create local transaction because postgresql-async 0.2.4 seems not to be stable with PostgreSQL without transaction
        connection.toNonSharedConnection().flatMap { conn =>
          RavelTx.inTransaction(TxRavelDBSession(conn), (tx: TxRavelDBSession) => tx.update(statement, _parameters: _*))
        }
      } else {
        connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
          result.rowsAffected.map(_.toInt).getOrElse(0)
        }
      }
    }
  }

  def updateAndReturnGeneratedKey(statement: String, parameters: Any*)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Long] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)
      connection.toNonSharedConnection().flatMap { conn =>
        RavelTx.inTransaction(TxRavelDBSession(conn), (tx: TxRavelDBSession) =>
          tx.connection.sendPreparedStatement(statement, _parameters: _*).flatMap { result =>
            result.generatedKey.map(_.getOrElse {
              throw new IllegalArgumentException(ErrorMessage.FAILED_TO_RETRIEVE_GENERATED_KEY + " SQL: '" + statement + "'")
            })
          })
      }
    }
  }

  def traversable[A](statement: String, parameters: Any*)(extractor: WrappedResultSet => A)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[Traversable[A]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).map(rs => extractor(rs))
        }.getOrElse(Nil)
      }
    }
  }

  def single[A](statement: String, parameters: Any*)(extractor: WrappedResultSet => A)(
    implicit
    executor: ExecutionContextExecutor = ECGlobal
    ): Future[Option[A]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    traversable(statement, _parameters: _*)(extractor).map { results =>
      results match {
        case Nil => None
        case one :: Nil => Option(one)
        case _ => throw TooManyRowsException(1, results.size)
      }
    }
  }

  def list[A](statement: String, parameters: Any*)(extractor: WrappedResultSet => A)(implicit executor: ExecutionContextExecutor = ECGlobal): Future[List[A]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    (traversable[A](statement, _parameters: _*)(extractor)).map(_.toList)
  }

  def oneToOneTraversable[A, B, Z](statement: String, parameters: Any*)(extractOne: (WrappedResultSet) => A)(extractTo: (WrappedResultSet) => Option[B])(transform: (A, B) => Z)(
    implicit
    executor: ExecutionContextExecutor = ECGlobal
    ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(oneToOne: (LinkedHashMap[A, Option[B]]), rs: WrappedResultSet): LinkedHashMap[A, Option[B]] = {
        val o = extractOne(rs)
        oneToOne.keys.find(_ == o) match {
          case Some(_) => throw IllegalRelationshipException(ErrorMessage.INVALID_ONE_TO_ONE_RELATION)
          case _ => oneToOne += (o -> extractTo(rs))
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(LinkedHashMap[A, Option[B]]())(processResultSet).map {
            case (one, Some(to)) => transform(one, to)
            case (one, None) => one.asInstanceOf[Z]
          }
        }.getOrElse(Nil)
      }
    }
  }

  def oneToManyTraversable[A, B, Z](statement: String, parameters: Any*)(
    extractOne: (WrappedResultSet) => A
    )(
                                     extractTo: (WrappedResultSet) => Option[B]
                                     )(
                                     transform: (A, Seq[B]) => Z
                                     )(
                                     implicit
                                     executor: ExecutionContextExecutor = ECGlobal
                                     ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(oneToMany: (LinkedHashMap[A, Seq[B]]), rs: WrappedResultSet): LinkedHashMap[A, Seq[B]] = {
        val o = extractOne(rs)
        oneToMany.keys.find(_ == o).map { _ =>
          extractTo(rs).map(many => oneToMany += (o -> (oneToMany.apply(o) :+ many))).getOrElse(oneToMany)
        }.getOrElse {
          oneToMany += (o -> extractTo(rs).map(many => Vector(many)).getOrElse(Nil))
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(LinkedHashMap[A, Seq[B]]())(processResultSet).map {
            case (one, to) => transform(one, to)
          }
        }.getOrElse(Nil)
      }
    }
  }

  def oneToManies2Traversable[A, B1, B2, Z](statement: String, parameters: Any*)(
    extractOne: (WrappedResultSet) => A
    )(
                                             extractTo1: (WrappedResultSet) => Option[B1],
                                             extractTo2: (WrappedResultSet) => Option[B2]
                                             )(
                                             transform: (A, Seq[B1], Seq[B2]) => Z
                                             )(
                                             implicit
                                             context: ExecutionContextExecutor = ECGlobal
                                             ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(result: (LinkedHashMap[A, (Seq[B1], Seq[B2])]), rs: WrappedResultSet): LinkedHashMap[A, (Seq[B1], Seq[B2])] = {
        val o = extractOne(rs)
        val (to1, to2) = (extractTo1(rs), extractTo2(rs))
        result.keys.find(_ == o).map { _ =>
          to1.orElse(to2).map { _ =>
            val (ts1, ts2) = result.apply(o)
            result += (o -> (
              to1.map(t => if (ts1.contains(t)) ts1 else ts1 :+ t).getOrElse(ts1),
              to2.map(t => if (ts2.contains(t)) ts2 else ts2 :+ t).getOrElse(ts2)
              ))
          }.getOrElse(result)
        }.getOrElse {
          result += (o -> (to1.map(t => Vector(t)).getOrElse(Vector()), to2.map(t => Vector(t)).getOrElse(Vector())))
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(LinkedHashMap[A, (Seq[B1], Seq[B2])]())(processResultSet).map {
            case (one, (t1, t2)) => transform(one, t1, t2)
          }
        }.getOrElse(Nil)
      }
    }
  }

  def oneToManies3Traversable[A, B1, B2, B3, Z](statement: String, parameters: Any*)(
    extractOne: (WrappedResultSet) => A
    )(
                                                 extractTo1: (WrappedResultSet) => Option[B1],
                                                 extractTo2: (WrappedResultSet) => Option[B2],
                                                 extractTo3: (WrappedResultSet) => Option[B3]
                                                 )(
                                                 transform: (A, Seq[B1], Seq[B2], Seq[B3]) => Z
                                                 )(
                                                 implicit
                                                 cxt: EC = ECGlobal
                                                 ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(result: (LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3])]), rs: WrappedResultSet): LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3])] = {
        val o = extractOne(rs)
        val (to1, to2, to3) = (extractTo1(rs), extractTo2(rs), extractTo3(rs))
        result.keys.find(_ == o).map { _ =>
          to1.orElse(to2).orElse(to3).map { _ =>
            val (ts1, ts2, ts3) = result.apply(o)
            result += (o -> (
              to1.map(t => if (ts1.contains(t)) ts1 else ts1 :+ t).getOrElse(ts1),
              to2.map(t => if (ts2.contains(t)) ts2 else ts2 :+ t).getOrElse(ts2),
              to3.map(t => if (ts3.contains(t)) ts3 else ts3 :+ t).getOrElse(ts3)
              ))
          }.getOrElse(result)
        }.getOrElse {
          result += (
            o -> (
              to1.map(t => Vector(t)).getOrElse(Vector()),
              to2.map(t => Vector(t)).getOrElse(Vector()),
              to3.map(t => Vector(t)).getOrElse(Vector())
              )
            )
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3])]())(processResultSet).map {
            case (one, (t1, t2, t3)) => transform(one, t1, t2, t3)
          }
        }.getOrElse(Nil)
      }
    }
  }

  def oneToManies4Traversable[A, B1, B2, B3, B4, Z](statement: String, parameters: Any*)(
    extractOne: (WrappedResultSet) => A
    )(
                                                     extractTo1: (WrappedResultSet) => Option[B1],
                                                     extractTo2: (WrappedResultSet) => Option[B2],
                                                     extractTo3: (WrappedResultSet) => Option[B3],
                                                     extractTo4: (WrappedResultSet) => Option[B4]
                                                     )(
                                                     transform: (A, Seq[B1], Seq[B2], Seq[B3], Seq[B4]) => Z
                                                     )(
                                                     implicit
                                                     context: ExecutionContextExecutor = ECGlobal
                                                     ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(result: (LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4])]), rs: WrappedResultSet): LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4])] = {
        val o = extractOne(rs)
        val (to1, to2, to3, to4) = (extractTo1(rs), extractTo2(rs), extractTo3(rs), extractTo4(rs))
        result.keys.find(_ == o).map { _ =>
          to1.orElse(to2).orElse(to3).orElse(to4).map { _ =>
            val (ts1, ts2, ts3, ts4) = result.apply(o)
            result += (o -> (
              to1.map(t => if (ts1.contains(t)) ts1 else ts1 :+ t).getOrElse(ts1),
              to2.map(t => if (ts2.contains(t)) ts2 else ts2 :+ t).getOrElse(ts2),
              to3.map(t => if (ts3.contains(t)) ts3 else ts3 :+ t).getOrElse(ts3),
              to4.map(t => if (ts4.contains(t)) ts4 else ts4 :+ t).getOrElse(ts4)
              ))
          }.getOrElse(result)
        }.getOrElse {
          result += (
            o -> (
              to1.map(t => Vector(t)).getOrElse(Vector()),
              to2.map(t => Vector(t)).getOrElse(Vector()),
              to3.map(t => Vector(t)).getOrElse(Vector()),
              to4.map(t => Vector(t)).getOrElse(Vector())
              )
            )
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(
            LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4])]()
          )(processResultSet).map {
            case (one, (t1, t2, t3, t4)) => transform(one, t1, t2, t3, t4)
          }
        }.getOrElse(Nil)
      }
    }
  }

  def oneToManies5Traversable[A, B1, B2, B3, B4, B5, Z](
                                                         statement: String,
                                                         parameters: Any*
                                                         )(
                                                         extractOne: (WrappedResultSet) => A
                                                         )(
                                                         extractTo1: (WrappedResultSet) => Option[B1],
                                                         extractTo2: (WrappedResultSet) => Option[B2],
                                                         extractTo3: (WrappedResultSet) => Option[B3],
                                                         extractTo4: (WrappedResultSet) => Option[B4],
                                                         extractTo5: (WrappedResultSet) => Option[B5]
                                                         )(
                                                         transform: (A, Seq[B1], Seq[B2], Seq[B3], Seq[B4], Seq[B5]) => Z
                                                         )(
                                                         implicit
                                                         cxt: EC = ECGlobal
                                                         ): Future[Traversable[Z]] = {
    val _parameters = ensureAndNormalizeParameters(parameters)
    withListeners(statement, _parameters) {
      queryLogging(statement, _parameters)

      def processResultSet(
                            result: (LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4], Seq[B5])]),
                            rs: WrappedResultSet
                            ): LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4], Seq[B5])] = {
        val o = extractOne(rs)
        val (to1, to2, to3, to4, to5) = (extractTo1(rs), extractTo2(rs), extractTo3(rs), extractTo4(rs), extractTo5(rs))
        result.keys.find(_ == o).map { _ =>
          to1.orElse(to2).orElse(to3).orElse(to4).orElse(to5).map { _ =>
            val (ts1, ts2, ts3, ts4, ts5) = result.apply(o)
            result += (o -> (
              to1.map(t => if (ts1.contains(t)) ts1 else ts1 :+ t).getOrElse(ts1),
              to2.map(t => if (ts2.contains(t)) ts2 else ts2 :+ t).getOrElse(ts2),
              to3.map(t => if (ts3.contains(t)) ts3 else ts3 :+ t).getOrElse(ts3),
              to4.map(t => if (ts4.contains(t)) ts4 else ts4 :+ t).getOrElse(ts4),
              to5.map(t => if (ts5.contains(t)) ts5 else ts5 :+ t).getOrElse(ts5)
              ))
          }.getOrElse(result)
        }.getOrElse {
          result += (
            o -> (
              to1.map(t => Vector(t)).getOrElse(Vector()),
              to2.map(t => Vector(t)).getOrElse(Vector()),
              to3.map(t => Vector(t)).getOrElse(Vector()),
              to4.map(t => Vector(t)).getOrElse(Vector()),
              to5.map(t => Vector(t)).getOrElse(Vector())
              )
            )
        }
      }
      connection.sendPreparedStatement(statement, _parameters: _*).map { result =>
        result.rows.map { ars =>
          new RavelResultSetTraversable(ars).foldLeft(
            LinkedHashMap[A, (Seq[B1], Seq[B2], Seq[B3], Seq[B4], Seq[B5])]()
          )(processResultSet).map {
            case (one, (t1, t2, t3, t4, t5)) => transform(one, t1, t2, t3, t4, t5)
          }
        }.getOrElse(Nil)
      }
    }
  }

  protected def queryLogging(statement: String, parameters: Seq[Any]): Unit = {
    if (loggingSQLAndTime.enabled) {
      log.withLevel(loggingSQLAndTime.logLevel)(s"[SQL Execution] '${statement}' with (${parameters.mkString(",")})")
    }
  }

  protected def ensureAndNormalizeParameters(parameters: Seq[Any]): Seq[Any] = {
    parameters.map {
      case withValue: ParameterBinderWithValue => withValue.value
      case _: ParameterBinder => throw new IllegalArgumentException("ParameterBinder is unsupported")
      case rawValue => rawValue
    }
  }

  protected def withListeners[A](statement: String, parameters: Seq[Any], startMillis: Long = System.currentTimeMillis)(
    f: Future[A]
    )(implicit executor: ExecutionContextExecutor = ECGlobal): Future[A] = {
    f.onSuccess {
      case _ =>
        val millis = System.currentTimeMillis - startMillis
        GlobalSettings.queryCompletionListener.apply(statement, parameters, millis)
    }
    f.onFailure { case e: Throwable => GlobalSettings.queryFailureListener.apply(statement, parameters, e) }
    f
  }

}

/**
 * Shared Ravelhronous DB session
 */
case class SharedRavelDBSession(connection: RavelConnection) extends RavelDBSession

/**
 * Ravelhronous Transactional DB Session
 */
case class TxRavelDBSession(connection: NonSharedRavelConnection) extends RavelDBSession {

  def isActive: Boolean = connection.isActive

  def begin()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = connection.sendQuery("BEGIN")

  def rollback()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = connection.sendQuery("ROLLBACK")

  def commit()(implicit executor: ExecutionContextExecutor = ECGlobal): Future[RavelQueryResult] = connection.sendQuery("COMMIT")

  def release(): Unit = connection.release()

}
