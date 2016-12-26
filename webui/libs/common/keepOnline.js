/*!
 *  Create Date: 2016-06
 *  Author: zihan
 *  verstion: 1.0.0
 */

XLJ.keepOnlineTime = ''
XLJ.keepOnline = window.XLJ.keepOnline || function(url, interval) {
    if (!url) return
    clearInterval(XLJ.keepOnlineTime)
    XLJ.keepOnlineTime = setInterval(function() {
        XLJ.ajaxData(url)
    }, interval || 300000)
}
