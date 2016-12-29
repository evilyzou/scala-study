package com.ravel.async

import com.github.mauricio.async.db.Configuration
import scalikejdbc.JDBCUrl

/**
 * Created by CloudZou on 12/29/2016.
 */
trait MauricioConfiguration {
  def configuration(url: String, user: String, password: String) = {
    val jdbcUrl = JDBCUrl(url)
    Configuration(
      username = user,
      host = jdbcUrl.host,
      port = jdbcUrl.port,
      password = Option(password).filterNot(_.trim.isEmpty),
      database = Option(jdbcUrl.database).filterNot(_.trim.isEmpty)
    )
  }

}
