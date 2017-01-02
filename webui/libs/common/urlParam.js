/*
 * Create by zihan on 2016-04
 * v1.0.2
 */

XLJ.setUrlParam = window.XLJ.setUrlParam || function (url, keyname, keyval) {
    if (!keyname) return
    keyval = encodeURIComponent(keyval)
    var keyname = keyname || ''

    var _newUrl = ''
    var _shareKeyParam = keyname + '=' + keyval

    if (url) {
        var a = document.createElement('a')
        a.href = url
        url = a
    }
    var url = url || window.location
    var _origin = url.origin,
        _pathname = url.pathname,
        _search = url.search,
        _hash = url.hash

    if (_search) {
        if (_search.indexOf(keyname + '=') != -1 && XLJ.replaceQueryString) {
            _search = XLJ.replaceQueryString(keyname, keyval)
        } else {
            _search += '&' + _shareKeyParam
        }
    } else {
        _search = '?' + _shareKeyParam
    }

    _newUrl = _origin + _pathname + _search + _hash
    console.log(_newUrl)
    return _newUrl
};


XLJ.removeUrlParam = window.XLJ.removeUrlParam || function (url, keyname) {
    if (!keyname) return

    if (url) {
        var a = document.createElement('a')
        a.href = url
        url = a
    }

    var url = url || window.location
    var _origin = url.origin,
        _pathname = url.pathname,
        _search = url.search,
        _hash = url.hash

    if (!_search) return

    var keysObj = _search.substring(1).split('&')
    for (var i = 0; i < keysObj.length; i++) {
        var d = keysObj[i]
        if (d.indexOf(keyname) == 0) {
            return keysObj.splice(i, 1)
        }
    }

    return keysObj.join('&')
};
