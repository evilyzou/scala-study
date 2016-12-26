
// dom node index
XLJ.nodeIndex = window.XLJ.nodeIndex || function(current) {
    var objs = current.parentNode.children
    if (objs.length <= 0) return 0
    for (var i = 0; i < objs.length; i++) {
        if (objs[i] == current) {
            return i
        }
    }
}
