package com.ravel.parallel

import java.util.concurrent.ExecutorService

import scala.concurrent.Future

/**
 * Created by CloudZou on 3/7/2017.
 */
object Sample1 {
  type Par[A] = ExecutorService => Future[A]

  trait T {
    def unit[A](a: A): Par[A]
    def map2[A, B, C](a: Par[A], b: Par[B])(f: (A, B) => C): Par[C]

    def fork[A](a: => Par[A]): Par[A]
    def lazyUnit[A](a: => A): Par[A] = fork(unit(a))
    def run[A](a: Par[A]): A
  }

  trait Monoid[A] {
    def op(a1: A, a2: A): A
    def zero: A
  }

  val stringMonoid = new Monoid[String] {
    def op(a1: String, a2: String) : String = a1 + a2
    def zero: String = ""
  }

  def optionMonoid[A] = new Monoid[Option[A]] {
    def op(a1: Option[A], a2: Option[A]): Option[A] = a1 orElse a2
    def zero: Option[A] = None
  }

  val words = List("Hic", "Est", "Index")
  words.foldRight(stringMonoid.zero)(stringMonoid.op)



  def foldMap[A, B](as: List[A], monoid: Monoid[B])(f: A => B): B = {
    as.foldLeft(monoid.zero)((a, b) => monoid.op(a, f(b)))
  }

  def foldRight[A, B](as: List[A])(z: B)(f: (A, B) => B): B = {
    foldMap(as, endoMonoid[B])(f.curried)(z)
  }

  def endoMonoid[A]: Monoid[A => A] = new Monoid[A => A] {
    def op(a1: A => A, a2: A => A): A => A = a1 compose a2
    def zero = (a: A) => a
  }


  def foldMapV[A, B](v: IndexedSeq[A], m: Monoid[B])(f : A => B): B = {
    v.length match {
      case 0 => m.zero
      case 1 => f(v(0))
      case _ => {
        val (l, r) = v.splitAt(v.length/2)
        m.op(foldMapV(l, m)(f), foldMapV(r, m)(f))
      }
    }
  }


  trait Functor[F[_]] {
    def map[A, B](fa: F[A])(f: A => B): F[B]
    def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B]
  }
}
