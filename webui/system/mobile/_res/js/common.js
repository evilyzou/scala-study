/*!
 *  Create Date: 2015-06
 *  Author: zihan
 */

// Base setting
var XLJ = window.XLJ = window.XLJ || {}
XLJ.requestDomain    = window.XLJ.requestDomain     || ''
XLJ.rootPath         = window.XLJ.rootPath          || '../'
XLJ.loginPath        = window.XLJ.loginPath         || 'passport/login.html'

var ua = navigator.userAgent.toLowerCase()
XLJ.clickType   = window.XLJ.clickType   || (/mobile/.test(ua) ? 'touchstart' : 'click')
XLJ.systemType  = window.XLJ.systemType  || (/micromessenger/.test(ua) ? 'wap_wx' : (/mobile/.test(ua) ? 'wap' : 'web'))
XLJ.contentType = window.XLJ.contentType || 'text/plain;charset=UTF-8'

var t,t1

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "m":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "n":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:

    }
};


/*
 * XLJ.cookie
 */
!function (window, factory) {

    window.XLJ = window.XLJ || {}
    factory(window.XLJ)

}(typeof window !== 'undefined' ? window : this, function (XLJ) {

    if (XLJ.cookie) return;

	var pluses = /\+/g;

	function encode(s) { return config.raw ? s : encodeURIComponent(s);	}
	function decode(s) { return config.raw ? s : decodeURIComponent(s);	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

    function isFunction(s) { return typeof s === 'function' ? true : false; }
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return isFunction(converter) ? converter(value) : value;
	}

	var config = XLJ.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !isFunction(value)) {
			//options = $.extend({}, config.defaults, options);
			var options = options || {};

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	XLJ.removeCookie = function (key, options) {
		if (XLJ.cookie(key) === undefined) return false;

		// Must not alter options, thus extending a fresh object...
		//XLJ.cookie(key, '', $.extend({}, options, { expires: -1 }));
        var options = options || {};
        options.expires = -1;
		XLJ.cookie(key, '', options);
		return !XLJ.cookie(key);
	};

});


// must improt jQuery


XLJ.getQueryString = window.XLJ.getQueryString || function(name, source) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
        source = source || window.location.search,
        r = source.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return ''
}


XLJ.replaceQueryString = window.XLJ.replaceQueryString || function(name, param, source) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
        source = source || window.location.search,
        r = source.match(reg),
        nParam = ''

    if (!r) return

    nParam = r[1] + name + '=' + param + r[3]
    source = source.replace(reg, nParam)
    return source
}


XLJ.setQueryString = window.XLJ.setQueryString || function(name, param, source) {
    if (!name) return
    name = encodeURIComponent(name)

    var _url = '',
        _newUrl = '',
        _shareKeyParam = name + '=' + param || ''

    if (source) {
        _url = document.createElement('a')
        _url.href = source
    } else {
        _url = window.location
    }

    var _origin = _url.origin,
        _pathname = _url.pathname,
        _search = _url.search,
        _hash = _url.hash

    if (_search) {
        if (_search.indexOf(name + '=') != -1 && XLJ.replaceQueryString) {
            _search = XLJ.replaceQueryString(name, param)
        } else {
            _search += '&' + _shareKeyParam
        }
    } else {
        _search = '?' + _shareKeyParam
    }

    _newUrl = _origin + _pathname + _search + _hash

    //alert(typeof window.history.replaceState)

    window.history.replaceState('', '', _newUrl)
    return _newUrl
}

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


/*!
 *  Create Date: 2016-06
 *  Author: zihan
 *  verstion: 1.3.1
 */

XLJ.ajaxData = window.XLJ.ajaxData || function(url, type, data, callback, returnTip, errorCallBack) {

    // if request ban, don't do anthing
    if (XLJ.httpRequestDisabled === true) return

    var _type = 'GET', timeout = ''

    if (typeof type === 'function') {
        returnTip = data
        callback = type
        data = ''
    } else if (typeof data === 'function') {
        returnTip = callback
        callback = data
    }

    if (type && (type === 'GET' || type === 'POST' || type === 'PUT' || type === 'DELETE')) {
        _type = type || 'GET'
    } else if (typeof type !== 'function') {
        data = type
    }

    if (data && typeof data == 'object' && data.timeout) {
        timeout = data.timeout
        delete data.timeout
    }

    // add request domain
    return $.ajax({
        url:     url,
        type:    _type,
        timeout: timeout,
        data:    data || '',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('System-Type', XLJ.systemType)
            xhr.setRequestHeader('Content-Type', XLJ.contentType)
            xhr.setRequestHeader('Current-Url', window.location.href)
        },
        complete: function(xhr, status) {
            if (status == 'timeout') return;
        },
        success: function(response, status, xhr) {
            if (response.apiCode && response.apiCode == 8002 && XLJ.loginPath) {
                // ban all http request
                XLJ.httpRequestDisabled = true
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
            }
            if (!response.success) {
                if (response.apiCode == 1302 && response.result && response.result.Location) {
                    // ban all http request
                    XLJ.httpRequestDisabled = true
                    return window.location.href = response.result.Location;
                }

                if (returnTip) return XLJ.tip(response.msg);
            }
            if (callback) callback(response, xhr);
        },
        error: function(xhr) {
            if (XLJ.debug) {
                alert('error: ' + xhr.status)
            } else {
                console.log('error:' + xhr.status)
            }

            if (xhr.status === 403 && XLJ.loginPath) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL
            }
            if (errorCallBack) errorCallBack()
            return XLJ.tip('ERROR:' + xhr.status)
        }
    });
}

XLJ.ajaxDataAlways = XLJ.ajaxDataAlways || function(request, $operation, callback) {
    clearTimeout(XLJ.ajaxDataAlwaysTimeSet)
    $.when(request).always(function(ev) {
        XLJ.ajaxDataAlwaysTimeSet = setTimeout(function() {
            if ($operation && $operation.length > 0) $operation.removeClass('loading')
            if (callback) callback(ev)
        }, 300)
    });
}



XLJ.ajaxSubmit = window.XLJ.ajaxSubmit || function(form, progressBox, callback, returnTip) {
    if (!form || !form.length > 0) return console.log('Not form target')
    if (!progressBox || !progressBox.length > 0) progressBox = ''

    form.ajaxSubmit({
        beforeSend: function() {
            if (progressBox) progressBox.show()
        },
        uploadProgress: function(event, position, total, percentComplete) {
            console.log('total: ' + total)
            console.log('percentComplete: ' + percentComplete)
            if (progressBox) {
                var percent = percentComplete + '%'
                console.log(percent)
                if (percentComplete < 20) percent = '20%'
                progressBox.find('.progress-bar').css('width', percent)
            }
        },
        success: function(response, status, xhr) {
            if (response.apiCode && response.apiCode == 8002) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
            }
            if (!response.success) {
                if (response.apiCode == 1302 && response.result && response.result.Location)
                    return window.location.href = response.result.Location;

                if (returnTip) return XLJ.tip(response.msg);
            }
            if (progressBox) {
                progressBox.find('.progress-bar').css('width', '100%').addClass('progress-bar-success')
                setTimeout(function() {
                    progressBox.fadeOut()
                }, 500)
            }
            if (callback) callback(response);
        },
        error: function(err) {
            if (XLJ.debug) return alert('error: ' + err)
            console.log(err)
        }
    });
}


XLJ.addLayoutLink = window.XLJ.addLayoutLink || function(lyname) {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i]
        var _href = link.getAttribute('href') || '';

        if (_href && _href.indexOf('#') != 0 && _href.indexOf(lyname) == -1) {
            if (_href.indexOf('?') == -1) {
                link.setAttribute('href', _href + '?ly=' + lyname);
            } else {
                link.setAttribute('href', _href + '&ly=' + lyname);
            }
        }
    }
}

