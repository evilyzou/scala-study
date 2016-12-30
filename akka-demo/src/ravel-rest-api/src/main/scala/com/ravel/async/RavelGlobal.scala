package com.ravel.async

import scala.concurrent.ExecutionContext

/**
 * Created by CloudZou on 12/29/16.
 */
object RavelGlobal {
  val ECGlobal = ExecutionContext.Implicits.global
}
