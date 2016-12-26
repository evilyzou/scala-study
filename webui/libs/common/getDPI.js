
XLJ.getDPI = XLJ.getDPI || function() {

    'use strict'

    var arrDPI = []
    if (window.screen.deviceXDPI) {
        arrDPI[0] = window.screen.deviceXDPI
        arrDPI[1] = window.screen.deviceYDPI
    } else {
        var tmpNode = document.createElement("DIV")

        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden"
        document.body.appendChild(tmpNode)
        arrDPI[0] = parseInt(tmpNode.offsetWidth)
        arrDPI[1] = parseInt(tmpNode.offsetHeight)
        tmpNode.parentNode.removeChild(tmpNode)
    }
    return arrDPI
};
