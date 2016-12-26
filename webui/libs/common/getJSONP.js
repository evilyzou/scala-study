
/*
 *  Get Jsonp
 */
XLJ.getJSONP = window.XLJ.getJSONP || function(url, data, callbackStr) {
    if (!url) return

    var opt = null, optStr = '?'
    if (data && (typeof data !== 'object' && (typeof data === 'string' && data.indexOf('=') === -1)) && !callbackStr) {
        callbackStr = data
    } else {
        opt = data
    }

    if (opt && typeof opt === 'object') {
        for (var key in opt) {
            if (optStr.length > 2) optStr += '&'
            optStr += key + '=' + opt[key]
        }
    } else {
        optStr += opt
    }

    if (callbackStr) callbackStr = 'callback=' + callbackStr
    if (optStr.length > 2) {
        optStr += '&' + callbackStr
    } else {
        optStr += callbackStr
    }

//    console.log(optStr)

    // create script
    var doc = document
    var script = doc.createElement('script')
    script.src = url + optStr
    doc.documentElement.appendChild(script)
}
/* end Get Jsonp */