XLJ.setLayoutLink = window.XLJ.setLayoutLink || function() {
//    var dochtml = document.getElementsByTagName('html')[0]
//    dochtml.classList.add('loaded')
//    dochtml.classList.remove('loading')

    var layout = XLJ.getQueryString('ly')
    if (layout) {
        document.getElementsByTagName('html')[0].classList.add(layout);
        XLJ.addLayoutLink(layout)
    }
}


/*
 *  document ready
 */
XLJ.isDocReady = window.XLJ.isDocReady || false
XLJ.docReady = window.XLJ.docReady || function(callback) {
    if (XLJ.isDocReady || document.getElementsByTagName('body')[0]) {
        XLJ.isDocReady = true
        if (callback) callback()
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded',arguments.callee, false)
            XLJ.isDocReady = true
            if (callback) callback()
        }, false)
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee)
                XLJ.isDocReady = true
                if (callback) callback()
            }
        })
    }
}

XLJ.docReady(function() {
    XLJ.setLayoutLink()
})
/* end document ready */

/*
 *  XLJ XMLHttpRequest
 */
XLJ.httpRequest = window.XLJ.httpRequest || function(options) {
    var options = options  || {}
    var _url = options.url || ''
    if (!_url) return console.log('A bed url, no request.')

    var _data       = options.data       || '',
        _type       = options.type       || 'GET',
        _systemType = options.systemType || XLJ.systemType,
        _contentType = options.contentType || XLJ.contentType,
        _beforeSend = options.beforeSend || '',
        _completed  = options.completed  || '',
        _success    = options.success    || '',
        _error      = options.error      || '',
        _fail       = options.fail       || ''

    var XMLHttp = new XMLHttpRequest()
    if (_beforeSend && typeof _beforeSend === 'function') _beforeSend(XMLHttp)
    XMLHttp.setRequestHeader('System-Type', _systemType)
    XMLHttp.setRequestHeader('Content-Type', _contentType)
    XMLHttp.open(_type, _url)

    XMLHttp.send(_data)
    XMLHttp.onreadystatechange = function() {
        if (XMLHttp.readyState != 4) return

        // request completed
        if (_completed && typeof _completed === 'function') _completed()

        // error
        if (XMLHttp.status != 200) {
            if (_error && typeof _error === 'function') _error(XMLHttp)
            return
        }

        // requset success
        if (XMLHttp.responseText) {
            if (_success && typeof _success === 'function') {
                var response = eval('(' + XMLHttp.responseText + ')')
                _success(response)
            }
        } else {
            console.log(XMLHttp.status + ':' + XMLHttp.statusText)
            if (_fail && typeof _fail === 'function') _fail(XMLHttp)
        }
    }
}
/* End XLJ XMLHttpRequest */


XLJ.Utils = window.XLJ.Utils || function() {
    var validationUtils = {
        validateEmail : function(_s) {
            var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            return emailRegex.test(_s);
        },
        validateMobile : function(_s) {
            var hkMobileRegex = /(^5|^6|^8|^9)[0-9]{7}$/;
            //var mainlandMobileRegex = /^1(3[0-9]|5[0-35-9]|8[0236-9]|14[57])[0-9]{8}$/;
            //弱化手机号码匹配,保证11位号码即可
            var mainlandMobileRegex = /^1[0-9]{10}$/;
            return mainlandMobileRegex.test(_s) || hkMobileRegex.test(_s);
        },
        validatePostCode : function(_s){
            /*var postCode= /^[1-9][0-9]{5}$/;
            return postCode.test(_s);*/
            return true;
        },
        validateInteger : function(_s) {
            return typeof _s === 'number' && _s%1 === 0
        },
        isNumbers : function(str){
            return /^[0-9]*$/.test(str);
        },
        isShortNumber: function(str){
            return /^[0-9]{4,6}-[0-9]+$/.test(str);
        }
    };

    var stringUtils = {
        isStringEmpty : function(_s) {
            if(typeof _s === 'undefined' || _s == null || _s == '') {
                return true;
            } else {
                return false;
            }
        }
    };

    var numberUtils = {
        getNumber: function(num) {
            if(num === undefined || num === '') {
                return 0;
            }
            num = Number(num);
            if(isNaN(num)) {
                return 0;
            }
            return num;
        }
    };

    return {
        validateEmail:    validationUtils.validateEmail,
        validateMobile:   validationUtils.validateMobile,
        isStringEmpty:    stringUtils.isStringEmpty,
        validateInteger:  validationUtils.validateInteger,
        validatePostCode: validationUtils.validatePostCode,
        getNumber:        numberUtils.getNumber,
        isNumbers:        validationUtils.isNumbers,
        isShortNumber:    validationUtils.isShortNumber
    };
}




/**
// Tip Box
// How to use it :
// XLJ.tip('Tip text');          // default style
// XLJ.tip('Tip text', 'Type');  // Type1: success,
// Type2: warning,
// Type3: error,
// Type4: info;
*/
XLJ.tip = window.XLJ.tip || function(text, type, callback, keep) {
    if (!text) return false
    var _type = type || ''
    if (typeof type === 'function') callback = type, _type = ''

    var
        clickType = XLJ.clickType || (/Mobile/.test(navigator.userAgent) ? 'touchstart' : 'click'),
        $docBody = $(document.body),
        $popBoxWrap = $docBody.find('> .popBoxWrap'),
        _popTpl = '<div class="poptip ' + _type + '">'
                + '<div class="head"><div class="cssicon close"></div><div class="title"></div></div>'
                + '<div class="main"><div class="content">' + text + '</div></div>'
                + '<div class="foot"></div>'
                + '</div>',
        $popTPL = $(_popTpl),
        _lastBoxBottom = 50,
        removeTime,
        closeTime

    function closePop(target) {
        if (!target || !target.length) target = $(this).closest('.poptip')
        target.removeClass('show')

        clearTimeout(closeTime)
        closeTime = setTimeout(function () {
            target.remove()
        }, 500)
        if (callback) callback()
    }

    if ($popBoxWrap.length == 0) {
        $popBoxWrap = $('<div class="popBoxWrap"></div>')
        $docBody.append($popBoxWrap)
    }

    // current popbox number
    $popBoxWrap.find('> div').each(function() {
        var _this = $(this)
        if (_this.hasClass('show') && _this.css('display') != 'none') {
            _lastBoxBottom = (parseInt(_this.css('bottom')) + _this.outerHeight() + 5)
            return true // jump
        }
    })

    $popTPL.css('bottom', _lastBoxBottom)
    $popTPL.prependTo($popBoxWrap)

    // animate support
    setTimeout(function () {
        $popTPL.addClass('show')
    }, 10)

    if (!keep) {
        // close
        removeTime = setTimeout(function () {
            closePop($popTPL)
        }, 2800)

        $popTPL.on('mouseover', function() { clearTimeout(removeTime) })
        $popTPL.on('mouseout', function() {
            removeTime = setTimeout(function () {
                closePop($popTPL)
            }, 1000)
        })
    }

    $docBody
        .off(clickType, '.poptip',        closePop)
        .on(clickType,  '.poptip',        closePop)
        .off(clickType, '.poptip .close', closePop)
        .on(clickType,  '.poptip .close', closePop)
}

