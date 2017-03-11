package com.ravel.akka.stream

/**
 * Created by CloudZou on 3/7/2017.
 */
object FunctionSameple extends App{
  sealed trait List[+A]
  case object Nil extends List[Nothing]
  case class Cons[+A](head: A, tail: List[A]) extends List[A]


  def partiall[A,B,C](a: A, f: (A,B) => C): (B => C) = (b: B) => f(a, b)

  val c = partiall("a", (a: String, b: Int) => s"c: ${a}+ ${b}")
  println(c)
  println(c.apply(12))

  def curry[A,B,C](f: (A,B) => C): A=> (B => C) = (a: A) =>(b: B) => f(a,b)

  def uncurry[A,B,C](f: A => B => C): (A, B) => C = (a:A , b: B) => f(a)(b)

  def compose[A, B, C](f: B => C, g: A => B): A => C = (a: A) => f(g(a))

  def dropWhile[A](xs: List[A])(f: A => Boolean): List[A] = {
    xs match {
      case Cons(h, t) if f(h) => dropWhile(t)(f)
      case _ => xs
    }
  }
}
