/* Get user login state
 * Create by zihan on 2016-04-09
 * v1.0.2
 */

var XLJ = window.XLJ = window.XLJ || {}
/*
 *  User State
 */
XLJ.isLoginCheck = window.XLJ.isLoginCheck || false
XLJ.isLogin      = window.XLJ.isLogin      || false
XLJ.debug        = window.XLJ.debug        || XLJ.getQueryString('debug')  || ''
XLJ.getUserInfo  = window.XLJ.getUserInfo  || function(callback) {

    if (XLJ.userInfo) {
        if (callback) callback(XLJ.userInfo)
    } else {

        // if waiting login after first get login state
        if (XLJ.getLoginStateing === true) {
            var t = setInterval(function() {
                if (typeof XLJ.userInfo != 'undefind') {
                    clearInterval(t)
                    if (callback) callback(XLJ.userInfo)
                }
            }, 100);
            return
        }

        // set get state
        XLJ.getLoginStateing = true
        XLJ.httpRequest({
            url: XLJ.requestDomain + '/User/isLogin',
            type: 'POST',
            success: function(response) {
                if (XLJ.debug) alert('isLogin result: ' + response.success)
                if (!response.success) {
                    var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                    return window.location.href = XLJ.requestDomain + XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL
                }
                XLJ.isLogin = true
                XLJ.userInfo = response.result.loginUser
                if (callback) callback(XLJ.userInfo)
            }
        })
    }
}
XLJ.getLoginState = window.XLJ.getLoginState || function(callback, authLoginPage) {

    var debug = XLJ.debug || false,
        loginState = ''

    XLJ.requestDomain = XLJ.requestDomain || ''

    // if waiting login after first get login state
    if (XLJ.getLoginStateing === true) {
        /*var t = setInterval(function() {
            if (loginState === true || loginState === false) {
                clearInterval(t)
                if (callback) callback(XLJ.isLogin)
            }
        }, 100);*/
        return
    }
    // set get state
    XLJ.getLoginStateing = true

    function replaceQueryString(name, param, source) {
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
            source = source || window.location.search,
            r = source.match(reg),
            nParam = ''

        if (!r) return

        nParam = r[1] + name + '=' + param + r[3]
        source = source.replace(reg, nParam)
        return source
    }

    function setUrlParam(url, keyname, keyval) {
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
            if (_search.indexOf(keyname + '=') != -1 && replaceQueryString) {
                _search = replaceQueryString(keyname, keyval)
            } else {
                _search += '&' + _shareKeyParam
            }
        } else {
            _search = '?' + _shareKeyParam
        }

        _newUrl = _origin + _pathname + _search + _hash
        console.log(_newUrl)
        return _newUrl
    }

    function removeUrlParam(url, keyname) {
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
    }

    function showBody() {
        XLJ.docReady(function() {
            document.body.style.display = 'block'
        });
    }

    function loginEd() {
        if (debug) alert('Yoooooooooo! login successful \n' + window.location.href)

        XLJ.isLogin = true
        loginState = true
        showBody()
        if (callback) callback(XLJ.isLogin)
    }

    function errorGone() {
        XLJ.isLogin = false
        loginState = false

        if (debug) alert('errorGone - isLoginCheck: ' + XLJ.isLoginCheck)
        if (/\/login/.test(window.location.pathname)) {
            return showBody()    // if in login page, don't do anything
        }

        if (XLJ.isLoginCheck) {
            var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
            return window.location.href = XLJ.requestDomain + XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL
        }
    }

    function wechatAuthLogin(option) {
        var option = option || {}

        var firstRequestUrl = XLJ.requestDomain + '/Wechat/authLogin?__goto_=' + option.__goto_ + '&scope=snsapi_userinfo',
            secondRequestUrl = XLJ.requestDomain + '/Wechat/authLogin?code=' + option.code + '&scope=snsapi_userinfo',
            requestUrl = (option.code) ? secondRequestUrl : firstRequestUrl
        if (debug) alert('__goto_ requestUrl:' + requestUrl)
        return XLJ.httpRequest({
            url: requestUrl,
            success: function(response) {
                console.log(response)

                if (debug) alert('Wechat authLogin result: ' + JSON.stringify(response))
                if (response.apiCode == 1302 && response.result && response.result.Location) {
                    return window.location.href = response.result.Location;
                }

                if (response.success) {
                    return loginEd()
                } else {
                    errorGone()
                }
            }
        })
    }

    ;(function init() {
        if (XLJ.isLogin) return loginEd()

        var _authLogin = XLJ.getQueryString('authLogin'),
            _code = XLJ.getQueryString('code')

        if (_authLogin && _code) {
            wechatAuthLogin({'code': _code})
        } else {
            return XLJ.httpRequest({
                url: XLJ.requestDomain + '/User/isLogin',
                type: 'POST',
                success: function(response) {
                    //console.log(response)

                    if (debug) alert('isLogin result: \n' + JSON.stringify(response))
                    if (response.success) {
                        XLJ.userInfo = response.result.loginUser
                        return loginEd()
                    } else {
                        var ua = navigator.userAgent.toLowerCase()

                        // if in iframe, do not do anthing
                        if (/micromessenger/.test(ua) && window.top == window.self) {

                            // diffrent domain url go
                            var loginTarget = XLJ.wxautoLoginUrl || ''
                            if (loginTarget) {
                                var _redirect_uri = window.location.href,
                                    _gotourl = loginTarget + '?redirect_uri=' + _redirect_uri

                                if (XLJ.debug) alert('_gotourl with redirect_uri:' + _gotourl)
                                return window.location.href = _gotourl
                            }

                            var userPage = setUrlParam(authLoginPage || '', 'authLogin', 'true')
                            userPage = encodeURIComponent(userPage) // very important for go back with params
                            wechatAuthLogin({'__goto_': userPage})
                        } else {
                            errorGone()
                        }
                    }
                }
            })
        }
    })();

}