// Confirm Box
// How to use it :
// Type1: XLJ.confirmBox('Message', function() { /* confirm function put here */ });
// Type2: XLJ.confirmBox('Message', function() { /* confirm function put here */ });
XLJ.confirmBox = window.XLJ.confirmBox || function(text, callback, buttondom) {
    if (!text) return false;

    var _head = ''
    var _title = text
    var _text = ''

    if (typeof text === 'object') {
        _head = text.head   || ''
        _text = text.text   || ''
        _title = text.title || ''
    }

    var popTPL = $('<div><div class="popmark cancel"></div><div class="poptip"><div class="head">' + _head + '<div class="cssicon close"></div><div class="title"></div></div><div class="main"><div class="title">' + _title + '</div><div class="content">' + _text + '</div></div><div class="foot"><button class="btn default confirm" type="button">确认</button><button class="btn cancel" type="button">取消</button></div></div></div>');

    if (buttondom) popTPL.find('.foot').html(buttondom);

    popTPL.find('div .close, .cancel').on(XLJ.clickType, function (e) {
        removeBox($(this), e)
    });

    popTPL.find('.confirm').on(XLJ.clickType, function (e) {
        removeBox($(this), e, function() {
            if (callback) callback()
        })
    });

    function removeBox(el, e, cb) {
        e.preventDefault()
        e.stopPropagation()

        var _parent = el.parentsUntil('.poptip').last().parent()
        if (el.attr('class').indexOf('popmark') != -1) _parent = el.next('.poptip')
        var _mark = _parent.prev('.popmark')
        _parent.removeClass('show')
        _mark.removeClass('show')

        setTimeout(function () {
            _parent.parent().remove()
//            _mark.remove()
        }, 500)
        if (cb) cb()
    }

    $('.poptip').removeClass('current')
    popTPL.find('> div').addClass('current')
    $(document.body).append(popTPL);
    setTimeout(function () {
        $('.popmark.current').addClass('show');
        $('.poptip.current').addClass('show');
    }, 10);
}

// Loading Box
// How to use it :
// XLJ.loadingBox();          // will be close/remove loading box
// XLJ.loadingBox('remove');  // remove loading box
XLJ.loadingBox = window.XLJ.loadingBox || function (text) {

    var $boxTpl = $('<div class="mod-loading screen" style="display: block;"><div class="animate"></div><div class="txt"></div></div>');
    var mloadingbox = $('.mod-loading');

    if (text == 'remove') {
        mloadingbox.fadeOut(500);
        t = setTimeout(function () {
            mloadingbox.remove();
        }, 501);
    } else {
        clearTimeout(t);

        mloadingbox.remove();
        if (text) $boxTpl.find('.txt').text(text);
        $('body').append($boxTpl);
        t = setTimeout(function () {
            $('.mod-loading').addClass('bgmark');
        }, 20);
    }
}

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

// format the price number
XLJ.formatPrice = window.XLJ.formatPrice || function(price, decimal, precentCount) {
    var decimal = decimal || 2, precentCount = precentCount || 100
    return (price / precentCount).toFixed(decimal)
}


// page show
/*!
 *  Create by zihan on 2016-11
 *  version: 1.2.2
 */

XLJ.page = window.XLJ.page || function(pageNumber, pageContainer, currentPage) {
    //if this function put in hashchange, the pageNumber is a event
    if (typeof pageNumber == 'object') pageNumber = null

    var pagewrap = pageContainer || document.querySelector('.slidepage-wrap')
    if (!pagewrap) return

    var main     = currentPage || pagewrap.querySelectorAll('.slidepage-page')
    if (!main || main.length <= 1) return

    var pagename = ''
    if (pageNumber || pageNumber == 0) {
        pagename = pageNumber
    } else {
        var hash = window.location.hash
        var preg = /#p-([0-9a-zA-Z]*)/
        pagename = hash.match(preg)
        pagename = (pagename) ? pagename[1] : ''
    }
    if (!pagename && pageNumber != 0 && pageNumber != null) return

    var translate3d = 'translate3d(0, 0, 0)'
    var transition  = 'all 0.5s ease'

    if (/^[0-9]*$/.test(pagename)) {
        translate3d = 'translate3d(-' + (pagename * 100) + '%, 0, 0)'
    } else if (hash) {
        var target = document.getElementById(hash.substr(1))
        if (!target) return
        if (!XLJ.nodeIndex) return
        pagename = XLJ.nodeIndex(target)
        translate3d = 'translate3d(-' + (pagename * 100) + '%, 0, 0)'
    }

    for (var i = 0; i < main.length; i++) {
        var m = main[i]
        m.style.webkitTransition = transition
        m.style.transition = transition

        m.style.webkitTransform = translate3d
        m.style.transform = translate3d
    }
}

// init
if (window.addEventListener) {
    window.addEventListener('hashchange', XLJ.page, false)
} else if (window.attachEvent) {
    window.attachEvent('onhashchange', XLJ.page, false)
}
XLJ.docReady(function() {
    // page show init
    XLJ.page()
});


/* hash Tab
 *
 * DOM:
    <div class="tab-nav">
        <ul class="ui">
            <li class="selected"><a href="#t-tab1">Tab 1</a></li>
            <li><a href="#t-tab2">Tab 2</a></li>
            <li><a href="#t-tab3" data-page-url='./page3.html'>Tab 3</a></li>
        </ul>
    </div>
    <div class="tabcontents">
        <div class="tab_content" data-hash-name="#t-tab1" style="display: block;"><!-- tab 1 content put here--></div>
        <div class="tab_content" data-hash-name="#t-tab2" style="display: none;"><!-- tab 2 content put here--></div>
        <div class="tab_content" data-hash-name="#t-tab3" style="display: none;"><!-- page3.html will load in here--></div>
    </div>
 */
XLJ.hashTab = window.XLJ.hashTab || (function(window) {

    function getPage(url, callback) {
        $.ajax({
            url: url,
            dataType: 'html',
            success: function(html) {
                var html = (XLJ.htmlFilter) ? XLJ.htmlFilter(html) : html
                if (callback) callback(html)
            }
        })
    }

    function tabcore(el, target, e) {
        var _this = el, _target = target
        if (_target.indexOf('#') != 0 || _target.length < 1) return

        var $target = $('[data-hash-name="' + _target + '"]')
        if (!$target || $target.length <= 0) return
        if (e) {
            e.preventDefault()

            //window.location.hash = _target
            var url = window.location.href
            url = url.replace(window.location.hash, '')
            url += _target
            window.history.pushState('', '', url)
        }

        var _pageURL = _this.attr('data-page-url') || '',
            _pageLoaded = _this.attr('data-page-loaded') || ''

        if (_pageURL && !_pageLoaded) {
            getPage(_pageURL, function(html) {
                _this.attr('data-page-loaded', 'true')
                $target.html(html)
            })
        }

        //_this.parent().addClass('selected').siblings().removeClass('selected')
        $target.show().siblings('.tab_content').hide()
    }

    function tabnav() {
        var hash = window.location.hash
        if (!hash) return

        var _this = $('a[href="' + hash + '"]');
        if (_this.length <=0) return;

        _this.parent().addClass('selected current').siblings().removeClass('selected current')
        tabcore(_this, hash)
    }

    tabnav() // page load run once
    window.addEventListener('hashchange', tabnav, false);

    $(document.body).on('click', '.tab-nav a', function(e) {
        var _this = $(this);
        var _target = _this.attr('href');

        if (_target.indexOf('#') == 0) e.preventDefault();
        if (_this.parent().hasClass('selected')) return false;
        tabcore(_this, _target, e)
    });

}(typeof window !== 'undefined' ? window : this));



/* Amount Tool
 * v1.2.1
 * ex:

    var amountTool = new XLJ.AmountTool({
        elName: '.mod-amount'
    });
    amountTool.init()    // init will run check function once
    //amountTool.check() // if you want to check the new elements click status

    // plus
    // you can set below function for action callback
    window.XLJ.amountCallback = function() {}
*/


XLJ.AmountTool = window.XLJ.AmountTool || function(options) {
    this.options = options || {}
    this.elName  = this.options.elName  || '.mod-amount'
    this.incName = this.options.incName || '.increase'
    this.decName = this.options.decName || '.decrease'
    this.couName = this.options.couName || '.count'
    this.coTName = this.options.coTName || '.countTxt'
    this.action  = this.options.action  || ''
}

