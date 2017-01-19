/**
 * Created by CloudZou on 1/19/2017.
 */
class BinarySearchSpec {

}

object BinarySearchUtil {
  def binarySearchIterative(list: Array[Int], target: Int): Int = {
    var left = 0
    var right = list.length - 1
    while (left <= right) {
      val mid = left + ( (right - left + 1)/ 2 )
      if (list(mid) == target)
        return mid
      else if (list(mid) < target) {
        right = mid - 1
      } else {
        left = mid -1
      }
    }
    -1
  }
  def binarySearchImperative(list: Array[Int], target: Int) (start: Int =0, end: Int = list.length -1 ): Int = {
    if (start > end) -1
    val mid = start + (end - start + 1) /2
    if (list(mid) == target)
      return mid
    else if (list(mid) < target)
      binarySearchImperative(list, target)(mid + 1, end)
    else
      binarySearchImperative(list, target)(start, mid -1)
  }

  def binarySearchFunctional(list: Array[Int], target: Int): Int = {
    def bsf(list: Array[Int], target: Int, start: Int, end: Int): Int = {
      val mid = start + (end- start + 1)/2
      list match {
        case (arr: Array[Int]) if (arr(mid) == target) => mid
        case (arr: Array[Int]) if (arr(mid) < target) => bsf(arr, target, mid + 1, end)
        case (arr: Array[Int]) if (arr(mid) > target) => bsf(arr, target, mid - 1, end)
      }
    }
    bsf (list, target, 0, list.length - 1)
  }
}