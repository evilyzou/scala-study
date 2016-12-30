import org.scalatest._

import scala.collection.mutable.Stack


/**
 * Created by CloudZou on 12/25/16.
 */
class StackSpec extends FlatSpec with Matchers{
  "A stack" should "pop values in last-in-first-out order" in {
    val stack = new Stack[Int]
    stack.push(1)
    stack.push(2)
    assert(stack.pop === 2)
    assert(stack.pop === 1)
  }
  it should "throw NoSuchElementException if an empty stack is popped" in {
    val emptyStack = new Stack[String]
    assertThrows[NoSuchElementException] {
      emptyStack.pop()
    }
  }
  it should "xx" in {
    val s  = (List(1,2), List(5,5)).zipped.map(_ + _)
    assert (1 === 1)
  }
}