XLJ.AmountTool.prototype = {

    // check the action button operation status
    check: function() {
        var root = this
        var $amountBox = $(root.elName)
        $amountBox.each(function() {
            var that = $(this);
            var $count = that.find(root.couName),
                $countTxt = that.find(root.coTName),
                $decrease = that.find(root.decName),
                $increase = that.find(root.incName);

            root.checkBtnState($count, $increase, $decrease);
        });
    },

    // lock the operation when the amount action run
    lock: function($count, $increase, $decrease, cls, type) {
        if (!cls) return
        if (type && type == 'remove') {
            $count.removeClass(cls)
            $decrease.removeClass(cls)
            $increase.removeClass(cls)
        } else {
            $count.addClass(cls)
            $decrease.addClass(cls)
            $increase.addClass(cls)
        }
    },

    // waiting the amount operation callback to run this function,
    // if callback return false, don't do anthing, if no set this function, go on amount
    amountCallback: function($count, $currentOperation, $increase, $decrease, newCount, callback) {
        var root = this
        root.lock($count, $increase, $decrease, 'unactive')

        var cb = root.action || window.XLJ.amountCallback || ''

        if (typeof cb === 'function') {
            var _cb = cb($count, $currentOperation, $increase, $decrease, newCount)
            if (_cb === false) return root.lock($count, $increase, $decrease, 'unactive', 'remove')
            $.when(_cb)
                .done(function() {
                    root.lock($count, $increase, $decrease, 'unactive', 'remove')
                    if (callback) callback()
                })
                .fail(function() {
                    root.lock($count, $increase, $decrease, 'unactive', 'remove')
                })
        } else {
            root.lock($count, $increase, $decrease, 'unactive', 'remove')
            if (callback) callback()
        }
    },

    // operation button disable status
    checkBtnState: function($count, $increase, $decrease) {
        var root = this
        var _count = parseInt($count.val() || 0),
            _min = parseInt($count.attr('min')),
            _max = parseInt($count.attr('max') || 0)

        if (!_min && _min != 0) _min = 1;

        if (_count <= _min) {
            $decrease.addClass('disabled');
        } else {
            $decrease.removeClass('disabled');
        }

        if (_max && _count >= _max) {
            $increase.addClass('disabled');
        } else {
            $increase.removeClass('disabled');
        }
    },

    // core count
    countAction: function(target) {
        var root = this
        var _this     = target,
            _parent   = _this.closest(root.elName),
            $increase = _parent.find(root.incName),
            $decrease = _parent.find(root.decName),
            $count    = _parent.find(root.couName),
            $countTxt = _parent.find(root.coTName),
            _count    = parseFloat($count.val())       || 0,
            _min      = parseFloat($count.attr('min')),
            _max      = parseFloat($count.attr('max')) || 0;

        if (!_min && _min != 0) _min = 1;

        if (_this.hasClass('disabled')) return;

        var _newCount = _count
        if (_this.attr('class').indexOf('increase') != -1) {
            if (_count >= _max && _max != 0) return;

            _newCount += 1

        } else if (_this.attr('class').indexOf('decrease') != -1) {
            if (_count <= _min) return;

            _newCount -= 1
        }

        if (_newCount != _count) {
            root.amountCallback($count, _this, $increase, $decrease, _newCount, function() {
                $count.val(_newCount).attr('data-count', _newCount);
                $countTxt.text(_newCount);
                root.checkBtnState($count, $increase, $decrease);
            });
        }
    },

    init: function() {
        var root = this
        var selectorName = '', selectorCountName = ''
        selectorName += (root.elName + ' ' + root.decName + ', ')
        selectorName += (root.elName + ' ' + root.incName)

        selectorCountName = root.elName + ' ' + root.couName

        // build operation action
        $(document.body)
            .off('click', selectorName)
            .on('click', selectorName, function() {
                var _this = $(this)
                if (_this.hasClass('unactive')) return
                root.countAction($(this))
            })
            .off('blur', selectorCountName)
            .on('blur', selectorCountName, function() {
                var _this = $(this)
                if (_this.hasClass('unactive')) return
                root.countAction($(this))
            });

        root.check()
    }
}


/* Create by zihan no 2015-12-31 */
/* v1.2.3 */
/*
 * EXP:

    var scrollData = new XLJ.ScrollData({
        url: '/List/product',
        container: $('.maincontent'),
        target: $('#product-list'),
        success: function(response) {
            // you callback function put here
        }
    });

 * EXP 2:

    var emptyTxt = 'Not coupons'
    var $mycouponUsed = $('.mycoupon-used')
    var scrollData_used = new XLJ.ScrollData({
        url:          '/My/coupons',
        data:         {useStatus: 'used'},
        container:    $mycouponUsed,
        target:       $mycouponUsed.find('.coupons'),
        requestModel: XLJ.ajaxData,
        emptyTxt:     emptyTxt,
        success: function(response, target) {
            // you callback function put here
        }
    });
 */
XLJ.ScrollData = window.XLJ.ScrollData || function(options) {
    this.options       = options                    || {}
    this.url           = this.options.url           || ''
    this.data          = this.options.data          || null
    this.total         = this.options.total         || ''
    this.totalPath     = this.options.totalPath     || ''
    this.page          = this.options.page          || 1
    this.pageSize      = this.options.pageSize      || 20
    this.pagePath      = this.options.pagePath      || 'page'
    this.pageSizePath  = this.options.pageSizePath  || 'pageSize'
    this.$container    = this.options.container     || ''
    this.$target       = this.options.target        || ''
    this.dataCheck     = this.options.dataCheck
    this.emptyTxt      = this.options.emptyTxt      || '还没有相关的内容'
    this.emptyHtml     = this.options.emptyHtml     || '<div class="nothingbox"><div class="main"><p>' + this.emptyTxt + '</p></div></div>'
    this.waitingHtml   = this.options.waitingHtml   || '<div class="loadmore mod-loading" style="visibility: hidden;"><div class="animate"></div></div>'
    this.requestModel  = this.options.requestModel  || ''
    this.success       = this.options.success       || function() {}
    this.initStatus    = this.options.initStatus

    this.debug = false

    // init start
    if (this.initStatus !== false) this.init()
}

XLJ.ScrollData.prototype = {

    vendor: function(data, $target, total) {
        var root = this

        if (root.dataCheck !== false && (!data || !data.success || total === 0)) {
            if (data.msgHtml) root.emptyHtml = data.msgHtml
            $target.html(root.emptyHtml)
            console.log('Not data or error')
            return
        }

        root.success(data, $target)
    },

    request: function(callback) {
        var root = this

        var $target = root.$target
        if (!$target || $target.length <= 0) return console.log('找不到数据容器')

        // scroll to bottom gono function
        var _loading = $target.attr('data-loading') || 'false',
            _hasNext = $target.attr('data-hasNext') || 'true'
        if (_loading == 'true' || _hasNext == 'false') return   // lock
        $target.attr('data-loading', 'true')

        var _pageNo = parseFloat($target.attr('data-pageNo') || root.page || 1)

        // load animation box
        var $loadmore = $target.next('.loadmore')
        if ($loadmore.length <= 0) {
            $loadmore = $(root.waitingHtml)
            $target.after($loadmore)
        } else {
            $loadmore.css('visibility', 'visible')
        }

        var data = {}
        data[root.pagePath] = _pageNo
        data[root.pageSizePath] = root.pageSize

        data = $.extend({}, root.data, data)

        var model = root.requestModel || $.get
        model(root.url, data, function(response) {
            if (root.debug) console.log(response)

            // custome callback fn
            if (callback) return callback(response, $target, _pageNo)

            if (!response.success) {
                $target.attr({'data-hasNext': 'false', 'data-loading': 'false'})
            }

            root.page += 1
            var _total = root.total || response[root.totalPath]
            if (!_total && _total !== 0 && response.result) {
                _total = response.result[root.totalPath] || response.result.totalCount
            }
            if (!_total && _total !== 0) _total = ''

            if (_total === false) {
                _hasNext = false
            } else if (_total === true) {
                _hasNext = true
            } else {
                _hasNext  = (!_total || ((_pageNo * root.pageSize) >= _total)) ? 'false' : 'true'
            }
            $target.attr({
                'data-hasNext': _hasNext,
                'data-loading': 'false',
                'data-pageNo':  _pageNo + 1
            })
            $loadmore.css('visibility', 'hidden')

            root.vendor(response, $target, _total)
        })
    },

    scroll: function(callback) {
        var root = this

        var $mainBox     = root.$container
        var $mainContent = root.$target
        if (!$mainContent || $mainContent.length <= 0) return
        if ($mainContent.attr('data-hasNext') == 'false') return

        var mainH = 0, $body = $mainBox
        if (!$mainBox || $mainBox.length <= 0) {
            $mainBox  = $(document)
            $body     = $(document.body)
            mainH     = $body.height()
        } else {
            mainH     = $mainBox.height()
        }

        var $win = $(window)
        $win.on('resize', function () {
            mainH = $body.height()
        })

        $mainBox.on('scroll', function () {
            if ($mainContent.attr('data-loading') == 'true') return
            if ($mainContent.attr('data-hasNext') == 'false') return $mainBox.off('scroll'), $win.off('resize')

            var _this  = $(this),
                mainST = _this.scrollTop(),
                conH   = $mainContent.height();

            if (root.debug) console.log('main scrolltop + main height:' + (mainST + mainH) + '------ content height:' + conH)
            if ((mainST + mainH) >= (conH - 100)) {
                if (callback) callback()
            }
        })
    },

    init: function() {
        var root = this

        if (!root.url) return console.log('%cNeed a real request URL !', 'color: #c00; font-weight: bold;')
        if (root.page == 1) root.request()

        root.scroll(function() {
            root.request()
        })
    }
}

