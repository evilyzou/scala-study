package com.ravel.async

/**
 * Created by CloudZou on 12/29/2016.
 */
import org.joda.time._
import scala.concurrent.duration.FiniteDuration

object TimeInMillis {
  def unapply(any: Any): Option[Long] = PartialFunction.condOpt(any) {
    case d: java.util.Date => d.getTime
    case ri: ReadableInstant => ri.getMillis
    case ldt: LocalDateTime => ldt.toDateTime.getMillis
    case ld: LocalDate => ld.toDate.getTime
    case lt: LocalTime => lt.toDateTimeToday.getMillis
    case fd: FiniteDuration => fd.toMillis
  }
}
