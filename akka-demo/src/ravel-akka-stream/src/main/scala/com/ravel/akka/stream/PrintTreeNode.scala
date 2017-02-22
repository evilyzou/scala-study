package com.ravel.akka.stream

/**
 * Created by CloudZou on 2/22/2017.
 */
object PrintTreeNode extends App{
  val prefix = "+-"
  val space = " "
  val verticalLine = "| "
  var output = Seq.empty[String]

  def asciiDisplay(root: TreeNode[String]): Seq[String] = {
    iterator(0,root)
    output
  }


  def iterator(in: Int, root: TreeNode[String]) : Unit = {
    val p: String = in match {
      case 0 => ""
      case 1 => space
      case n if n > 1 =>{
        var tmp = space + verticalLine
        for ( i <- 0 until (n-1)) {
          tmp += space
        }
        tmp
      }
    }
    output = output :+ (p + prefix + root.data)
    root.children match {
      case head:: Nil =>iterator(in +1 ,head)
      case head:: tail => iterator(in +1 ,head); tail.foreach( iterator(in+1, _))
      case _ =>
    }
  }

  asciiDisplay(TreeNode("Root",
    children = List(TreeNode("level1-1"),
      TreeNode("level1-2"),
      TreeNode("level1-3")))).foreach(println)

  output = Seq.empty[String]
  println("----------------------")
  asciiDisplay(TreeNode("Root",
    children = List(
      TreeNode("level1-1", children = TreeNode("level2-1", children = TreeNode("level3-1") :: Nil) :: Nil),
      TreeNode("level1-2"),
      TreeNode("level1-3")))).foreach(println)
}

case class TreeNode[T](data: T, children: Seq[TreeNode[T]] = Nil)