/*
 * Create by zihan on 2016-04
 * v1.0.1
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



/*
 * Create by zihan on 2015
 * v1.1.0
 */
XLJ.popContent = window.XLJ.popContent || (function() {
    var $win = $(window)

    function open($target) {
        if (!$target || $target.length == 0) return;
        $target.css({
            'display': 'block',
            'left': $win.width(),
            // '-webkit-transform:': 'translate3d(' + $win.width() + 'px, 0, 0)',
            // 'transform:': 'translate3d(' + $win.width() + 'px, 0, 0)'
        });

        setTimeout(function () {
            var mainLeft = $('.maincontent').offset().left;
            $target.css('left', mainLeft);
            // $target.css({
            //     '-webkit-transform': 'translate3d(0, 0, 0)',
            //     'transform': 'translate3d(0, 0, 0)'
            // });
        }, 20);
    }

    $(document.body).on(XLJ.clickType, '.popContent', function() {
        var _target = $(this).attr('data-target')
        open($(_target))
    });

    // keep the main body content in the current posistion when open this win
    var currentTop = $('body').scrollTop();
    var popContent_srcoll = function () {
        window.scrollTo('', currentTop);
    }
    $win
        .off('scroll', popContent_srcoll)
        .on('scroll', popContent_srcoll);

    return {
        open: open
    }
})();


XLJ.keyCodeCheck = window.XLJ.keyCodeCheck || {
   //只能输入整数
   only_Number: function() {
       if ((event.keyCode < 48 || event.keyCode > 57)
           && event.keyCode != 45  //Insert
           && event.keyCode != 46  //Delete
           && event.keyCode != 8   //BackSpace BackSpace
           && event.keyCode != 37   //Left
           && event.keyCode != 39   //Right
       )
           return event.returnValue = false;
   },
   //只能输入数字或负数
   only_Decimals_Number: function() {
      // alert(event.keyCode);
       if ((event.keyCode < 48 || event.keyCode > 57)
           && event.keyCode != 45  //Insert
           && event.keyCode != 46  //Delete
           && event.keyCode != 8   //BackSpace BackSpace
           && event.keyCode != 37   //Left
           && event.keyCode != 39   //Right
           && event.keyCode != 190   //period colon
           && event.keyCode != 189   //minus underscore
       )
           return event.returnValue = false;
   },
   //只能输入大于等于0的数字（包括小数点）
   only_Point_Number: function() {
       if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 46)
           return event.returnValue = false;
   },
   checknum: function(obj) {
       var re = /^-?[1-9]*(.d*)?$|^-?0(.d*)?$/;
       if (!re.test(obj.value)) {
           alert("非法数字");
           obj.value = "";
           obj.focus();
           return false;
       }
   }
}



/* -----------------------
   Pop Box
   2014.07.05   - zihan
   v1.2.4

    1.New a pop box
    A:
        $('selector').popbox();
        or
        $('selector').popbox({
            width  : 680,       //default is 600
            height : 480        //default is auto
        });
    B:
        <a class="openpop" href="#mypop">openpop</a>    //Must have class="openpop" and href="#id"

    2.Close the pop box
        $('selector').popbox('close');
        or
        closepop(this); // 'this' is the inner elment of popbox.

    3.Dom:
        <div id="mypop" class='popbox'>
            <div class="head">Title</div>
            <div class="main">
                Content document
            </div>
        </div>


    //other setting
    //popbox start
    $('.openpop').trigger('openpop');
    $('.popbox').trigger('popbox');
 * - - - - - - - - - - - */

