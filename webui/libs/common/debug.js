/*!
 * Create by zihan on 2016
 * verstion: 1.0.0
 */

XLJ.debug = window.XLJ.debug || (function() {
    var debug = XLJ.getQueryString('debug') || ''
    if (!debug) {
        var _referrer = document.referrer
        debug = XLJ.getQueryString('debug', _referrer) || ''
        if (debug) XLJ.setQueryString('debug', debug)
    }
    if (debug) alert('Debug is open')
    return debug
})();
