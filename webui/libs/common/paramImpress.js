/*!
 * Create by zihan on 2017-01
 * verstion: 1.0.0
 */
/*
 * eg:
    var ParamsImpress = (typeof XLJ.paramsImpress == 'function') ? new XLJ.paramsImpress(['userKey']) : ''
*/
XLJ.paramsImpress = window.XLJ.paramsImpress || (function(root, window) {
    'use strict'

    // import
    // if (typeof XLJ.getQueryString == 'undefined') return console.log('%cPlease import the %cXLJ.getQueryString %clib', 'color:#c00','color:#257ece','color:#c00')
    // if (typeof XLJ.setUrlParam == 'undefined') return console.log('%cPlease import the %cXLJ.setUrlParam %clib', 'color:#c00','color:#257ece','color:#c00')
    // if (typeof XLJ.removeUrlParam == 'undefined') return console.log('%cPlease import the %cXLJ.removeUrlParam %clib', 'color:#c00','color:#257ece','color:#c00')

    function core(type, options) {
        var root = this

        var options = options || root.options,
            _params = {}

        for (var i = 0; i < options.length; i++) {
            var d = options[i]
            if (type == 'remove') {
                _params[d] = ''
            } else {
                _params[d] = XLJ.getQueryString(d) || XLJ.getQueryString(d, document.referrer) || ''
            }
        }

        var _href = window.location.href
        for (var key in _params) {
            if (type == 'remove') {
                _href = XLJ.removeUrlParam(_href, key)
            } else if (_params[key]) {
                _href = XLJ.setUrlParam(_href, key, _params[key])
            }
        }

        window.history.replaceState('', '', _href)
    }

    function remove(options) {
        core('remove', options)
    }

    function impress(options) {
        core('', options)
    }

    root.remove = remove
    root.impress = impress
    root.init = impress

    return root
})(XLJ.paramsImpress || {}, typeof window != 'undefined' ? window : this);