;(function(window) {


var XLJ = window.XLJ = window.XLJ || {}
var clickType = XLJ.clickType || (/mobile/.test(navigator.userAgent.toLowerCase()) ? 'touchstart' : 'click')

XLJ.popbox = XLJ.popbox || (function(window) {

    /*!
     * Create by zihan on 2016-06-22
     * boxDrag
     * verstion: 1.1.3
     */
    // pop box drag
    var boxDrag = XLJ.boxDrag || function(target, dragArea) {
        if (!target) return

        var $doc      = $(document),
            _move     = false,
            _x, _y

        // reset dragArea
        if (typeof dragArea == 'object') {
            if (dragArea.length == 0) dragArea = target
        } else if (!dragArea) {
            dragArea = target
        }

        function getTarget(e) {
            var _target

            if (typeof target == 'object') {
                _target = target
            } else if (target != dragArea) {
                _target = $(e.target).closest(target)
            } else {
                _target = $(e.target)
            }
            return _target
        }

        // drag box
        function dragArea_mousedown(e) {
            var $target   = getTarget(e)

            _move = true
            _x    = e.pageX - parseInt($target.css('left'))
            _y    = e.pageY - parseInt($target.css('top'))

            //stop select text if moveing
            $doc.on('selectstart', function() {
                if (_move) return false
            })
        }
        function dragArea_mouseup(e) {
            _move = false

            var $target   = getTarget(e)
            $target.css({
                transition: ''  // remove transition animation
            })
        }

        if (typeof dragArea == 'object') {
            if (dragArea.length == 0) dragArea = target
            if (target.length == 0) return                 // exit this box drag

            dragArea
                .off('mousedown', dragArea_mousedown)
                .off('mouseup',   dragArea_mouseup)
                .on('mousedown',  dragArea_mousedown)
                .on('mouseup',    dragArea_mouseup)
        } else {
            $doc
                .off('mousedown', dragArea, dragArea_mousedown)
                .off('mouseup',   dragArea, dragArea_mouseup)
                .on('mousedown',  dragArea, dragArea_mousedown)
                .on('mouseup',    dragArea, dragArea_mouseup)
        }


        // drag on document
        function doc_mousemove(e) {
            if (!_move) return

            var x = e.pageX - _x,
                y = e.pageY - _y

            var $target   = getTarget(e)
            $target.css({
                position:   'fixed',
                top:        y,
                left:       x,
                transition: 'none'  // ban transition animation
            })
        }
        function doc_mouseup(e) {
            _move = false
        }

        $doc
            .off('mousemove', doc_mousemove)
            .off('mouseup',   doc_mouseup)
            .on('mousemove',  doc_mousemove)
            .on('mouseup',    doc_mouseup)
    }

    function currentWin($target) {
        $('.popbox').removeClass('current');
        $target.addClass('current');
    }

    // close pop box
    function closepop($target, removeDom){
        if ($target && $target.length > 0) {
            var thisbox = $target.closest('.popbox');
            thisbox.fadeOut(100, function() {
                if (removeDom) return thisbox.remove()
                //reset the form to default when close the popbox
                thisbox.find('form').each(function(){ this.reset(); });
                thisbox.find('.msg').text('');
            }).addClass('hide').removeClass('show').removeClass('current');
        }
    }

    // pop box position
    function boxPosition($target){
    	//set the position for each pop box can be used at center of screen
        $target.each(function() {
            var _this = $(this),
                thisW = _this.outerWidth(),
                thisH = _this.outerHeight();
            _this.css({
                'position'     : 'fixed',
                'left'         : '50%',
                'top'          : '50%',
                'margin-left'  : -(thisW/2),
                'margin-top'   : -(thisH/2)
            });
        });
    }

    function createPop($target, removeDom) {
        var $target = $target;
        var $head = $('> :first-child', $target);
        //add box style class
        $target.addClass('popbox popboxED hide').css('display', '');

        //reset the box position
        boxPosition($target);
        boxDrag($target, $head);

        //add close button
        if ($head.find('> .close').length == 0) {
            $head.append('<span class="close closepop">Close</span>');
        }

        $target.on(clickType, '.close, .cancel', function(e){
            closepop($(this), removeDom);
            e.stopPropagation();
        }).mousedown(function(e){
            e.stopPropagation();
        });
    }

    $.fn.extend({
        popbox: function(options, callback) {
            var options  = options || ''
            var _this    = this,
                _default = {
                    close:  (options == 'close') ? true : false,
                    width:  '',
                    height: '',
                    removeDom:  false
                },
                opt      = (typeof options == 'object') ? options : {}

            options = $.extend({}, _default, opt)

            //close pop
            if (options.close) {
                _this.find('form').each(function(){ this.reset(); });
                return _this.fadeOut(100, function() {
                    if (callback) callback(_this)
                    if (options.removeDom) _this.remove()
                }).addClass('hide').removeClass('show').removeClass('current');
            } else {
                //open pop
                //add box width height
                if (options.width)  _this.css('width', options.width);
                if (options.height) _this.css('height', options.height);

                if (_this.hasClass('popboxED')) {
                    //if no first start
                    _this.fadeIn(100, function() {
                       if (callback) callback(_this)
                    }).removeClass('hide').addClass('show');
                } else {
                    createPop(_this, options.removeDom);
                }

                _this.removeClass('hide').addClass('show');
                currentWin(_this);
            }

        }
    });

    var $docBody = $(document.body)
    // the pop box reset
    $docBody.on('popbox','.popbox',function(){
        var _this = $(this)
        _this.popbox()
        _this.removeClass('show current').addClass('hide')
    });

    // load pop box
    $docBody.on('openpop','.openpop',function(){
        var _this = $(this),
            _target = _this.attr('href') || _this.attr('data-target') || '';

        if (!_target || _target.indexOf('#') != 0 || _target.length < 2 ) return false;

        _this.click(function(){
            var $target = $(_target);
            $target.popbox('open')
            // if (!$target.hasClass('popboxED')) {
            //     createPop($target);
            // }
            // if ($target.css('display') == 'none') {
            //     $target.fadeIn(100).removeClass('hide').addClass('show');
            // } else {
            //     $target.removeClass('hide').addClass('show');
            //     currentWin(_target);
            // }
            $target.resizepop();
            return false;
        });
    });

    if (!$.fn.resizepop) $.fn.extend({
        resizepop: function() {
            var pbox = $(this);
            if (pbox.length == 0) return;

            var _win = $(window),
                _winW = $(_win).outerWidth(),
                _winH = $(_win).outerHeight();

            var _w = pbox.outerWidth(),
                _h = pbox.outerHeight();

            pbox.outerWidth();
            pbox.css({
                //'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'margin-top': -(_h / 2),
                'margin-left': -(_w / 2)
            });
    	}
    });

$(document.body).on(clickType,'.openpop',function(){
    var _this = $(this),
        _target = _this.attr('data-target') || _this.attr('href') || '';

    if (!_target) return

    var $target = $(_target);
    if ($target.length <= 0) return

    if (!$target.hasClass('popboxED')) {
        createPop($target);
    }
    if ($target.css('display') == 'none') {
        $target.fadeIn(100).removeClass('hide').addClass('show');
    } else {
        $target.removeClass('hide').addClass('show');
    }
    currentWin($target);
    $target.resizepop();
    return false;
});

$('.openpop').trigger('openpop');
$('.popbox').trigger('popbox');

}(typeof window != 'undefined' ? window : this));
}(typeof window != 'undefined' ? window : this));
/* - - - - - - - - - - -
   end Pop Box
   ---------------------- */



$.fn.extend({
    tooltip: function(text) {
        if (!text) return false;
        var root = this, tipbox, t;
        if (this.find('.tooltip').length > 0) {
            tipbox = this.find('.tooltip');
            tipbox.fadeIn(100);
            clearTimeout(t);
        } else {
            tipbox = $('<div class="tooltip">' + text + '</div>');
            this.prepend(tipbox);
            setTimeout(function() {
                tipbox = root.find('.tooltip');
                tipbox.addClass('show');
            }, 20);
        }
        t = setTimeout(function() {
            tipbox.fadeOut(300, function() {
                tipbox.remove();
            });
        }, 2000);
    }
});


$.fn.extend({
    checkRequired: function(text) {
        var text = text || '不能为空';
        var _isRequired = true;
        var _input = this.find('[data-required="true"]');
        _input.each(function() {
            var _that = $(this);
            if (!_that.val()) {
                if ($.fn.tooltip) {
                    _that.parent().tooltip(text);
                } else {
                    alert(text);
                }
                _isRequired = false;
            }
        });
        return _isRequired;
    }
});


$.fn.extend({
    resetForm: function() {
        this[0].reset();
        this.find('.msg').text('');
    }
});


/*!
 * Create by zihan on 2015-12-22
 * v1.1.4
 */

$.fn.extend({
    formobj: function(type) {
        var obj = '{'
        var input = $(this).find('[name]')
        input.each(function(i) {
            var _this = $(this)
            if (!_this.attr('name')) return
            if (_this.attr('data-skipData') == 'true') return
            if (_this.prop('disabled') == true) return
            if ((_this.attr('type') == 'radio' || _this.attr('type') == 'checkbox') && _this.prop('checked') == false) return

            var _val = (_this.val() || '').trim()
            var _valfinal = (/^[0-9]+([\.0-9]+)?$/.test((1 * _val))) ? Number(_val) : '"' + _val + '"'
            if (_val === '') _valfinal = '""'
            obj += _this.attr('name') + ':' + _valfinal
            if (i < input.length - 1) obj += ','
        })
        obj += '}'

        if (type && type == 'string') {
            return obj
        } else {
            return eval('(' + obj +')')
        }
    }
});




// countDown
$.fn.extend({
    countDown: function (options, startCallback, endCallback) {
        var _this = this;

        if (options) {
            var startTime = options.startTime     || '',
                endTime = options.endTime         || '',
                openText = options.openText       || '于' + startTime.replace('00:00:00', "") + '开团',
                offText = options.offText         || '已结束',
                showMsec = options.showMsec       || false,
                formatTxt = options.formatTxt     || ['', '天', '时', '分', '秒'],
                formatStart = options.formatStart || ['距开团：', '天', '时', '分', '秒'],
                formatEnd = options.formatEnd     || ['', '天', '时', '分', '秒'];
        } else {
            return;
        }

        var startT = new Date(startTime).getTime(),
            endT = new Date(endTime).getTime(),
            now = new Date().getTime(),
            countT = Math.floor((endT - now) / 1000);

        var msec = 9;

        // if the time is error, stop function
        if (startT > endT) {
            $(_this).remove();
            return;
        }

        // off function
        if ((now > endT) || (startT > endT)) {
            _this.text(offText);
            return;
        }

        // if the time smaller than startime
        if (now < startT) {
            $(_this).prevAll('.num_buy').remove();
            $(_this).show();
            if (openText.indexOf('00:00:00') != 0) {
                openText = openText.replace('00:00:00', '0点');
            } else if (openText.indexOf(':00:00') != 0) {
                openText = openText.replace(':00:00', '点');
            }
            _this.text(openText);
            return;
        }

        // in time
//        if (now >= startT && now <= endT) {
//            console.log('');
//        }

        $(_this).show();
        timer($(_this));

        function addZero(m) {
            return m < 10 ? '0' + m : m
        }

        function timer(target) {
            var selector = target || '';
            var t = window.setInterval(function () {
                var newNow = new Date().getTime();
                var countT = Math.floor((endT - newNow) / 1000);

                var day = Math.floor(countT / (60 * 60 * 24)),
                    hour = Math.floor(countT / (60 * 60)) - (day * 24),
                    minute = Math.floor(countT / 60) - (day * 24 * 60) - (hour * 60),
                    second = Math.floor(countT) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

                if (now < startT) {

//                    selector.html(
//                        format[0] +
//                        '<span class="ui-num">' + addZero(day) + '</span>' + format[1] +
//                        '<span class="ui-num">' + addZero(hour) + '</span>' + format[2] +
//                        '<span class="ui-num">' + addZero(minute) + '</span>' + format[3] +
//                        '<span class="ui-num">' + addZero(second) + '</span>' +
//                        ((showMsec) ? '.' + msec : '') +
//                        format[4]
//                    );

                } else if (now >= startT && now <= endT) {

                    if (countT > 0) {

                        if (showMsec) {
                            if (msec == 0) {
                                countT--;
                            }
                            ;
                            if (msec < 0)  msec = 9;
                        } else {
                            countT--;
                        }

                        var format = formatEnd;

                        selector.html(
                                format[0] +
                                '<span class="ui-num">' + addZero(day) + '</span>' + format[1] +
                                '<span class="ui-num">' + addZero(hour) + '</span>' + format[2] +
                                '<span class="ui-num">' + addZero(minute) + '</span>' + format[3] +
                                '<span class="ui-num">' + addZero(second) + '</span>' +
                                ((showMsec) ? '.' + msec : '') +
                                format[4]
                        );


                        if (showMsec) msec--;
                        if (endCallback) endCallback(selector);

                    } else {
                        _this.text(offText);
                        if (endCallback) endCallback(_this);
                        clearInterval(t);
                        return;
                    }

                } else {
                    if (endCallback) endCallback(_this);
                    clearInterval(t);
                    return;
                }
                //}, 100);
            }, ((showMsec) ? 100 : 1000));
        }
    }
});


/*!
 *  Create Date: 2016-11
 *  Author: zihan
 *  version: 1.3.1
 */

var USER_AGENCY = USER_AGENCY || (function(root, window) {

    var ua = navigator.userAgent.toLocaleLowerCase()

    root.getAgencyInfo = function(userKey, callback) {
        return XLJ.ajaxData('/Agency/info', 'GET', {userKey: userKey}, callback)
    }

    root.action = function(callback) {
        var _userKey = decodeURIComponent(XLJ.getQueryString('userKey')),
            _ref_userKey = decodeURIComponent(XLJ.getQueryString('userKey', document.referrer))

        if (!_userKey) {
            if (!_ref_userKey) return
            _userKey = _ref_userKey

            if (XLJ.setUrlParam) {
                var _newUrl = XLJ.setUrlParam(window.location.href, 'userKey', _userKey)
                window.history.replaceState('', '', _newUrl)
            }
        }

        var userSite = {
            isAgency: '',
            userKey: _userKey,
            shopUrl: '',
            shopName: ''
        }
        var getInfo = ''
        var getInfoFn = function(_userKey) {
            return root.getAgencyInfo(_userKey, function(response) {
                if (!response.success || !response.result.data || response.result.data.isBlock) return
                userSite.isAgency = response.result.isAgency || ''
                userSite.shopUrl  = (userSite.isAgency) ? response.result.data.shopUrl  || '' : ''
                userSite.shopName = (userSite.isAgency) ? response.result.data.shopName || '' : ''
            })
        }

        if (XLJ.cookie) {
            // get new use key
            if (_userKey != XLJ.cookie('XLJ-SHARE-USERKEY') || !XLJ.cookie('XLJ-SHARE-HOMEURL') || !XLJ.cookie('XLJ-SHARE-MALLNAME')) {
                XLJ.cookie('XLJ-SHARE-USERKEY', _userKey)
                XLJ.cookie('XLJ-SHARE-HOMEURL', '')
                XLJ.cookie('XLJ-SHARE-MALLNAME', '')
                getInfo = getInfoFn(_userKey)
            } else {
                userSite.shopUrl  = XLJ.cookie('XLJ-SHARE-HOMEURL')
                userSite.shopName = XLJ.cookie('XLJ-SHARE-MALLNAME')
            }
        } else {
            getInfo = getInfoFn(_userKey)
        }
        $.when(getInfo).done(function() {
            if (XLJ.cookie && userSite.isAgency !== false) {
                XLJ.cookie('XLJ-SHARE-HOMEURL', userSite.shopUrl)
                XLJ.cookie('XLJ-SHARE-MALLNAME', userSite.shopName)
            }
            if (callback) callback(userSite)
        })
    }

    root.init = (function() {
        root.action(function(userSite) {
            if (userSite.isAgency !== false && userSite.shopUrl) $('#nav .home').attr('href', userSite.shopUrl)
        });
    })();

    return root

}(USER_AGENCY || {}, typeof window !== 'undefined' ? window : this));



XLJ.docReady(function() {

    var $body = $(document.body)
    var $win = $(window)

    /* screenbox
     * screenbox.open(obj);
     * screenbox.close(targetName);
     */
    var screenbox = {
        init: function() {
            $('.screen-box').on(XLJ.clickType, '.cancel', function(e) {
                e.stopPropagation();

                var _parent;
                var _this = $(this);
                if (_this.parent().hasClass('screen-box')) {
                    _parent = _this.parent();
                } else {
                    _parent = _this.parentsUntil('.screen-box').last().parent();
                }
                _parent.removeClass('open');
            });
        },
        open: function(obj) {
            var _target = obj.attr('data-target');
            if (_target) {
                $(_target).addClass('open');
            }
        },
        close: function(obj) {
            if (obj) {
                obj.removeClass('open');
            }
        }
    }
    screenbox.init();

    // action
    $('.openscreenbox').on(XLJ.clickType, function(e) {
        e.stopPropagation();
        screenbox.open($(this));
    });

    $body.on(XLJ.clickType, '.back', function(e) {
        e.stopPropagation();

        var thisHref = $(this).attr('href');
        if (XLJ.debug) alert('.back click + href=' +
                             thisHref + '\nwindow.history.length:' + window.history.length +
                             '\ndocument.referrer:' + document.referrer +
                             '\nbackURL:' + XLJ.getQueryString('backURL'))

        if (!thisHref || thisHref == '#') {
            if (XLJ.debug) alert('.back click is work')

            e.preventDefault();

            // go from prev page jump, don't do back
            var _current_back = XLJ.getQueryString('backURL') || ''
            if (_current_back && _current_back == document.referrer) {
                return window.history.go(-2);
            }

            if (document.referrer == window.location.href) return window.location.href = '/';

            // if have not prev page in history, try referrer first
            if (window.history.length < 2) {
                if (document.referrer)
                    return window.location.href = document.referrer
                return window.location.href = '/';
            }

            // default
            return window.history.back();
        }
    });


    /* min tab
     */
    $(document.body).on(XLJ.clickType, '.tab-titles a', function(e) {
        e.stopPropagation();

        var _this = $(this);
        var _target = _this.attr('href');

        _this.parent().addClass('current').siblings().removeClass('current');

        // hash change
        if (_target.indexOf('#') == 0 && !_this.attr('data-nohash')) {
            window.location.hash = _target
            e.preventDefault();
        }

        var $target = $(_target);
        if (!$target || $target.length <= 0) return

        $target.show().siblings('.tab_content').hide();
        e.preventDefault();
    });


    var popfilter = popfilter || (function() {

        var $popfilter = $('.popfilter'),
            $popfilter_mark = $popfilter.find('.bgmark')

        // functions
        function hideTarget() {
            $popfilter_mark.hide();
            touchTarget.css('right', -(touchTargetW));
        }
        function showTarget() {
            $popfilter_mark.show();
            touchTarget.show().css('right', mainRight);
        }

        var bgmark = '<div class="bgmark" style="display:none;"></div>';
        var _main = $('.maincontent');
        if (_main.length == 0) _main = $body
        var mainRight = _main.offset().left;
        var touchTarget = $popfilter,
            touchTargetC = touchTarget.find('> .main > .content'),
            touchTargetW = touchTarget.outerWidth();

        hideTarget();

        // add bg mark
        if (touchTarget.prev('.bgmark').length == 0) touchTarget.prepend(bgmark);

        // close popfilter
        touchTarget.find('.close, .bgmark').on('click', function(e) {
            hideTarget();
            e.preventDefault();
            e.stopPropagation();
        });

        // open popfilter
        $('.open-filter, .maincontent .tagbar .tags').on('click', function(e) {
            showTarget();
            e.preventDefault();
        });

    }());


    $body.on(XLJ.clickType, '.popContent', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('unable')) return;

        var $target = $('#' + $(this).attr('data-target'));
        if ($target.length == 0) return;
        XLJ.popContent.open($target);
    });

    $body.on(XLJ.clickType, '.singleContent .close', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var _parent = $(this).parentsUntil('.singleContent').last().parent()
        _parent.css('left', $win.width());
        setTimeout(function () {
            _parent.hide();
        }, 500);
        $('.maincontent').show();
        $win.off('scroll');
        return false;
    });


    $body.on(XLJ.clickType, '[data-toggle-target]', function(e) {
        e.preventDefault()
        e.stopPropagation()

        var _this = $(this),
            _targetName = _this.attr('data-toggle-target'),
            _class = _this.attr('data-toggle-target-class') || 'show'

        if (!_targetName) return
        //$(_targetName).toggleClass(_class)
        _this.toggleClass('toggle-opened')

        $(_targetName).slideToggle()

    });


    // search bar
    var SEARCH_BAR = SEARCH_BAR || (function() {
        var $searchBar = $('#searchBar');
        if (!$searchBar || $searchBar.length == 0) return

        var $searchTipBar = $('#searchTipBar')
        if (!$searchBar || $searchBar.length == 0) {
            var $tpl = $('<div id="searchTipBar" style="display: none;"><ul class="list ui"></ul></div>')
            $(document.body).append($tpl)
            $searchTipBar = $tpl
        }

        function searchList(keyword) {
            var keyword = keyword || ''
            if (!keyword) return
            window.location.href = '/product/search.html?kw=' + keyword
        }

        var $searchInput = $searchBar.find('input[type="search"]')

        $searchInput.focus(function() {
            $searchBar.addClass('current');
            $('#searchTipBar').show();
            $('.link.cancel').show();
            $('#header').prevAll('.mod_appbanner').hide();
            $('#main').addClass('blur');
        }).blur(function() {
            var keyword = $searchInput.val();
            searchList(keyword);
        });
        $searchBar.on('click', '.link.cancel, #searchTipBar', function() {
            $('#searchBar').removeClass('current');
            $('#searchTipBar').hide();
            $('.link.cancel').hide();
            $('#header').prevAll('.mod_appbanner').removeAttr('style');
            $('#main').removeClass('blur');
        });
        $searchTipBar.on('click', '.list', function(event) {
            event.stopPropagation();
        });
        $('#searchForm').on('submit',function(e) {
            e.preventDefault();
            var keyword = $("input[type='search']").val();

            $('#searchBar').removeClass('current');
            $('#searchTipBar').hide();
            $('.link.cancel').hide();
            $('#header').prevAll('.mod_appbanner').removeAttr('style');
            $('#main').removeClass('blur');

            searchList(keyword);

            // data report
            try {
                WEBP.Stats().init('from_wechat');
                WEBP.Stats().upload(2, keyword);
            } catch(e) {
                console.log(e);
            }
            //window.location.href = "./index.html?kw=" + keyword;
        });

        $searchInput.on('keyup', function(event) {
            if ($(this).val() != '') {
                console.log($(this).val());
                var keyword = $(this).val();
                keyword = encodeURIComponent(encodeURIComponent(keyword));
                $.get("/Search/suggest",{kw:keyword},function(data){
                    if(data.success){
                        var cell = "";
                        $.each(data.result.list,function(i,item){
                            cell += '<li><a href="' + XLJ.rootPath + 'product/search.html?kw=' + item + '">' + item + '</a></li>';
                        });
                        $(".list").empty().append(cell);
                    }
                });
            }
            if (event.keyCode == 13) {
                var keyword = $("input[type='search']").val();

                searchList(keyword);

                // data report
                try {
                    WEBP.Stats().init('from_wechat');
                    WEBP.Stats().upload(2, keyword);
                } catch(e) {
                    console.log(e);
                }
                //window.location.href = XLJ.rootPath + 'product/search.html?kw=' + keyword;
            }
        });
        // end search bar
    }());


    !function() {

        // scroll bar
        var $win = $(window),
            $header = $('#header'),
            $header_h = $header.outerHeight(),
            $maincontent = $('.maincontent'),
            $scrolltab = $('.scrolltab'),
            $scrolltab_w = $scrolltab.outerWidth(),
            $scrolltab_h = $scrolltab.outerHeight(),
            $scrolltabContainer = $scrolltab.find('> .main'),
            $scrolltabContent = $scrolltab.find('> .main > ul'),
            $tabcontents = $('#tabcontents'),
            $tabitems    = $scrolltab.find('.main > ul > li')

        if ($scrolltab.length == 0) return
        $maincontent.on('scroll', function(e) {
            var _stab_top = $scrolltab[0].offsetTop,
                _mcont_scr_top   = $maincontent.scrollTop(),
                _mcont_top = _mcont_scr_top + $header_h

            if (_stab_top <= _mcont_top) {
                $scrolltab.addClass('fixed')
            } else {
                $scrolltab.removeClass('fixed')
            }

            var _tab_tops = [],
                _currentIndex = 0
            $tabcontents.find('.tab_content').each(function(index) {
                var _this = $(this),
                    _sub_tab_top = _this[0].offsetTop
                    _tab_tops[index] = _sub_tab_top
            });

            for (var i = 0; i < _tab_tops.length; i++) {
                var d = _tab_tops[i]
                if (_mcont_top < d - 150) {
                    _currentIndex = i - 1
                    break
                }
            }

            if (_currentIndex < 0) _currentIndex = 0
            var $currentTab = $tabitems.eq(_currentIndex)
            $currentTab.addClass('current').siblings().removeClass('current')

            var _current_w = $currentTab.outerWidth(),
                _current_l = $currentTab.offset().left,
                _contentLeft  = $scrolltabContent.offset().left

            var _move_line = (_current_l + _current_w + 40) - $scrolltab_w - _contentLeft
            $scrolltabContainer.scrollLeft(_move_line)
        });

        $scrolltab.on('click', 'li a', function(e) {
            e.preventDefault()
        })

        var _tabtool_time = ''
        $scrolltab.on('click', 'li', function(e) {
            var _this = $(this)
                _index = _this.index()

            var $target = $tabcontents.find('.tab_content').eq(_index)

            clearTimeout(_tabtool_time)
            _tabtool_time = setTimeout(function() {
                _this.addClass('current').siblings().removeClass('current')
            }, 320);

            if ($target.length == 0) return
            var _target_top = $target.offset().top,
                _mcont_scr_top   = $maincontent.scrollTop(),
                _mcont_top = _mcont_scr_top - $header_h - $scrolltab_h

            $maincontent.animate({scrollTop: _mcont_top + _target_top}, 300)
        })
    }();
});


/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

$(function() {
    var $maincontent = $(".maincontent");
    if (!$maincontent.length > 0) $maincontent = $(document.body)
    $('img.lazy').lazyload({
        effect : "fadeIn",
        placeholder: XLJ.rootPath + '_res/images/pic-blank.png',
        container: $maincontent
    });
});
