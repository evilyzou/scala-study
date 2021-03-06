/*!
 *  Create Date: 2015-12
 *  Author: zihan
 *  version: 1.1.1
 */

'use strict'

var XLJ = window.XLJ = window.XLJ || {}

XLJ.rootPath = '/'

var USER_SHAREKEY = (function(root, window) {

    var cookie_expires = { expires: 1/2, path: '/' }
    var ua = navigator.userAgent.toLocaleLowerCase()

    root.get = function(callback) {
        XLJ.ajaxData('/User/shareKey', '', function(response) {
            console.log(response)
            if (!response.result || !response.result.userKey) return
            if (callback) callback(response.result.userKey)
        })
    }

    root.reportKey = function(userKey) {
        if (!userKey) return
        XLJ.ajaxData('/ShareKey/incept', 'GET', {userKey: userKey})
    }

    root.set = function(key) {
        if (!key) return
        key = encodeURIComponent(key)

        var _newUrl = ''
        var _shareKeyParam = 'userKey=' + key
        var _origin = window.location.origin,
            _pathname = window.location.pathname,
            _search = window.location.search,
            _hash = window.location.hash

        if (_search) {
            if (_search.indexOf('userKey=') != -1 && XLJ.replaceQueryString) {
                _search = XLJ.replaceQueryString('userKey', key)
            } else {
                _search += '&' + _shareKeyParam
            }
        } else {
            _search = '?' + _shareKeyParam
        }

        _newUrl = _origin + _pathname + _search + _hash

        //alert(typeof window.history.replaceState)

        window.history.replaceState('', '', _newUrl)
        if (ua.indexOf('micromessenger') != -1) {
            window.location.href = _newUrl
        }
    }

    root.init = function() {

        var currentKey = XLJ.getQueryString('userKey'),
            saveKey = ''

        if (currentKey) return
        if (XLJ.cookie) saveKey = XLJ.cookie('XLJ-USER-USERKEY')
        if (saveKey) {
            // if (saveKey == decodeURIComponent(currentKey)) return
            root.set(saveKey)
            return
        }

        root.get(function(key) {
            if (XLJ.cookie) {
                XLJ.cookie('XLJ-USER-USERKEY', key, cookie_expires.expires)
            }
            if (decodeURIComponent(currentKey) != key) {
                root.set(key)
            }
        })
    }

    return root

}(USER_SHAREKEY || {}, typeof window !== 'undefined' ? window : this));

// init
// if in iframe, do not do anthing
// if (window.top == window.self) {
//     USER_SHAREKEY.init()
// }
// if (typeof USER_SHAREKEY == 'object') USER_SHAREKEY.init();

var _userKey = XLJ.getQueryString('userKey')
USER_SHAREKEY.reportKey(_userKey)




;(function(){
    var WEBP = window.WEBP = window.WEBP || {};
    WEBP.Money = function() {
        var Utils = WEBP.Utils();
        return {
            getMoney: function(money, point) {
                if(point == undefined) {
                    point = 2;
                }
                return Utils.getNumber(money).toFixed(point);
            }
        }
    },
    WEBP.Utils = function() {
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
            validatePostCode : function(_s) {
                /*var postCode= /^[1-9][0-9]{5}$/;
                return postCode.test(_s);*/
                return true;
            },
            validateInteger : function(_s) {
                return typeof _s === 'number' && _s%1 === 0
            },
            isNumbers : function(str) {
            	return /^[0-9]*$/.test(str);
            },
            isShortNumber: function(str) {
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

        var NumberUtils = {
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
            validateEmail : validationUtils.validateEmail,
            validateMobile : validationUtils.validateMobile,
            isStringEmpty : stringUtils.isStringEmpty,
            validateInteger : validationUtils.validateInteger,
            validatePostCode : validationUtils.validatePostCode,
            getNumber : NumberUtils.getNumber,
            isNumbers: validationUtils.isNumbers,
            isShortNumber: validationUtils.isShortNumber
        };
    };

    WEBP.DateUtils = function(){
        var DateFormat = {
            dateFormat: function(w, r, a) {
                var c = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                p = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                v = /[^-+\dA-Z]/g,
                t = function(m, d) {
                    m = String(m);
                    d = d || 2;
                    while (m.length < d) {
                        m = "0" + m;
                    }
                    return m;
                };
                if (arguments.length == 1 && Object.prototype.toString.call(w) == "[object String]" && !/\d/.test(w)) {
                    r = w;
                    w = undefined;
                }
                w = w ? new Date(w) : new Date;
                if (isNaN(w)) {
                    throw SyntaxError("invalid date");
                }
                r = String(this.masks[r] || r || this.masks["default"]);
                if (r.slice(0, 4) == "UTC:") {
                    r = r.slice(4);
                    a = true;
                }
                var x = a ? "getUTC": "get",
                u = w[x + "Date"](),
                l = w[x + "Day"](),
                q = w[x + "Month"](),
                g = w[x + "FullYear"](),
                h = w[x + "Hours"](),
                e = w[x + "Minutes"](),
                j = w[x + "Seconds"](),
                f = w[x + "Milliseconds"](),
                n = a ? 0 : w.getTimezoneOffset(),
                b = {
                    d: u,
                    dd: t(u),
                    ddd: this.i18n.dayNames[l],
                    dddd: this.i18n.dayNames[l + 7],
                    m: q + 1,
                    mm: t(q + 1),
                    mmm: this.i18n.monthNames[q],
                    mmmm: this.i18n.monthNames[q + 12],
                    yy: String(g).slice(2),
                    yyyy: g,
                    h: h % 12 || 12,
                    hh: t(h % 12 || 12),
                    H: h,
                    HH: t(h),
                    M: e,
                    MM: t(e),
                    s: j,
                    ss: t(j),
                    l: t(f, 3),
                    L: t(f > 99 ? Math.round(f / 10) : f),
                    t: h < 12 ? "a": "p",
                    tt: h < 12 ? "am": "pm",
                    T: h < 12 ? "A": "P",
                    TT: h < 12 ? "AM": "PM",
                    Z: a ? "UTC": (String(w).match(p) || [""]).pop().replace(v, ""),
                    o: (n > 0 ? "-": "+") + t(Math.floor(Math.abs(n) / 60) * 100 + Math.abs(n) % 60, 4),
                    S: ["th", "st", "nd", "rd"][u % 10 > 3 ? 0 : (u % 100 - u % 10 != 10) * u % 10]
                };
                return r.replace(c,
                function(d) {
                    return d in b ? b[d] : d.slice(1, d.length - 1);
                });
            },
            masks: {
                "default": "ddd mmm dd yyyy HH:MM:ss",
                shortDate: "m/d/yy",
                mediumDate: "mmm d, yyyy",
                longDate: "mmmm d, yyyy",
                fullDate: "dddd, mmmm d, yyyy",
                shortTime: "h:MM TT",
                mediumTime: "h:MM:ss TT",
                longTime: "h:MM:ss TT Z",
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            },
            i18n: {
                dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            },
            parse: function(a) {
                if (typeof a !== "string" || !a.isNotBlank()) {
                    return null;
                }
                return new Date(Date.parse(a.replace(/-/g, "/")));
            },
            getIntervalTime: function(timestamp) {
                var currTimeStamp = (new Date()).getTime();
                var intervalTimeStamp = currTimeStamp - timestamp;
                var hourForOneDay = 24;  //一天24小时
                var mintuesForOneHour = 60; //一小时60分钟
                var secondsForOneMinute = 60; //一分钟60秒
                var millisecondsForOneSecond = 1000; //1秒1000毫秒

                //24个小时以内的， 显示小时
                //24小时到72小时，显示天
                //72小时以上, 显示日期
                var oneDayInterval = hourForOneDay * mintuesForOneHour * secondsForOneMinute * millisecondsForOneSecond;

                var millisecondsForOneHour = mintuesForOneHour * secondsForOneMinute * millisecondsForOneSecond
                if (intervalTimeStamp >0 && intervalTimeStamp < (oneDayInterval/24)) {
                    //return Math.round(intervalTimeStamp/ (millisecondsForOneHour/60) ) + "分以前";
                    return "刚刚";
                }
                else if(intervalTimeStamp > 0 && intervalTimeStamp < oneDayInterval ) {
                    return Math.round(intervalTimeStamp/ millisecondsForOneHour) + "小时前";

                } else if(intervalTimeStamp > oneDayInterval && intervalTimeStamp < 7 * oneDayInterval) {

                    return Math.round(intervalTimeStamp/ (hourForOneDay * millisecondsForOneHour) ) + "天之前";

                } else if(intervalTimeStamp >= 7 * oneDayInterval && intervalTimeStamp <= 30 * oneDayInterval) {

                    return "1星期之前";

                } else {
                    //return DateFormat.dateFormat(timestamp, "yyyy-mm-dd");
                    return "1个月之前";
                }
            }
        };

        return {
            timestamp : function(dt) {return DateFormat.dateFormat(dt, "yyyymmddHHMMss");},
            format: function(dt, a, b) {return DateFormat.dateFormat(dt, a, b)},
            getIntervalTime: function(t) {return DateFormat.getIntervalTime(t);}
        };
    };

    WEBP.Constant = function() {
        return {
            encode: function(a) {
                return encodeURIComponent(a);
            },
            decode: function(a) {
                return decodeURIComponent(a);
            }
        }

    };

    WEBP.CookieUtils = function() {
        return {
            getCookieValue: function(b) {
                var a = document.cookie.indexOf(";", b);
                if (a == -1) {
                    a = document.cookie.length;
                }
                return WEBP.Constant().decode(document.cookie.substring(b, a));
            },
            getCookie: function(d) {
                var b = d + "=";
                var f = b.length;
                var a = document.cookie.length;
                var e = 0;
                while (e < a) {
                    var c = e + f;
                    if (document.cookie.substring(e, c) == b) {
                        return this.getCookieValue(c);
                    }
                    e = document.cookie.indexOf(" ", e) + 1;
                    if (e == 0) {
                        break;
                    }
                }
                return null;
            },
            getExpires: function(b) {
                var a = new Date();
                a.setTime(a.getTime() + b);
                return a;
            },
            deleteCookie: function(a) {
                this.setCookie(a, "", 0, "/");
            },
            setCookie: function(c, d, b, p) {
                var a = document.domain;
                var d = c + "=" + WEBP.Constant().encode(d) + "; domain=" + a + ";path="+p;
                if (b > 0) {
                    d += " expires=" + this.getExpires(b).toGMTString();
                }
                document.cookie = d;
            }
        }
    };

    WEBP.Browser={
		versions:function(){
			var u = navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
				WindowsPhone: u.indexOf('Windows Phone') > -1, //是否为Windows Phone
				iPad: u.indexOf('iPad') > -1 //是否iPad
			};
		}(),
		language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}

})(this);


/**
* js统计上报数据到分析系说明:
*  1. 功能说明:
*      分两类数据上报，一类是用户会话公用数据上报(当会话过期或者定期上报数据到数据分析系统),一类是用户业务数据上报
*  2. 使用说明:
*      依赖组件: WEBP/0.1/util.js, WEBP/0.1/pageload.js
*      第一步: 在页面头部引入pageload.js文件用于记录页面起始加载时间点,
*      第二步: 在页面尾部引入util.js和stats.js,在并增加:
*      <script type="text/javascript">
*        try {
*            WEBP.Stats().init("from_b2c");  微信传字符串 from_wechat
*            WEBP.PageLoad().updatePageLoadEndTimestamp();

*            //test
*            //WEBP.Stats().initTest();
*        } catch (e) {
*             console.log(e);
*        }
*        </script>
*      第三步: 在具体的业务场景当中调用api, 比如：搜索时,调用WEBP.Stats().upload(2, "雅诗兰黛")
*             调用WEBP.Stats().upload(3,"1234,2343"): 类目属性过滤时上报数据
*      具体参数见下表:
*      上报数据类型           说明                                参数
*       1                   类目搜索时候上报数据,                  1,categoryId(int类型)
*       2                   关键字搜索时候上报数据                  2,searchKey,categoryId(string类型)
*       3                   类目属性过滤时候上报数据                3,pidvids(字符串)(比如: 参数pv值),categoryId, searchKey
*       10                  点击商品详情时候上报数据                10,productId(int类型)
*       11                  收藏商品时候上报数据                   11,productId(int类型)
*       12                  添加到购物车时候上报数据                12,productId, skuIds(逗号分隔),buyNum(比如： 12,32)
*       13                  提交订单时候上报数据                   13,orderId, productIds(逗号分隔)(比如： 12,32), skuIds(逗号分隔)(比如： 12,32), sales
*       14                  支付时候上报数据                      14,orderId(订单号), payType(支付类型), paySum(支付总金额),productIds, skuIds
*       15                  注册成功时候上报数据                   15,uid(用户id)
*       16                  登录成功时候上报数据                   16,uid(用户id)
*
*       20                  分享上报数据                          20,productId,uskey
*       30                  所有页面上报数据
*       40                  主页上报数据
*       50                  APP下载中转页                         50,source,type,flag(均为string类型)
*       99                  自定义
*/

;(function(){
    var WEBP = window.WEBP = window.WEBP || {};

    var pageLoadEndTimestamp = 0;
    var runSource = "";

    WEBP.Stats = function () {
        return {
            //微信使用from_mobile,商城from_pc,app是from_app
            init : function(rs) {
                runSource = typeof rs === "undefined" ?  "from_b2c" : rs;
                uploader.checkSessionData(runSource);
            },
            getActType : function() { return StatsActType; },
            upload: function() {
                try {
                    uploader.upload.apply(this, arguments);
                } catch(e) {
                    console.log(e);
                }

            },
            initTest : function() {uploaderTest.test();}
        };
    };

    /**
    *上报数据类型
    */
    var StatsActType = {
        /**
        *类目搜索时候上报数据,
        */
        ActSearchByCategory: 1,

        /**
        *关键字搜索时候上报数据
        */
        ActSearchByKey: 2,

        /**
        *类目属性过滤时候上报数据
        */
        ActSearchByPidVids: 3,

        /**
        *点击商品详情时候上报数据
        */
        ActProductDetail: 10,

        /**
        *收藏商品时候上报数据
        */
        ActFavorite: 11,

        /**
        *添加到购物车时候上报数据
        */
        ActCart: 12,

        /**
        *提交订单时候上报数据
        */
        ActOrder: 13,

        /**
        *支付时候上报数据
        */
        ActPay: 14,

        /**
        *注册成功上报数据
        */
        ActRegister: 15,

        /**
        *登录成功上报数据
        */
        ActLogin: 16,

        /**
        *分享商品上报数据
        */
        ActShare: 20,

        /**
        *所有页面上报一次
        */
        ActAll: 30,

        /**
        *主页打开一次上报
        */
        ActHome: 40,

        /**
        *APP下载中转页
        */
        ActAppdownload: 50,

        /**
        *自定义
        */
        Custom: 99
    };

    var uploaderTest = {
        test : function() {
            WEBP.Stats().upload(2, "TEST_KEY_WROED");
        },
        benchmark : function() {

        }
    };

    var dataReportEngine = {
        /**
        *搜索类目
        */
        searchByCategory : function(searchKey, categoryId, pidvids) {
            var d = { act: "/search" };
            d.search_key  = searchKey  || ''
            d.category_id = categoryId || ''
            d.pidvids     = pidvids    || ''

            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },
        /**
        *关键字搜索
        */
        searchByKey : function(searchKey, categoryId, pidvids) {
            //NOT NEED
        },
        /**
        *pidvid搜索
        */
        searchByPidVids : function(searchKey, categoryId, pidvids) {
            //NOT NEED
        },
        /**
        *点击商品详情
        */
        productDetail : function(productId) {
            var d = { product_id: productId, act: "/productDetail" };
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },
        /**
        *收藏
        */
        favorite : function(productId) {
            var d = { product_id: productId, act: "/favorite" };
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /**
        *添加到购物车
        */
        cart : function(productId, skuIds, buyNum) {
            var d = { product_id: productId, sku_id: skuIds, buy_num: buyNum, act: "/cart" };
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /**
        *提交订单
        */
        order : function(orderId, productIds, skuIds, sales) {
            var d = {order_id: orderId, product_ids: productIds, sku_ids: skuIds, sales: sales, act: "/order" };
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /**
        *支付
        */
        pay : function(orderId, payType, paySum, productIds, skuIds) {
            var d = { order_id: orderId, pay_type: payType, pay_sum: paySum, product_ids: productIds, sku_ids: skuIds, act: "/pay" };
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /**
        *注册
        */
        register : function(uid) {
            var d = { act: "/register" };
            var kvs = this.getBuzzData(uid).concat(d);
            this.uploadData(kvs);
        },

        login : function(uid) {
            var d = { act: "/login" };
            var kvs = this.getBuzzData(uid).concat(d);
            this.uploadData(kvs);
        },

        /**
        * 分享
        */
        share: function(options) {
            var d = options || {};
            d.act = "/share";

            d.share_path = helper.getPath(d.share_path)
//            d.path = helper.getPath(d.path)
//            d.referrer = helper.getReferrer(d.referrer)

            var kvs = this.getBuzzData().concat(d);
//            kvs = kvs.concat(uploader.queryOS());
            this.uploadData(kvs);
        },

        /**
        *all
        */
        all: function(options) {
            var d = options || {};
            if (typeof d === 'string') d = {}   // compatible old patch
            d.act = "/all";
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /*
        **主页上报数据
        */
        home: function() {
            var d = {act: "/home"};
            var kvs = this.getBuzzData().concat(d);
            this.uploadData(kvs);
        },

        /*
        **APP下载中转页
        */
        appdownload: function(source, type, uskey, flag) {
            var d = { act: "/appdownload", source: source || '', type: type || '', uskey: uskey || '', flag: flag || '' };
            var kvs = this.getBuzzData().concat(d);
            //kvs = kvs.concat(uploader.queryOS());
            this.uploadData(kvs);
        },

        /*
        **自定义  // 不算流量//操作类型的
        */
        custom: function(type, flag) {
            var d = { act: "/custom", type: type || '', flag: flag || '' };
            var kvs = this.getBuzzData().concat(d);
            //kvs = kvs.concat(uploader.queryOS());
            this.uploadData(kvs);
        },

        getBuzzData : function(uid, options) {
            var $cookie = WEBP.CookieUtils();
            var dateUtils = WEBP.DateUtils();

            var trackId = $cookie.getCookie("__Track_");
            var now = new Date();
            var atime = dateUtils.timestamp(now);

            var kvs = [];
            kvs.push({session_id: trackId});

            if (typeof uid !== "undefined") {
                kvs.push({uid: uid});
            } else {
                kvs.push({uid: WEBP.Config().getUid()});
            }

            kvs.push(
                //{duration: WEBP.PageLoad().getPageLoadTimestamp()},    // no ok yet
                {run_source: runSource},
                {atime: atime}
            );

            var d = {};
            var options = options || {}

            //d.path = helper.getPath(options.path)
            d.path = window.location.pathname
            d.referrer = helper.getReferrer(options.referrer)
            d.ua = helper.getUA()

            kvs = kvs.concat(d);
            kvs = kvs.concat(uploader.queryOS());

            return kvs;
        },

        uploadData : function(kvs) {
            var params = [];
            for(var i=0; i < kvs.length; i++) {
                var kv = kvs[i];
                for(var k in kv) {
                    var kvk = kv[k]
                    if (typeof kvk === 'object') kvk = JSON.stringify(kvk)
                    var val = k + "=" + kvk;
                    params.push(val);
                }
            }
            var xhrURL = WEBP.Config().getStatsUrl() + "?" + params.join("&");

            var xhr = new XMLHttpRequest();
            xhr.open('GET', xhrURL, true);
            xhr.send(null);
        }
    };

    var uploader = {
        getUploadInterval : function(){
            //上报数据时间间隔
            //24小时
            //return 3600 * 1000 * 24;
            //1分钟
            return 3600 * 1000 * 24 ;
        },

        /**
        *第一个参数必须是StatsActType类型，后面的参数依据不同的类型来调用
        */
        upload : function() {
            if (arguments.length < 2 ) {
                throw "调用参数错误";
                return;
            }
            var actType = 0;
            var args = [];

            actType = arguments[0];
            args = Array.prototype.slice.call(arguments,1);

            var func = null;
            switch(actType) {
                case StatsActType.ActSearchByCategory:
                    func = dataReportEngine.searchByCategory;
                    break;
                case StatsActType.ActSearchByKey:
                    func = dataReportEngine.searchByKey;
                    break;
                case StatsActType.ActSearchByPidVids:
                    func = dataReportEngine.searchByPidVids;
                    break;
                case StatsActType.ActProductDetail:
                    func = dataReportEngine.productDetail;
                    break;
                case StatsActType.ActFavorite:
                    func = dataReportEngine.favorite;
                    break;
                case StatsActType.ActCart:
                    func = dataReportEngine.cart;
                    break;
                case StatsActType.ActOrder:
                    func = dataReportEngine.order;
                    break;
                case StatsActType.ActPay:
                    func = dataReportEngine.pay;
                    break;
                case StatsActType.ActRegister:
                    func = dataReportEngine.register;
                    break;
                case StatsActType.ActLogin:
                    func = dataReportEngine.login;
                    break;
                case StatsActType.ActShare:
                    func = dataReportEngine.share;
                    break;
                case StatsActType.ActAll:
                    func = dataReportEngine.all;
                    break;
                case StatsActType.ActHome:
                    func = dataReportEngine.home;
                    break;
                case StatsActType.ActAppdownload:
                    func = dataReportEngine.appdownload;
                    break;
                case StatsActType.Custom:
                    func = dataReportEngine.custom;
                    break;
                default:
                    break;
            }
            if (func == null) {
                throw "不存在的上报数据请求";
                return;
            }
            func.apply(dataReportEngine, args);
        },

        checkSessionData : function(runSource) {
            var uid = WEBP.Config().getUid();
            try {
                var $cookie = WEBP.CookieUtils();
                //get last trackid
                var lastTrackId = $cookie.getCookie("lastTi");
                var lastRecordTime  = $cookie.getCookie("lastRt");
                var trackId = $cookie.getCookie("__Track_");
                var recordTime = new Date();

                if (trackId != lastTrackId) {
                    //上报数据
                    var kvs = this.querySessionDatas(trackId, uid);
                    dataReportEngine.uploadData(kvs);
                    $cookie.setCookie("lastTi", trackId);

                    if (lastRecordTime == null) {
                        //设置lastRT cookie
                        $cookie.setCookie("lastRt", recordTime.getTime());
                    }
                } else {
                    if (lastRecordTime == null) {
                        lastRecordTime = 0;
                    } else {
                        lastRecordTime = parseInt(lastRecordTime);
                    }

                    var interval = this.getUploadInterval();
                    if(recordTime.getTime() > (lastRecordTime + interval) ) {
                        var kvs = this.querySessionDatas(trackId, uid);
                        //上报数据
                        dataReportEngine.uploadData(kvs);
                        $cookie.setCookie("lastRt", recordTime.getTime());
                    }
                }

            } catch (e) {
                console.log("上报数据出错"+e);
            }
        },
        querySessionDatas : function(trackId, uid) {
            var kvs = [];

            var dateUtils = WEBP.DateUtils();

            var now = new Date();

            var atime = dateUtils.timestamp(now);
            var ref = helper.getReferrer();

            kvs.push(
                {act: "/session_data"},
                {session_id: trackId},
                {uid: uid},
                {dty: "shop"},
                {run_source: runSource},
                {referrer: ref},
                {atime: atime}
            );
            kvs = kvs.concat(uploader.queryOS());
            return kvs;
        },
        queryOS: function() {
            var kvs = [];
            var bre = helper.getBrowserVersion();
            var lla = helper.getBrowserLanguage();
            var os = helper.getOS();
            var src = helper.getScreenResoluation();

            kvs.push(
                {bre: bre},
                {lla: lla},
                {os: os},
                {src: src}
            );
            return kvs;
        }
    };

    var helper = {
        getOS: function() {
            var l = navigator.userAgent.toLowerCase();
            var d = navigator.platform;
            var e = (d === "Win32") || (d === "Windows");
            var f = (d === "Mac68K") || (d === "MacPPC") || (d === "Macintosh") || (d === "MacIntel");
            var g = l.match(/ipad/i) == "ipad";
            var h = l.match(/iphone os/i) == "iphone os";
            var c = (d === "X11") && !e && !f;
            var b = (String(d).indexOf("Linux") > -1);
            var a = l.match(/android/i) == "android";
            if (f) return "Mac";
            if (g) return "iPad";
            if (h) return "iPhone";
            if (c) return "Unix";
            if (b) {
                if (a) return "Android";
                return "Linux";
            }
            if (e) {
                var k = {
                    "ce": "WindowsMobile",
                    "mobile": "WindowsMobile",
                    "nt 5.0": "Windows2000",
                    "nt 5.1": "WindowsXP",
                    "nt 5.2": "Windows2003",
                    "nt 6.0": "WindowsVista",
                    "nt 6.1": "Windows7",
                    "nt 6.2": "Windows8",
                    "2000": "Windows2000",
                    "xp": "WindowsXP",
                    "2003": "Windows2003",
                    "vista": "WindowsVista",
                    "7": "Windows7",
                    "8": "Windows8"
                };
                for (var j in k) {
                    if (l.indexOf("windows " + j) > -1) {
                        return k[j];
                    }
                }
            }
            return "unknown";
        },
        getBrowserVersion: function() {
            var c = "unknown";
            var a = navigator.userAgent.toLowerCase();
            var b; (b = a.match(/msie ([\d.]+)/)) ? c = b[0] : (b = a.match(/firefox\/([\d.]+)/)) ? c = b[0] : (b = a.match(/yyexplorer\/([\d.]+)/)) ? c = b[0] : (b = a.match(/chrome\/([\d.]+)/)) ? c = b[0] : (b = a.match(/opera.([\d.]+)/)) ? c = b[0] : (b = a.match(/version\/([\d.]+).*safari/)) ? c = b[0] : 0;
            return c;
        },
        getBrowserLanguage: function() {
            return navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
        },
        getScreenResoluation: function() {
            return window.screen.width+"*"+window.screen.height;
        },
        getPath: function(path) {
            var path = path || window.location.href
            return encodeURIComponent(decodeURIComponent(path));
        },
        getReferrer: function(referrer) {
            var referrer = referrer || document.referrer;
            if (referrer) referrer = encodeURIComponent(decodeURIComponent(referrer))   // must decode first
            if (navigator && (navigator.userAgent.indexOf('AliApp') > -1 || navigator.userAgent.indexOf('AlipayClient') > -1)) {
                referrer = "d.alipay.com";
            }
            return referrer
        },
        getUA: function() {
            var ua = navigator.userAgent.toLowerCase();
            return encodeURIComponent(ua);
        }
    };
})(this);




var USER_BINDMODILE = (function(root, window) {

    var debug = false

    var currentTime = 60, t
    function countDown(target) {
        target.find('.countdown').text('(' + currentTime + ')');
        t = setTimeout(function () {
            if (currentTime > 0) {
                currentTime -= 1;
                target.addClass('disabled');
                countDown(target);
            } else {
                target.find('.countdown').text('');
                target.removeClass('disabled');
            }
        }, 1000);
    }

    root.bindMobile = function(mobile, captcha, callback) {
        XLJ.ajaxData('/My/bindMobile', 'POST', {mobile: mobile, captcha: captcha}, function(response) {
            console.log(response)
            if (debug) alert('/My/bindMobile: ' + JSON.stringify(response))
            if (!response.result) return
            if (callback) callback(response)
        })
    }

    root.getRegCaptcha = function(data, callback) {
        //data.smsType = 'SIGN_UP'
        return XLJ.ajaxData('/Captcha/forBindMobile', 'GET', data, callback, 'showTip')
    }

    root.checkCaptcha = function(data, callback) {
        XLJ.ajaxData('/Captcha/checkAndBind', 'GET', data, callback)
    }

    root.checkMobile = function($mobile, $msg, $btn) {
        if (!$mobile || !$mobile.length >0) return false

        var _mobile = ''
        if ($mobile[0].tagName == 'INPUT') {
            _mobile = $mobile.val()
        } else {
            _mobile = $mobile.text()
        }

        var UTILS = (XLJ.Utils) ? XLJ.Utils() : ''
        if (UTILS && (UTILS.isStringEmpty(_mobile) || !UTILS.validateMobile(_mobile))) {
            if ($msg && $msg.length > 0) {
                $msg.text($mobile.attr('data-invalid-tip'))
                $msg.addClass('show')
                setTimeout(function() {
                    $msg.text('')
                    $msg.removeClass('show')
                    if ($btn && $btn.length > 0) $btn.removeClass('disabled')
                }, 1000)
            } else {
                XLJ.tip($mobile.attr('data-invalid-tip'))
            }
            return false
        } else {
            return true
        }
    }

    root.action = function(option) {
        option.$getCaptchaBtn.off(XLJ.clickType).on(XLJ.clickType, function() {
            var _this = $(this)
            if (!root.checkMobile(option.$mobile, option.$msg, _this)) return;
            if (_this.hasClass('disabled')) return;

            var $mobile = option.$mobile,
                _mobile = ''
            if ($mobile[0].tagName == 'INPUT') {
                _mobile = $mobile.val()
            } else {
                _mobile = $mobile.text()
            }

            root.getRegCaptcha({ mobile: _mobile }, function(response) {
                if (!response.success) return _this.removeClass('disabled')

                clearTimeout(t)
                countDown(_this)
                return XLJ.tip(response.msg)
            })
        });

        option.$confirm.off(XLJ.clickType).on(XLJ.clickType, function() {
            var _this = $(this)
            if (!root.checkMobile(option.$mobile, option.$msg, _this)) return;
            if (!option.$getCaptchaBtn.length > 0) return XLJ.tip(option.$getCaptchaBtn.attr('data-invalid-tip'));

            var _mobile = option.$mobile.val(),
                _captcha = option.$checkCode.val()

            if (!_captcha) return XLJ.tip('请输入验证码')

            root.checkCaptcha({ mobile: _mobile, captcha: _captcha, smsType: 'SIGN_UP' }, function(response) {
                if (debug) alert('/Captcha/checkAndBind : ' + JSON.stringify(response))
                if (!response.success) return XLJ.tip(response.msg)
                root.bindMobile(_mobile, _captcha, function(response) {
                    option.success(response)
                })
            });

        })
    }

    root.init = function(option) {

        var option  = option || {}
        var $box    = option.$target || $('.bindmobile')
        var opt = {
            $target:        $box,
            $getCaptchaBtn: $box.find('.getCaptcha'),
            $checkCode:     $box.find('[name="checkCode"]'),
            $mobile:        $box.find('[name="mobile"]'),
            $confirm:       $box.find('.confirm'),
            $msg:           $box.find('.msg'),
            success: function() {}
        }
        option = $.extend({}, opt, option)

        root.action(option)
    }

    return root

}(USER_BINDMODILE || {}, typeof window !== 'undefined' ? window : this));


var COUPON_GIFT = (function(root, window) {

    'use strict'

    var currentTime = 60, t, _requesetBindModileDom

    root.getCoupon = function(couponId, callback) {
        var option = {couponId: couponId, v: 0}
        // var option = 'couponId=' + couponId + '&v=' + 0

        return XLJ.ajaxData('/My/sendCoupon', 'POST', JSON.stringify(option), function(response) {
            console.log(response)
            if (!response.result) return
            if (callback) callback(response)
        })
    }

    root.bindMobileAction = function(option, callback) {

        function openBox($target) {
            $target.find('.head .title').text('领取优惠劵')
            $target.find('.confirm').text('确认领取优惠劵')
            $target.popbox()
        }

        if (_requesetBindModileDom) {
            $.when(_requesetBindModileDom).done(function() {
                openBox($('#bindMobile'))
            })
            return
        }

        var $bindmobileBox = $('#bindMobile')
        if (!$bindmobileBox || $bindmobileBox.length == 0) {

            var _tpl_url = '_res/tpl/tpl_phonecheck.html'
            _requesetBindModileDom = XLJ.ajaxData(XLJ.rootPath + _tpl_url, option, function(html) {
                var _html = '<div>' + html + '</div>',
                    $html = $(_html).find('> .popbox')

                $html.attr('id', 'bindMobile')

                var $body = $('#wrap')
                if (!$body || $body.length == 0) $body = $(document.body)
                $body.append($html)
                openBox($html)

                try {
                    USER_BINDMODILE.init({
                        $target: $html,
                        success: function(response) {
                            $('#bindMobile').popbox('close')
                            if (callback) callback(response)
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            })
        }
    }


    root.action = function(elname, callback) {

        var elname = elname || '.getCouponGift',
            _getFail = false,
            _getCouponRequest = ''

        function getCoupon(_couponId, $operation) {
            if (_getFail) return

            _getCouponRequest = root.getCoupon(_couponId, function(response) {
                if (!response.success) {
                    if (!response.result.type || response.result.type == 'blind') {
                        _getFail = true
                        return XLJ.tip(response.msg)
                    } else if (response.result.type && response.result.type == 'notBlind') {
                        return root.bindMobileAction('', function(response) {
                            if (!response.success) return XLJ.tip(response.msg)
                            return getCoupon(_couponId)
                        })
                    }
                    return
                } else {
                    XLJ.tip('领取成功')
                    $('#bindMobile').popbox('close')
                }
            })

            XLJ.ajaxDataAlways(_getCouponRequest, '', function() {
                if ($operation && $operation.length > 0) $operation.removeClass('loading')
                XLJ.loadingBox('remove')
            })
        }

        var _fn = function(e) {
            // reset
            _getFail = false

            var _this = $(e.currentTarget),
                _couponId = _this.attr('data-coupon-id')

            if (!_couponId) return
            XLJ.loadingBox()
            if (_this.hasClass('loading')) return
            _this.addClass('loading')

            getCoupon(_couponId, _this)
        }

        if (XLJ.clickType == 'touchstart') {
            var _fn_temp = function() {},
                _startFn = function(e) {
                    _fn_temp = _fn
                },
                _moveFn  = function(e) {
                    _fn_temp = function() {}
                },
                _endFn   = function(e) {
                    _fn_temp(e)
                }

            $(document.body)
                .off('touchstart', elname, _startFn)
                .on('touchstart', elname, _startFn)

                .off('touchmove', elname, _moveFn)
                .on('touchmove', elname, _moveFn)

                .off('touchend', elname, _endFn)
                .on('touchend', elname, _endFn)
        } else {
            $(document.body)
                .off(XLJ.clickType, elname, _fn)
                .on(XLJ.clickType, elname, _fn)
        }

        if (callback) callback()
    }


    root.init = (function() {
        root.action()
    })();

    return root

}(COUPON_GIFT || {}, typeof window !== 'undefined' ? window : this));



/**
 * Swiper 3.2.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: November 21, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var s;return e(this).each(function(){var e=new t(this,a);s||(s=e)}),s}}var a,t=function(e,s){function r(){return"horizontal"===y.params.direction}function i(e){return Math.floor(e)}function n(){y.autoplayTimeoutId=setTimeout(function(){y.params.loop?(y.fixLoop(),y._slideNext()):y.isEnd?s.autoplayStopOnLast?y.stopAutoplay():y._slideTo(0):y._slideNext()},y.params.autoplay)}function o(e,t){var s=a(e.target);if(!s.is(t))if("string"==typeof t)s=s.parents(t);else if(t.nodeType){var r;return s.parents().each(function(e,a){a===t&&(r=t)}),r?t:void 0}if(0!==s.length)return s[0]}function l(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){y.onResize(!0),y.emit("onObserverUpdate",y,e)})});s.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),y.observers.push(s)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!y.params.allowSwipeToNext&&(r()&&39===a||!r()&&40===a))return!1;if(!y.params.allowSwipeToPrev&&(r()&&37===a||!r()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(y.container.parents(".swiper-slide").length>0&&0===y.container.parents(".swiper-slide-active").length)return;var s={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=y.container.offset();y.rtl&&(o.left=o.left-y.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+y.width,o.top],[o.left,o.top+y.height],[o.left+y.width,o.top+y.height]],p=0;p<l.length;p++){var d=l[p];d[0]>=s.left&&d[0]<=s.left+i&&d[1]>=s.top&&d[1]<=s.top+n&&(t=!0)}if(!t)return}r()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!y.rtl||37===a&&y.rtl)&&y.slideNext(),(37===a&&!y.rtl||39===a&&y.rtl)&&y.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&y.slideNext(),38===a&&y.slidePrev())}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=y.mousewheel.event,t=0;if(e.detail)t=-e.detail;else if("mousewheel"===a)if(y.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=e.wheelDelta;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(y.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(0!==t){if(y.params.mousewheelInvert&&(t=-t),y.params.freeMode){var s=y.getWrapperTranslate()+t*y.params.mousewheelSensitivity,i=y.isBeginning,n=y.isEnd;if(s>=y.minTranslate()&&(s=y.minTranslate()),s<=y.maxTranslate()&&(s=y.maxTranslate()),y.setWrapperTransition(0),y.setWrapperTranslate(s),y.updateProgress(),y.updateActiveIndex(),(!i&&y.isBeginning||!n&&y.isEnd)&&y.updateClasses(),y.params.freeModeSticky&&(clearTimeout(y.mousewheel.timeout),y.mousewheel.timeout=setTimeout(function(){y.slideReset()},300)),0===s||s===y.maxTranslate())return}else{if((new window.Date).getTime()-y.mousewheel.lastScrollTime>60)if(0>t)if(y.isEnd&&!y.params.loop||y.animating){if(y.params.mousewheelReleaseOnEdges)return!0}else y.slideNext();else if(y.isBeginning&&!y.params.loop||y.animating){if(y.params.mousewheelReleaseOnEdges)return!0}else y.slidePrev();y.mousewheel.lastScrollTime=(new window.Date).getTime()}return y.params.autoplay&&y.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function u(e,t){e=a(e);var s,i,n;s=e.attr("data-swiper-parallax")||"0",i=e.attr("data-swiper-parallax-x"),n=e.attr("data-swiper-parallax-y"),i||n?(i=i||"0",n=n||"0"):r()?(i=s,n="0"):(n=s,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t+"%":i*t+"px",n=n.indexOf("%")>=0?parseInt(n,10)*t+"%":n*t+"px",e.transform("translate3d("+i+", "+n+",0px)")}function c(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,s);var m={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,hashnav:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},f=s&&s.virtualTranslate;s=s||{};var h={};for(var g in s)if("object"==typeof s[g]){h[g]={};for(var v in s[g])h[g][v]=s[g][v]}else h[g]=s[g];for(var w in m)if("undefined"==typeof s[w])s[w]=m[w];else if("object"==typeof s[w])for(var b in m[w])"undefined"==typeof s[w][b]&&(s[w][b]=m[w][b]);var y=this;if(y.params=s,y.originalParams=h,y.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof Dom7&&(a=Dom7),("undefined"!=typeof a||(a="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7))&&(y.$=a,y.currentBreakpoint=void 0,y.getActiveBreakpoint=function(){if(!y.params.breakpoints)return!1;var e,a=!1,t=[];for(e in y.params.breakpoints)y.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var s=0;s<t.length;s++)e=t[s],e>=window.innerWidth&&!a&&(a=e);return a||"max"},y.setBreakpoint=function(){var e=y.getActiveBreakpoint();if(e&&y.currentBreakpoint!==e){var a=e in y.params.breakpoints?y.params.breakpoints[e]:y.originalParams;for(var t in a)y.params[t]=a[t];y.currentBreakpoint=e}},y.params.breakpoints&&y.setBreakpoint(),y.container=a(e),0!==y.container.length)){if(y.container.length>1)return void y.container.each(function(){new t(this,s)});y.container[0].swiper=y,y.container.data("swiper",y),y.classNames.push("swiper-container-"+y.params.direction),y.params.freeMode&&y.classNames.push("swiper-container-free-mode"),y.support.flexbox||(y.classNames.push("swiper-container-no-flexbox"),y.params.slidesPerColumn=1),y.params.autoHeight&&y.classNames.push("swiper-container-autoheight"),(y.params.parallax||y.params.watchSlidesVisibility)&&(y.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(y.params.effect)>=0&&(y.support.transforms3d?(y.params.watchSlidesProgress=!0,y.classNames.push("swiper-container-3d")):y.params.effect="slide"),"slide"!==y.params.effect&&y.classNames.push("swiper-container-"+y.params.effect),"cube"===y.params.effect&&(y.params.resistanceRatio=0,y.params.slidesPerView=1,y.params.slidesPerColumn=1,y.params.slidesPerGroup=1,y.params.centeredSlides=!1,y.params.spaceBetween=0,y.params.virtualTranslate=!0,y.params.setWrapperSize=!1),"fade"===y.params.effect&&(y.params.slidesPerView=1,y.params.slidesPerColumn=1,y.params.slidesPerGroup=1,y.params.watchSlidesProgress=!0,y.params.spaceBetween=0,"undefined"==typeof f&&(y.params.virtualTranslate=!0)),y.params.grabCursor&&y.support.touch&&(y.params.grabCursor=!1),y.wrapper=y.container.children("."+y.params.wrapperClass),y.params.pagination&&(y.paginationContainer=a(y.params.pagination),y.params.paginationClickable&&y.paginationContainer.addClass("swiper-pagination-clickable")),y.rtl=r()&&("rtl"===y.container[0].dir.toLowerCase()||"rtl"===y.container.css("direction")),y.rtl&&y.classNames.push("swiper-container-rtl"),y.rtl&&(y.wrongRTL="-webkit-box"===y.wrapper.css("display")),y.params.slidesPerColumn>1&&y.classNames.push("swiper-container-multirow"),y.device.android&&y.classNames.push("swiper-container-android"),y.container.addClass(y.classNames.join(" ")),y.translate=0,y.progress=0,y.velocity=0,y.lockSwipeToNext=function(){y.params.allowSwipeToNext=!1},y.lockSwipeToPrev=function(){y.params.allowSwipeToPrev=!1},y.lockSwipes=function(){y.params.allowSwipeToNext=y.params.allowSwipeToPrev=!1},y.unlockSwipeToNext=function(){y.params.allowSwipeToNext=!0},y.unlockSwipeToPrev=function(){y.params.allowSwipeToPrev=!0},y.unlockSwipes=function(){y.params.allowSwipeToNext=y.params.allowSwipeToPrev=!0},y.params.grabCursor&&(y.container[0].style.cursor="move",y.container[0].style.cursor="-webkit-grab",y.container[0].style.cursor="-moz-grab",y.container[0].style.cursor="grab"),y.imagesToLoad=[],y.imagesLoaded=0,y.loadImage=function(e,a,t,s,r){function i(){r&&r()}var n;e.complete&&s?i():a?(n=new window.Image,n.onload=i,n.onerror=i,t&&(n.srcset=t),a&&(n.src=a)):i()},y.preloadImages=function(){function e(){"undefined"!=typeof y&&null!==y&&(void 0!==y.imagesLoaded&&y.imagesLoaded++,y.imagesLoaded===y.imagesToLoad.length&&(y.params.updateOnImagesReady&&y.update(),y.emit("onImagesReady",y)))}y.imagesToLoad=y.container.find("img");for(var a=0;a<y.imagesToLoad.length;a++)y.loadImage(y.imagesToLoad[a],y.imagesToLoad[a].currentSrc||y.imagesToLoad[a].getAttribute("src"),y.imagesToLoad[a].srcset||y.imagesToLoad[a].getAttribute("srcset"),!0,e)},y.autoplayTimeoutId=void 0,y.autoplaying=!1,y.autoplayPaused=!1,y.startAutoplay=function(){return"undefined"!=typeof y.autoplayTimeoutId?!1:y.params.autoplay?y.autoplaying?!1:(y.autoplaying=!0,y.emit("onAutoplayStart",y),void n()):!1},y.stopAutoplay=function(e){y.autoplayTimeoutId&&(y.autoplayTimeoutId&&clearTimeout(y.autoplayTimeoutId),y.autoplaying=!1,y.autoplayTimeoutId=void 0,y.emit("onAutoplayStop",y))},y.pauseAutoplay=function(e){y.autoplayPaused||(y.autoplayTimeoutId&&clearTimeout(y.autoplayTimeoutId),y.autoplayPaused=!0,0===e?(y.autoplayPaused=!1,n()):y.wrapper.transitionEnd(function(){y&&(y.autoplayPaused=!1,y.autoplaying?n():y.stopAutoplay())}))},y.minTranslate=function(){return-y.snapGrid[0]},y.maxTranslate=function(){return-y.snapGrid[y.snapGrid.length-1]},y.updateAutoHeight=function(){var e=y.slides.eq(y.activeIndex)[0].offsetHeight;e&&y.wrapper.css("height",y.slides.eq(y.activeIndex)[0].offsetHeight+"px")},y.updateContainerSize=function(){var e,a;e="undefined"!=typeof y.params.width?y.params.width:y.container[0].clientWidth,a="undefined"!=typeof y.params.height?y.params.height:y.container[0].clientHeight,0===e&&r()||0===a&&!r()||(e=e-parseInt(y.container.css("padding-left"),10)-parseInt(y.container.css("padding-right"),10),a=a-parseInt(y.container.css("padding-top"),10)-parseInt(y.container.css("padding-bottom"),10),y.width=e,y.height=a,y.size=r()?y.width:y.height)},y.updateSlidesSize=function(){y.slides=y.wrapper.children("."+y.params.slideClass),y.snapGrid=[],y.slidesGrid=[],y.slidesSizesGrid=[];var e,a=y.params.spaceBetween,t=-y.params.slidesOffsetBefore,s=0,n=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*y.size),y.virtualSize=-a,y.rtl?y.slides.css({marginLeft:"",marginTop:""}):y.slides.css({marginRight:"",marginBottom:""});var o;y.params.slidesPerColumn>1&&(o=Math.floor(y.slides.length/y.params.slidesPerColumn)===y.slides.length/y.params.slidesPerColumn?y.slides.length:Math.ceil(y.slides.length/y.params.slidesPerColumn)*y.params.slidesPerColumn,"auto"!==y.params.slidesPerView&&"row"===y.params.slidesPerColumnFill&&(o=Math.max(o,y.params.slidesPerView*y.params.slidesPerColumn)));var l,p=y.params.slidesPerColumn,d=o/p,u=d-(y.params.slidesPerColumn*d-y.slides.length);for(e=0;e<y.slides.length;e++){l=0;var c=y.slides.eq(e);if(y.params.slidesPerColumn>1){var m,f,h;"column"===y.params.slidesPerColumnFill?(f=Math.floor(e/p),h=e-f*p,(f>u||f===u&&h===p-1)&&++h>=p&&(h=0,f++),m=f+h*o/p,c.css({"-webkit-box-ordinal-group":m,"-moz-box-ordinal-group":m,"-ms-flex-order":m,"-webkit-order":m,order:m})):(h=Math.floor(e/d),f=e-h*d),c.css({"margin-top":0!==h&&y.params.spaceBetween&&y.params.spaceBetween+"px"}).attr("data-swiper-column",f).attr("data-swiper-row",h)}"none"!==c.css("display")&&("auto"===y.params.slidesPerView?(l=r()?c.outerWidth(!0):c.outerHeight(!0),y.params.roundLengths&&(l=i(l))):(l=(y.size-(y.params.slidesPerView-1)*a)/y.params.slidesPerView,y.params.roundLengths&&(l=i(l)),r()?y.slides[e].style.width=l+"px":y.slides[e].style.height=l+"px"),y.slides[e].swiperSlideSize=l,y.slidesSizesGrid.push(l),y.params.centeredSlides?(t=t+l/2+s/2+a,0===e&&(t=t-y.size/2-a),Math.abs(t)<.001&&(t=0),n%y.params.slidesPerGroup===0&&y.snapGrid.push(t),y.slidesGrid.push(t)):(n%y.params.slidesPerGroup===0&&y.snapGrid.push(t),y.slidesGrid.push(t),t=t+l+a),y.virtualSize+=l+a,s=l,n++)}y.virtualSize=Math.max(y.virtualSize,y.size)+y.params.slidesOffsetAfter;var g;if(y.rtl&&y.wrongRTL&&("slide"===y.params.effect||"coverflow"===y.params.effect)&&y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}),(!y.support.flexbox||y.params.setWrapperSize)&&(r()?y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}):y.wrapper.css({height:y.virtualSize+y.params.spaceBetween+"px"})),y.params.slidesPerColumn>1&&(y.virtualSize=(l+y.params.spaceBetween)*o,y.virtualSize=Math.ceil(y.virtualSize/y.params.slidesPerColumn)-y.params.spaceBetween,y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}),y.params.centeredSlides)){for(g=[],e=0;e<y.snapGrid.length;e++)y.snapGrid[e]<y.virtualSize+y.snapGrid[0]&&g.push(y.snapGrid[e]);y.snapGrid=g}if(!y.params.centeredSlides){for(g=[],e=0;e<y.snapGrid.length;e++)y.snapGrid[e]<=y.virtualSize-y.size&&g.push(y.snapGrid[e]);y.snapGrid=g,Math.floor(y.virtualSize-y.size)>Math.floor(y.snapGrid[y.snapGrid.length-1])&&y.snapGrid.push(y.virtualSize-y.size)}0===y.snapGrid.length&&(y.snapGrid=[0]),0!==y.params.spaceBetween&&(r()?y.rtl?y.slides.css({marginLeft:a+"px"}):y.slides.css({marginRight:a+"px"}):y.slides.css({marginBottom:a+"px"})),y.params.watchSlidesProgress&&y.updateSlidesOffset()},y.updateSlidesOffset=function(){for(var e=0;e<y.slides.length;e++)y.slides[e].swiperSlideOffset=r()?y.slides[e].offsetLeft:y.slides[e].offsetTop},y.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=y.translate||0),0!==y.slides.length){"undefined"==typeof y.slides[0].swiperSlideOffset&&y.updateSlidesOffset();var a=-e;y.rtl&&(a=e),y.slides.removeClass(y.params.slideVisibleClass);for(var t=0;t<y.slides.length;t++){var s=y.slides[t],r=(a-s.swiperSlideOffset)/(s.swiperSlideSize+y.params.spaceBetween);if(y.params.watchSlidesVisibility){var i=-(a-s.swiperSlideOffset),n=i+y.slidesSizesGrid[t],o=i>=0&&i<y.size||n>0&&n<=y.size||0>=i&&n>=y.size;o&&y.slides.eq(t).addClass(y.params.slideVisibleClass)}s.progress=y.rtl?-r:r}}},y.updateProgress=function(e){"undefined"==typeof e&&(e=y.translate||0);var a=y.maxTranslate()-y.minTranslate(),t=y.isBeginning,s=y.isEnd;0===a?(y.progress=0,y.isBeginning=y.isEnd=!0):(y.progress=(e-y.minTranslate())/a,y.isBeginning=y.progress<=0,y.isEnd=y.progress>=1),y.isBeginning&&!t&&y.emit("onReachBeginning",y),y.isEnd&&!s&&y.emit("onReachEnd",y),y.params.watchSlidesProgress&&y.updateSlidesProgress(e),y.emit("onProgress",y,y.progress)},y.updateActiveIndex=function(){var e,a,t,s=y.rtl?y.translate:-y.translate;for(a=0;a<y.slidesGrid.length;a++)"undefined"!=typeof y.slidesGrid[a+1]?s>=y.slidesGrid[a]&&s<y.slidesGrid[a+1]-(y.slidesGrid[a+1]-y.slidesGrid[a])/2?e=a:s>=y.slidesGrid[a]&&s<y.slidesGrid[a+1]&&(e=a+1):s>=y.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/y.params.slidesPerGroup),t>=y.snapGrid.length&&(t=y.snapGrid.length-1),e!==y.activeIndex&&(y.snapIndex=t,y.previousIndex=y.activeIndex,y.activeIndex=e,y.updateClasses())},y.updateClasses=function(){y.slides.removeClass(y.params.slideActiveClass+" "+y.params.slideNextClass+" "+y.params.slidePrevClass);var e=y.slides.eq(y.activeIndex);if(e.addClass(y.params.slideActiveClass),e.next("."+y.params.slideClass).addClass(y.params.slideNextClass),e.prev("."+y.params.slideClass).addClass(y.params.slidePrevClass),y.bullets&&y.bullets.length>0){y.bullets.removeClass(y.params.bulletActiveClass);var t;y.params.loop?(t=Math.ceil(y.activeIndex-y.loopedSlides)/y.params.slidesPerGroup,t>y.slides.length-1-2*y.loopedSlides&&(t-=y.slides.length-2*y.loopedSlides),t>y.bullets.length-1&&(t-=y.bullets.length)):t="undefined"!=typeof y.snapIndex?y.snapIndex:y.activeIndex||0,y.paginationContainer.length>1?y.bullets.each(function(){a(this).index()===t&&a(this).addClass(y.params.bulletActiveClass)}):y.bullets.eq(t).addClass(y.params.bulletActiveClass)}y.params.loop||(y.params.prevButton&&(y.isBeginning?(a(y.params.prevButton).addClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.disable(a(y.params.prevButton))):(a(y.params.prevButton).removeClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.enable(a(y.params.prevButton)))),y.params.nextButton&&(y.isEnd?(a(y.params.nextButton).addClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.disable(a(y.params.nextButton))):(a(y.params.nextButton).removeClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.enable(a(y.params.nextButton)))))},y.updatePagination=function(){if(y.params.pagination&&y.paginationContainer&&y.paginationContainer.length>0){for(var e="",a=y.params.loop?Math.ceil((y.slides.length-2*y.loopedSlides)/y.params.slidesPerGroup):y.snapGrid.length,t=0;a>t;t++)e+=y.params.paginationBulletRender?y.params.paginationBulletRender(t,y.params.bulletClass):"<"+y.params.paginationElement+' class="'+y.params.bulletClass+'"></'+y.params.paginationElement+">";y.paginationContainer.html(e),y.bullets=y.paginationContainer.find("."+y.params.bulletClass),y.params.paginationClickable&&y.params.a11y&&y.a11y&&y.a11y.initPagination()}},y.update=function(e){function a(){s=Math.min(Math.max(y.translate,y.maxTranslate()),y.minTranslate()),y.setWrapperTranslate(s),y.updateActiveIndex(),y.updateClasses()}if(y.updateContainerSize(),y.updateSlidesSize(),y.updateProgress(),y.updatePagination(),y.updateClasses(),y.params.scrollbar&&y.scrollbar&&y.scrollbar.set(),e){var t,s;y.controller&&y.controller.spline&&(y.controller.spline=void 0),y.params.freeMode?(a(),y.params.autoHeight&&y.updateAutoHeight()):(t=("auto"===y.params.slidesPerView||y.params.slidesPerView>1)&&y.isEnd&&!y.params.centeredSlides?y.slideTo(y.slides.length-1,0,!1,!0):y.slideTo(y.activeIndex,0,!1,!0),t||a())}else y.params.autoHeight&&y.updateAutoHeight()},y.onResize=function(e){y.params.breakpoints&&y.setBreakpoint();var a=y.params.allowSwipeToPrev,t=y.params.allowSwipeToNext;if(y.params.allowSwipeToPrev=y.params.allowSwipeToNext=!0,y.updateContainerSize(),y.updateSlidesSize(),("auto"===y.params.slidesPerView||y.params.freeMode||e)&&y.updatePagination(),y.params.scrollbar&&y.scrollbar&&y.scrollbar.set(),y.controller&&y.controller.spline&&(y.controller.spline=void 0),y.params.freeMode){var s=Math.min(Math.max(y.translate,y.maxTranslate()),y.minTranslate());y.setWrapperTranslate(s),y.updateActiveIndex(),y.updateClasses(),y.params.autoHeight&&y.updateAutoHeight()}else y.updateClasses(),("auto"===y.params.slidesPerView||y.params.slidesPerView>1)&&y.isEnd&&!y.params.centeredSlides?y.slideTo(y.slides.length-1,0,!1,!0):y.slideTo(y.activeIndex,0,!1,!0);y.params.allowSwipeToPrev=a,y.params.allowSwipeToNext=t};var x=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?x=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(x=["MSPointerDown","MSPointerMove","MSPointerUp"]),y.touchEvents={start:y.support.touch||!y.params.simulateTouch?"touchstart":x[0],move:y.support.touch||!y.params.simulateTouch?"touchmove":x[1],end:y.support.touch||!y.params.simulateTouch?"touchend":x[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===y.params.touchEventsTarget?y.container:y.wrapper).addClass("swiper-wp8-"+y.params.direction),y.initEvents=function(e){var t=e?"off":"on",r=e?"removeEventListener":"addEventListener",i="container"===y.params.touchEventsTarget?y.container[0]:y.wrapper[0],n=y.support.touch?i:document,o=y.params.nested?!0:!1;y.browser.ie?(i[r](y.touchEvents.start,y.onTouchStart,!1),n[r](y.touchEvents.move,y.onTouchMove,o),n[r](y.touchEvents.end,y.onTouchEnd,!1)):(y.support.touch&&(i[r](y.touchEvents.start,y.onTouchStart,!1),i[r](y.touchEvents.move,y.onTouchMove,o),i[r](y.touchEvents.end,y.onTouchEnd,!1)),!s.simulateTouch||y.device.ios||y.device.android||(i[r]("mousedown",y.onTouchStart,!1),document[r]("mousemove",y.onTouchMove,o),document[r]("mouseup",y.onTouchEnd,!1))),window[r]("resize",y.onResize),y.params.nextButton&&(a(y.params.nextButton)[t]("click",y.onClickNext),y.params.a11y&&y.a11y&&a(y.params.nextButton)[t]("keydown",y.a11y.onEnterKey)),y.params.prevButton&&(a(y.params.prevButton)[t]("click",y.onClickPrev),y.params.a11y&&y.a11y&&a(y.params.prevButton)[t]("keydown",y.a11y.onEnterKey)),y.params.pagination&&y.params.paginationClickable&&(a(y.paginationContainer)[t]("click","."+y.params.bulletClass,y.onClickIndex),y.params.a11y&&y.a11y&&a(y.paginationContainer)[t]("keydown","."+y.params.bulletClass,y.a11y.onEnterKey)),(y.params.preventClicks||y.params.preventClicksPropagation)&&i[r]("click",y.preventClicks,!0)},y.attachEvents=function(e){y.initEvents()},y.detachEvents=function(){y.initEvents(!0)},y.allowClick=!0,y.preventClicks=function(e){y.allowClick||(y.params.preventClicks&&e.preventDefault(),y.params.preventClicksPropagation&&y.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},y.onClickNext=function(e){e.preventDefault(),(!y.isEnd||y.params.loop)&&y.slideNext()},y.onClickPrev=function(e){e.preventDefault(),(!y.isBeginning||y.params.loop)&&y.slidePrev()},y.onClickIndex=function(e){e.preventDefault();var t=a(this).index()*y.params.slidesPerGroup;y.params.loop&&(t+=y.loopedSlides),y.slideTo(t)},y.updateClickedSlide=function(e){var t=o(e,"."+y.params.slideClass),s=!1;if(t)for(var r=0;r<y.slides.length;r++)y.slides[r]===t&&(s=!0);if(!t||!s)return y.clickedSlide=void 0,void(y.clickedIndex=void 0);if(y.clickedSlide=t,y.clickedIndex=a(t).index(),y.params.slideToClickedSlide&&void 0!==y.clickedIndex&&y.clickedIndex!==y.activeIndex){var i,n=y.clickedIndex;if(y.params.loop){if(y.animating)return;i=a(y.clickedSlide).attr("data-swiper-slide-index"),y.params.centeredSlides?n<y.loopedSlides-y.params.slidesPerView/2||n>y.slides.length-y.loopedSlides+y.params.slidesPerView/2?(y.fixLoop(),n=y.wrapper.children("."+y.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){y.slideTo(n)},0)):y.slideTo(n):n>y.slides.length-y.params.slidesPerView?(y.fixLoop(),n=y.wrapper.children("."+y.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){y.slideTo(n)},0)):y.slideTo(n)}else y.slideTo(n)}};var T,S,C,M,P,I,k,z,E,D,L="input, select, textarea, button",B=Date.now(),G=[];y.animating=!1,y.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var A,O;if(y.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),A="touchstart"===e.type,A||!("which"in e)||3!==e.which){if(y.params.noSwiping&&o(e,"."+y.params.noSwipingClass))return void(y.allowClick=!0);if(!y.params.swipeHandler||o(e,y.params.swipeHandler)){var t=y.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s=y.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(y.device.ios&&y.params.iOSEdgeSwipeDetection&&t<=y.params.iOSEdgeSwipeThreshold)){if(T=!0,S=!1,C=!0,P=void 0,O=void 0,y.touches.startX=t,y.touches.startY=s,M=Date.now(),y.allowClick=!0,y.updateContainerSize(),y.swipeDirection=void 0,y.params.threshold>0&&(z=!1),"touchstart"!==e.type){var r=!0;a(e.target).is(L)&&(r=!1),document.activeElement&&a(document.activeElement).is(L)&&document.activeElement.blur(),r&&e.preventDefault()}y.emit("onTouchStart",y,e)}}}},y.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(A&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(y.params.onlyExternal)return y.allowClick=!1,void(T&&(y.touches.startX=y.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,y.touches.startY=y.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,M=Date.now()));if(A&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(L))return S=!0,void(y.allowClick=!1);if(C&&y.emit("onTouchMove",y,e),!(e.targetTouches&&e.targetTouches.length>1)){if(y.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,y.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof P){var t=180*Math.atan2(Math.abs(y.touches.currentY-y.touches.startY),Math.abs(y.touches.currentX-y.touches.startX))/Math.PI;P=r()?t>y.params.touchAngle:90-t>y.params.touchAngle}if(P&&y.emit("onTouchMoveOpposite",y,e),"undefined"==typeof O&&y.browser.ieTouch&&(y.touches.currentX!==y.touches.startX||y.touches.currentY!==y.touches.startY)&&(O=!0),T){if(P)return void(T=!1);if(O||!y.browser.ieTouch){y.allowClick=!1,y.emit("onSliderMove",y,e),e.preventDefault(),y.params.touchMoveStopPropagation&&!y.params.nested&&e.stopPropagation(),S||(s.loop&&y.fixLoop(),k=y.getWrapperTranslate(),y.setWrapperTransition(0),y.animating&&y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),y.params.autoplay&&y.autoplaying&&(y.params.autoplayDisableOnInteraction?y.stopAutoplay():y.pauseAutoplay()),D=!1,y.params.grabCursor&&(y.container[0].style.cursor="move",y.container[0].style.cursor="-webkit-grabbing",y.container[0].style.cursor="-moz-grabbin",y.container[0].style.cursor="grabbing")),S=!0;var i=y.touches.diff=r()?y.touches.currentX-y.touches.startX:y.touches.currentY-y.touches.startY;i*=y.params.touchRatio,y.rtl&&(i=-i),y.swipeDirection=i>0?"prev":"next",I=i+k;var n=!0;if(i>0&&I>y.minTranslate()?(n=!1,y.params.resistance&&(I=y.minTranslate()-1+Math.pow(-y.minTranslate()+k+i,y.params.resistanceRatio))):0>i&&I<y.maxTranslate()&&(n=!1,y.params.resistance&&(I=y.maxTranslate()+1-Math.pow(y.maxTranslate()-k-i,y.params.resistanceRatio))),n&&(e.preventedByNestedSwiper=!0),!y.params.allowSwipeToNext&&"next"===y.swipeDirection&&k>I&&(I=k),!y.params.allowSwipeToPrev&&"prev"===y.swipeDirection&&I>k&&(I=k),y.params.followFinger){if(y.params.threshold>0){if(!(Math.abs(i)>y.params.threshold||z))return void(I=k);if(!z)return z=!0,y.touches.startX=y.touches.currentX,y.touches.startY=y.touches.currentY,I=k,void(y.touches.diff=r()?y.touches.currentX-y.touches.startX:y.touches.currentY-y.touches.startY)}(y.params.freeMode||y.params.watchSlidesProgress)&&y.updateActiveIndex(),y.params.freeMode&&(0===G.length&&G.push({position:y.touches[r()?"startX":"startY"],time:M}),G.push({position:y.touches[r()?"currentX":"currentY"],time:(new window.Date).getTime()})),y.updateProgress(I),y.setWrapperTranslate(I)}}}}}},y.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),C&&y.emit("onTouchEnd",y,e),C=!1,T){y.params.grabCursor&&S&&T&&(y.container[0].style.cursor="move",y.container[0].style.cursor="-webkit-grab",y.container[0].style.cursor="-moz-grab",y.container[0].style.cursor="grab");var t=Date.now(),s=t-M;if(y.allowClick&&(y.updateClickedSlide(e),y.emit("onTap",y,e),300>s&&t-B>300&&(E&&clearTimeout(E),E=setTimeout(function(){y&&(y.params.paginationHide&&y.paginationContainer.length>0&&!a(e.target).hasClass(y.params.bulletClass)&&y.paginationContainer.toggleClass(y.params.paginationHiddenClass),y.emit("onClick",y,e))},300)),300>s&&300>t-B&&(E&&clearTimeout(E),y.emit("onDoubleTap",y,e))),B=Date.now(),setTimeout(function(){y&&(y.allowClick=!0)},0),!T||!S||!y.swipeDirection||0===y.touches.diff||I===k)return void(T=S=!1);T=S=!1;var r;if(r=y.params.followFinger?y.rtl?y.translate:-y.translate:-I,y.params.freeMode){if(r<-y.minTranslate())return void y.slideTo(y.activeIndex);if(r>-y.maxTranslate())return void(y.slides.length<y.snapGrid.length?y.slideTo(y.snapGrid.length-1):y.slideTo(y.slides.length-1));if(y.params.freeModeMomentum){if(G.length>1){var i=G.pop(),n=G.pop(),o=i.position-n.position,l=i.time-n.time;y.velocity=o/l,y.velocity=y.velocity/2,Math.abs(y.velocity)<y.params.freeModeMinimumVelocity&&(y.velocity=0),(l>150||(new window.Date).getTime()-i.time>300)&&(y.velocity=0)}else y.velocity=0;G.length=0;var p=1e3*y.params.freeModeMomentumRatio,d=y.velocity*p,u=y.translate+d;y.rtl&&(u=-u);var c,m=!1,f=20*Math.abs(y.velocity)*y.params.freeModeMomentumBounceRatio;if(u<y.maxTranslate())y.params.freeModeMomentumBounce?(u+y.maxTranslate()<-f&&(u=y.maxTranslate()-f),c=y.maxTranslate(),m=!0,D=!0):u=y.maxTranslate();else if(u>y.minTranslate())y.params.freeModeMomentumBounce?(u-y.minTranslate()>f&&(u=y.minTranslate()+f),c=y.minTranslate(),m=!0,D=!0):u=y.minTranslate();else if(y.params.freeModeSticky){var h,g=0;for(g=0;g<y.snapGrid.length;g+=1)if(y.snapGrid[g]>-u){h=g;break}u=Math.abs(y.snapGrid[h]-u)<Math.abs(y.snapGrid[h-1]-u)||"next"===y.swipeDirection?y.snapGrid[h]:y.snapGrid[h-1],y.rtl||(u=-u)}if(0!==y.velocity)p=y.rtl?Math.abs((-u-y.translate)/y.velocity):Math.abs((u-y.translate)/y.velocity);else if(y.params.freeModeSticky)return void y.slideReset();y.params.freeModeMomentumBounce&&m?(y.updateProgress(c),y.setWrapperTransition(p),y.setWrapperTranslate(u),y.onTransitionStart(),y.animating=!0,y.wrapper.transitionEnd(function(){y&&D&&(y.emit("onMomentumBounce",y),y.setWrapperTransition(y.params.speed),y.setWrapperTranslate(c),y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd()}))})):y.velocity?(y.updateProgress(u),y.setWrapperTransition(p),y.setWrapperTranslate(u),y.onTransitionStart(),y.animating||(y.animating=!0,y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd()}))):y.updateProgress(u),y.updateActiveIndex()}return void((!y.params.freeModeMomentum||s>=y.params.longSwipesMs)&&(y.updateProgress(),y.updateActiveIndex()))}var v,w=0,b=y.slidesSizesGrid[0];for(v=0;v<y.slidesGrid.length;v+=y.params.slidesPerGroup)"undefined"!=typeof y.slidesGrid[v+y.params.slidesPerGroup]?r>=y.slidesGrid[v]&&r<y.slidesGrid[v+y.params.slidesPerGroup]&&(w=v,b=y.slidesGrid[v+y.params.slidesPerGroup]-y.slidesGrid[v]):r>=y.slidesGrid[v]&&(w=v,
b=y.slidesGrid[y.slidesGrid.length-1]-y.slidesGrid[y.slidesGrid.length-2]);var x=(r-y.slidesGrid[w])/b;if(s>y.params.longSwipesMs){if(!y.params.longSwipes)return void y.slideTo(y.activeIndex);"next"===y.swipeDirection&&(x>=y.params.longSwipesRatio?y.slideTo(w+y.params.slidesPerGroup):y.slideTo(w)),"prev"===y.swipeDirection&&(x>1-y.params.longSwipesRatio?y.slideTo(w+y.params.slidesPerGroup):y.slideTo(w))}else{if(!y.params.shortSwipes)return void y.slideTo(y.activeIndex);"next"===y.swipeDirection&&y.slideTo(w+y.params.slidesPerGroup),"prev"===y.swipeDirection&&y.slideTo(w)}}},y._slideTo=function(e,a){return y.slideTo(e,a,!0,!0)},y.slideTo=function(e,a,t,s){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),y.snapIndex=Math.floor(e/y.params.slidesPerGroup),y.snapIndex>=y.snapGrid.length&&(y.snapIndex=y.snapGrid.length-1);var r=-y.snapGrid[y.snapIndex];y.params.autoplay&&y.autoplaying&&(s||!y.params.autoplayDisableOnInteraction?y.pauseAutoplay(a):y.stopAutoplay()),y.updateProgress(r);for(var i=0;i<y.slidesGrid.length;i++)-Math.floor(100*r)>=Math.floor(100*y.slidesGrid[i])&&(e=i);return!y.params.allowSwipeToNext&&r<y.translate&&r<y.minTranslate()?!1:!y.params.allowSwipeToPrev&&r>y.translate&&r>y.maxTranslate()&&(y.activeIndex||0)!==e?!1:("undefined"==typeof a&&(a=y.params.speed),y.previousIndex=y.activeIndex||0,y.activeIndex=e,y.params.autoHeight&&y.updateAutoHeight(),r===y.translate?(y.updateClasses(),"slide"!==y.params.effect&&y.setWrapperTranslate(r),!1):(y.updateClasses(),y.onTransitionStart(t),0===a?(y.setWrapperTransition(0),y.setWrapperTranslate(r),y.onTransitionEnd(t)):(y.setWrapperTransition(a),y.setWrapperTranslate(r),y.animating||(y.animating=!0,y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd(t)}))),!0))},y.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),y.lazy&&y.lazy.onTransitionStart(),e&&(y.emit("onTransitionStart",y),y.activeIndex!==y.previousIndex&&(y.emit("onSlideChangeStart",y),y.activeIndex>y.previousIndex?y.emit("onSlideNextStart",y):y.emit("onSlidePrevStart",y)))},y.onTransitionEnd=function(e){y.animating=!1,y.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),y.lazy&&y.lazy.onTransitionEnd(),e&&(y.emit("onTransitionEnd",y),y.activeIndex!==y.previousIndex&&(y.emit("onSlideChangeEnd",y),y.activeIndex>y.previousIndex?y.emit("onSlideNextEnd",y):y.emit("onSlidePrevEnd",y))),y.params.hashnav&&y.hashnav&&y.hashnav.setHash()},y.slideNext=function(e,a,t){if(y.params.loop){if(y.animating)return!1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex+y.params.slidesPerGroup,a,e,t)}return y.slideTo(y.activeIndex+y.params.slidesPerGroup,a,e,t)},y._slideNext=function(e){return y.slideNext(!0,e,!0)},y.slidePrev=function(e,a,t){if(y.params.loop){if(y.animating)return!1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex-1,a,e,t)}return y.slideTo(y.activeIndex-1,a,e,t)},y._slidePrev=function(e){return y.slidePrev(!0,e,!0)},y.slideReset=function(e,a,t){return y.slideTo(y.activeIndex,a,e)},y.setWrapperTransition=function(e,a){y.wrapper.transition(e),"slide"!==y.params.effect&&y.effects[y.params.effect]&&y.effects[y.params.effect].setTransition(e),y.params.parallax&&y.parallax&&y.parallax.setTransition(e),y.params.scrollbar&&y.scrollbar&&y.scrollbar.setTransition(e),y.params.control&&y.controller&&y.controller.setTransition(e,a),y.emit("onSetTransition",y,e)},y.setWrapperTranslate=function(e,a,t){var s=0,n=0,o=0;r()?s=y.rtl?-e:e:n=e,y.params.roundLengths&&(s=i(s),n=i(n)),y.params.virtualTranslate||(y.support.transforms3d?y.wrapper.transform("translate3d("+s+"px, "+n+"px, "+o+"px)"):y.wrapper.transform("translate("+s+"px, "+n+"px)")),y.translate=r()?s:n;var l,p=y.maxTranslate()-y.minTranslate();l=0===p?0:(e-y.minTranslate())/p,l!==y.progress&&y.updateProgress(e),a&&y.updateActiveIndex(),"slide"!==y.params.effect&&y.effects[y.params.effect]&&y.effects[y.params.effect].setTranslate(y.translate),y.params.parallax&&y.parallax&&y.parallax.setTranslate(y.translate),y.params.scrollbar&&y.scrollbar&&y.scrollbar.setTranslate(y.translate),y.params.control&&y.controller&&y.controller.setTranslate(y.translate,t),y.emit("onSetTranslate",y,y.translate)},y.getTranslate=function(e,a){var t,s,r,i;return"undefined"==typeof a&&(a="x"),y.params.virtualTranslate?y.rtl?-y.translate:y.translate:(r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=r.transform||r.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),i=new window.WebKitCSSMatrix("none"===s?"":s)):(i=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?i.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(s=window.WebKitCSSMatrix?i.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),y.rtl&&s&&(s=-s),s||0)},y.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=r()?"x":"y"),y.getTranslate(y.wrapper[0],e)},y.observers=[],y.initObservers=function(){if(y.params.observeParents)for(var e=y.container.parents(),a=0;a<e.length;a++)l(e[a]);l(y.container[0],{childList:!1}),l(y.wrapper[0],{attributes:!1})},y.disconnectObservers=function(){for(var e=0;e<y.observers.length;e++)y.observers[e].disconnect();y.observers=[]},y.createLoop=function(){y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass).remove();var e=y.wrapper.children("."+y.params.slideClass);"auto"!==y.params.slidesPerView||y.params.loopedSlides||(y.params.loopedSlides=e.length),y.loopedSlides=parseInt(y.params.loopedSlides||y.params.slidesPerView,10),y.loopedSlides=y.loopedSlides+y.params.loopAdditionalSlides,y.loopedSlides>e.length&&(y.loopedSlides=e.length);var t,s=[],r=[];for(e.each(function(t,i){var n=a(this);t<y.loopedSlides&&r.push(i),t<e.length&&t>=e.length-y.loopedSlides&&s.push(i),n.attr("data-swiper-slide-index",t)}),t=0;t<r.length;t++)y.wrapper.append(a(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));for(t=s.length-1;t>=0;t--)y.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass))},y.destroyLoop=function(){y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass).remove(),y.slides.removeAttr("data-swiper-slide-index")},y.fixLoop=function(){var e;y.activeIndex<y.loopedSlides?(e=y.slides.length-3*y.loopedSlides+y.activeIndex,e+=y.loopedSlides,y.slideTo(e,0,!1,!0)):("auto"===y.params.slidesPerView&&y.activeIndex>=2*y.loopedSlides||y.activeIndex>y.slides.length-2*y.params.slidesPerView)&&(e=-y.slides.length+y.activeIndex+y.loopedSlides,e+=y.loopedSlides,y.slideTo(e,0,!1,!0))},y.appendSlide=function(e){if(y.params.loop&&y.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&y.wrapper.append(e[a]);else y.wrapper.append(e);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0)},y.prependSlide=function(e){y.params.loop&&y.destroyLoop();var a=y.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&y.wrapper.prepend(e[t]);a=y.activeIndex+e.length}else y.wrapper.prepend(e);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0),y.slideTo(a,0,!1)},y.removeSlide=function(e){y.params.loop&&(y.destroyLoop(),y.slides=y.wrapper.children("."+y.params.slideClass));var a,t=y.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],y.slides[a]&&y.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,y.slides[a]&&y.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0),y.params.loop?y.slideTo(t+y.loopedSlides,0,!1):y.slideTo(t,0,!1)},y.removeAllSlides=function(){for(var e=[],a=0;a<y.slides.length;a++)e.push(a);y.removeSlide(e)},y.effects={fade:{setTranslate:function(){for(var e=0;e<y.slides.length;e++){var a=y.slides.eq(e),t=a[0].swiperSlideOffset,s=-t;y.params.virtualTranslate||(s-=y.translate);var i=0;r()||(i=s,s=0);var n=y.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+s+"px, "+i+"px, 0px)")}},setTransition:function(e){if(y.slides.transition(e),y.params.virtualTranslate&&0!==e){var a=!1;y.slides.transitionEnd(function(){if(!a&&y){a=!0,y.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)y.wrapper.trigger(e[t])}})}}},cube:{setTranslate:function(){var e,t=0;y.params.cube.shadow&&(r()?(e=y.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),y.wrapper.append(e)),e.css({height:y.width+"px"})):(e=y.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),y.container.append(e))));for(var s=0;s<y.slides.length;s++){var i=y.slides.eq(s),n=90*s,o=Math.floor(n/360);y.rtl&&(n=-n,o=Math.floor(-n/360));var l=Math.max(Math.min(i[0].progress,1),-1),p=0,d=0,u=0;s%4===0?(p=4*-o*y.size,u=0):(s-1)%4===0?(p=0,u=4*-o*y.size):(s-2)%4===0?(p=y.size+4*o*y.size,u=y.size):(s-3)%4===0&&(p=-y.size,u=3*y.size+4*y.size*o),y.rtl&&(p=-p),r()||(d=p,p=0);var c="rotateX("+(r()?0:-n)+"deg) rotateY("+(r()?n:0)+"deg) translate3d("+p+"px, "+d+"px, "+u+"px)";if(1>=l&&l>-1&&(t=90*s+90*l,y.rtl&&(t=90*-s-90*l)),i.transform(c),y.params.cube.slideShadows){var m=r()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),f=r()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),i.append(m)),0===f.length&&(f=a('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),i.append(f));i[0].progress;m.length&&(m[0].style.opacity=-i[0].progress),f.length&&(f[0].style.opacity=i[0].progress)}}if(y.wrapper.css({"-webkit-transform-origin":"50% 50% -"+y.size/2+"px","-moz-transform-origin":"50% 50% -"+y.size/2+"px","-ms-transform-origin":"50% 50% -"+y.size/2+"px","transform-origin":"50% 50% -"+y.size/2+"px"}),y.params.cube.shadow)if(r())e.transform("translate3d(0px, "+(y.width/2+y.params.cube.shadowOffset)+"px, "+-y.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+y.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),v=y.params.cube.shadowScale,w=y.params.cube.shadowScale/g,b=y.params.cube.shadowOffset;e.transform("scale3d("+v+", 1, "+w+") translate3d(0px, "+(y.height/2+b)+"px, "+-y.height/2/w+"px) rotateX(-90deg)")}var x=y.isSafari||y.isUiWebView?-y.size/2:0;y.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(r()?0:t)+"deg) rotateY("+(r()?-t:0)+"deg)")},setTransition:function(e){y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),y.params.cube.shadow&&!r()&&y.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=y.translate,t=r()?-e+y.width/2:-e+y.height/2,s=r()?y.params.coverflow.rotate:-y.params.coverflow.rotate,i=y.params.coverflow.depth,n=0,o=y.slides.length;o>n;n++){var l=y.slides.eq(n),p=y.slidesSizesGrid[n],d=l[0].swiperSlideOffset,u=(t-d-p/2)/p*y.params.coverflow.modifier,c=r()?s*u:0,m=r()?0:s*u,f=-i*Math.abs(u),h=r()?0:y.params.coverflow.stretch*u,g=r()?y.params.coverflow.stretch*u:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(f)<.001&&(f=0),Math.abs(c)<.001&&(c=0),Math.abs(m)<.001&&(m=0);var v="translate3d("+g+"px,"+h+"px,"+f+"px)  rotateX("+m+"deg) rotateY("+c+"deg)";if(l.transform(v),l[0].style.zIndex=-Math.abs(Math.round(u))+1,y.params.coverflow.slideShadows){var w=r()?l.find(".swiper-slide-shadow-left"):l.find(".swiper-slide-shadow-top"),b=r()?l.find(".swiper-slide-shadow-right"):l.find(".swiper-slide-shadow-bottom");0===w.length&&(w=a('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),l.append(w)),0===b.length&&(b=a('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),l.append(b)),w.length&&(w[0].style.opacity=u>0?u:0),b.length&&(b[0].style.opacity=-u>0?-u:0)}}if(y.browser.ie){var x=y.wrapper[0].style;x.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},y.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==y.slides.length)){var s=y.slides.eq(e),r=s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!s.hasClass("swiper-lazy")||s.hasClass("swiper-lazy-loaded")||s.hasClass("swiper-lazy-loading")||(r=r.add(s[0])),0!==r.length&&r.each(function(){var e=a(this);e.addClass("swiper-lazy-loading");var r=e.attr("data-background"),i=e.attr("data-src"),n=e.attr("data-srcset");y.loadImage(e[0],i||r,n,!1,function(){if(r?(e.css("background-image","url("+r+")"),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),i&&(e.attr("src",i),e.removeAttr("data-src"))),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),s.find(".swiper-lazy-preloader, .preloader").remove(),y.params.loop&&t){var a=s.attr("data-swiper-slide-index");if(s.hasClass(y.params.slideDuplicateClass)){var o=y.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+y.params.slideDuplicateClass+")");y.lazy.loadImageInSlide(o.index(),!1)}else{var l=y.wrapper.children("."+y.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');y.lazy.loadImageInSlide(l.index(),!1)}}y.emit("onLazyImageReady",y,s[0],e[0])}),y.emit("onLazyImageLoad",y,s[0],e[0])})}},load:function(){var e;if(y.params.watchSlidesVisibility)y.wrapper.children("."+y.params.slideVisibleClass).each(function(){y.lazy.loadImageInSlide(a(this).index())});else if(y.params.slidesPerView>1)for(e=y.activeIndex;e<y.activeIndex+y.params.slidesPerView;e++)y.slides[e]&&y.lazy.loadImageInSlide(e);else y.lazy.loadImageInSlide(y.activeIndex);if(y.params.lazyLoadingInPrevNext)if(y.params.slidesPerView>1){for(e=y.activeIndex+y.params.slidesPerView;e<y.activeIndex+y.params.slidesPerView+y.params.slidesPerView;e++)y.slides[e]&&y.lazy.loadImageInSlide(e);for(e=y.activeIndex-y.params.slidesPerView;e<y.activeIndex;e++)y.slides[e]&&y.lazy.loadImageInSlide(e)}else{var t=y.wrapper.children("."+y.params.slideNextClass);t.length>0&&y.lazy.loadImageInSlide(t.index());var s=y.wrapper.children("."+y.params.slidePrevClass);s.length>0&&y.lazy.loadImageInSlide(s.index())}},onTransitionStart:function(){y.params.lazyLoading&&(y.params.lazyLoadingOnTransitionStart||!y.params.lazyLoadingOnTransitionStart&&!y.lazy.initialImageLoaded)&&y.lazy.load()},onTransitionEnd:function(){y.params.lazyLoading&&!y.params.lazyLoadingOnTransitionStart&&y.lazy.load()}},y.scrollbar={isTouched:!1,setDragPosition:function(e){var a=y.scrollbar,t=r()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=t-a.track.offset()[r()?"left":"top"]-a.dragSize/2,i=-y.minTranslate()*a.moveDivider,n=-y.maxTranslate()*a.moveDivider;i>s?s=i:s>n&&(s=n),s=-s/a.moveDivider,y.updateProgress(s),y.setWrapperTranslate(s,!0)},dragStart:function(e){var a=y.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),y.params.scrollbarHide&&a.track.css("opacity",1),y.wrapper.transition(100),a.drag.transition(100),y.emit("onScrollbarDragStart",y)},dragMove:function(e){var a=y.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),y.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),y.emit("onScrollbarDragMove",y))},dragEnd:function(e){var a=y.scrollbar;a.isTouched&&(a.isTouched=!1,y.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),y.emit("onScrollbarDragEnd",y),y.params.scrollbarSnapOnRelease&&y.slideReset())},enableDraggable:function(){var e=y.scrollbar,t=y.support.touch?e.track:document;a(e.track).on(y.touchEvents.start,e.dragStart),a(t).on(y.touchEvents.move,e.dragMove),a(t).on(y.touchEvents.end,e.dragEnd)},disableDraggable:function(){var e=y.scrollbar,t=y.support.touch?e.track:document;a(e.track).off(y.touchEvents.start,e.dragStart),a(t).off(y.touchEvents.move,e.dragMove),a(t).off(y.touchEvents.end,e.dragEnd)},set:function(){if(y.params.scrollbar){var e=y.scrollbar;e.track=a(y.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=r()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=y.size/y.virtualSize,e.moveDivider=e.divider*(e.trackSize/y.size),e.dragSize=e.trackSize*e.divider,r()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.divider>=1?e.track[0].style.display="none":e.track[0].style.display="",y.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(y.params.scrollbar){var e,a=y.scrollbar,t=(y.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*y.progress,y.rtl&&r()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),r()?(y.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(y.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),y.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){y.params.scrollbar&&y.scrollbar.drag.transition(e)}},y.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;var t,s;this.x.length;this.interpolate=function(e){return e?(s=r(this.x,e),t=s-1,(e-this.x[t])*(this.y[s]-this.y[t])/(this.x[s]-this.x[t])+this.y[t]):0};var r=function(){var e,a,t;return function(s,r){for(a=-1,e=s.length;e-a>1;)s[t=e+a>>1]<=r?a=t:e=t;return e}}()},getInterpolateFunction:function(e){y.controller.spline||(y.controller.spline=y.params.loop?new y.controller.LinearSpline(y.slidesGrid,e.slidesGrid):new y.controller.LinearSpline(y.snapGrid,e.snapGrid))},setTranslate:function(e,a){function s(a){e=a.rtl&&"horizontal"===a.params.direction?-y.translate:y.translate,"slide"===y.params.controlBy&&(y.controller.getInterpolateFunction(a),i=-y.controller.spline.interpolate(-e)),i&&"container"!==y.params.controlBy||(r=(a.maxTranslate()-a.minTranslate())/(y.maxTranslate()-y.minTranslate()),i=(e-y.minTranslate())*r+a.minTranslate()),y.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,y),a.updateActiveIndex()}var r,i,n=y.params.control;if(y.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&s(n[o]);else n instanceof t&&a!==n&&s(n)},setTransition:function(e,a){function s(a){a.setWrapperTransition(e,y),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&(a.params.loop&&"slide"===y.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var r,i=y.params.control;if(y.isArray(i))for(r=0;r<i.length;r++)i[r]!==a&&i[r]instanceof t&&s(i[r]);else i instanceof t&&a!==i&&s(i)}},y.hashnav={init:function(){if(y.params.hashnav){y.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,s=y.slides.length;s>t;t++){var r=y.slides.eq(t),i=r.attr("data-hash");if(i===e&&!r.hasClass(y.params.slideDuplicateClass)){var n=r.index();y.slideTo(n,a,y.params.runCallbacksOnInit,!0)}}}},setHash:function(){y.hashnav.initialized&&y.params.hashnav&&(document.location.hash=y.slides.eq(y.activeIndex).attr("data-hash")||"")}},y.disableKeyboardControl=function(){a(document).off("keydown",p)},y.enableKeyboardControl=function(){a(document).on("keydown",p)},y.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},y.params.mousewheelControl){try{new window.WheelEvent("wheel"),y.mousewheel.event="wheel"}catch(N){}y.mousewheel.event||void 0===document.onmousewheel||(y.mousewheel.event="mousewheel"),y.mousewheel.event||(y.mousewheel.event="DOMMouseScroll")}y.disableMousewheelControl=function(){return y.mousewheel.event?(y.container.off(y.mousewheel.event,d),!0):!1},y.enableMousewheelControl=function(){return y.mousewheel.event?(y.container.on(y.mousewheel.event,d),!0):!1},y.parallax={setTranslate:function(){y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){u(this,y.progress)}),y.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);u(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=y.params.speed),y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),s=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.transition(s)})}},y._plugins=[];for(var R in y.plugins){var V=y.plugins[R](y,y.params[R]);V&&y._plugins.push(V)}return y.callPlugins=function(e){for(var a=0;a<y._plugins.length;a++)e in y._plugins[a]&&y._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},y.emitterEventListeners={},y.emit=function(e){y.params[e]&&y.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(y.emitterEventListeners[e])for(a=0;a<y.emitterEventListeners[e].length;a++)y.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);y.callPlugins&&y.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},y.on=function(e,a){return e=c(e),y.emitterEventListeners[e]||(y.emitterEventListeners[e]=[]),y.emitterEventListeners[e].push(a),y},y.off=function(e,a){var t;if(e=c(e),"undefined"==typeof a)return y.emitterEventListeners[e]=[],y;if(y.emitterEventListeners[e]&&0!==y.emitterEventListeners[e].length){for(t=0;t<y.emitterEventListeners[e].length;t++)y.emitterEventListeners[e][t]===a&&y.emitterEventListeners[e].splice(t,1);return y}},y.once=function(e,a){e=c(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),y.off(e,t)};return y.on(e,t),y},y.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(y.params.nextButton)?(y.onClickNext(e),y.isEnd?y.a11y.notify(y.params.lastSlideMessage):y.a11y.notify(y.params.nextSlideMessage)):a(e.target).is(y.params.prevButton)&&(y.onClickPrev(e),y.isBeginning?y.a11y.notify(y.params.firstSlideMessage):y.a11y.notify(y.params.prevSlideMessage)),a(e.target).is("."+y.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=y.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(y.params.nextButton){var e=a(y.params.nextButton);y.a11y.makeFocusable(e),y.a11y.addRole(e,"button"),y.a11y.addLabel(e,y.params.nextSlideMessage)}if(y.params.prevButton){var t=a(y.params.prevButton);y.a11y.makeFocusable(t),y.a11y.addRole(t,"button"),y.a11y.addLabel(t,y.params.prevSlideMessage)}a(y.container).append(y.a11y.liveRegion)},initPagination:function(){y.params.pagination&&y.params.paginationClickable&&y.bullets&&y.bullets.length&&y.bullets.each(function(){var e=a(this);y.a11y.makeFocusable(e),y.a11y.addRole(e,"button"),y.a11y.addLabel(e,y.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){y.a11y.liveRegion&&y.a11y.liveRegion.length>0&&y.a11y.liveRegion.remove()}},y.init=function(){y.params.loop&&y.createLoop(),y.updateContainerSize(),y.updateSlidesSize(),y.updatePagination(),y.params.scrollbar&&y.scrollbar&&(y.scrollbar.set(),y.params.scrollbarDraggable&&y.scrollbar.enableDraggable()),"slide"!==y.params.effect&&y.effects[y.params.effect]&&(y.params.loop||y.updateProgress(),y.effects[y.params.effect].setTranslate()),y.params.loop?y.slideTo(y.params.initialSlide+y.loopedSlides,0,y.params.runCallbacksOnInit):(y.slideTo(y.params.initialSlide,0,y.params.runCallbacksOnInit),0===y.params.initialSlide&&(y.parallax&&y.params.parallax&&y.parallax.setTranslate(),y.lazy&&y.params.lazyLoading&&(y.lazy.load(),y.lazy.initialImageLoaded=!0))),y.attachEvents(),y.params.observer&&y.support.observer&&y.initObservers(),y.params.preloadImages&&!y.params.lazyLoading&&y.preloadImages(),y.params.autoplay&&y.startAutoplay(),y.params.keyboardControl&&y.enableKeyboardControl&&y.enableKeyboardControl(),y.params.mousewheelControl&&y.enableMousewheelControl&&y.enableMousewheelControl(),y.params.hashnav&&y.hashnav&&y.hashnav.init(),y.params.a11y&&y.a11y&&y.a11y.init(),y.emit("onInit",y)},y.cleanupStyles=function(){y.container.removeClass(y.classNames.join(" ")).removeAttr("style"),y.wrapper.removeAttr("style"),y.slides&&y.slides.length&&y.slides.removeClass([y.params.slideVisibleClass,y.params.slideActiveClass,y.params.slideNextClass,y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),y.paginationContainer&&y.paginationContainer.length&&y.paginationContainer.removeClass(y.params.paginationHiddenClass),y.bullets&&y.bullets.length&&y.bullets.removeClass(y.params.bulletActiveClass),y.params.prevButton&&a(y.params.prevButton).removeClass(y.params.buttonDisabledClass),y.params.nextButton&&a(y.params.nextButton).removeClass(y.params.buttonDisabledClass),y.params.scrollbar&&y.scrollbar&&(y.scrollbar.track&&y.scrollbar.track.length&&y.scrollbar.track.removeAttr("style"),y.scrollbar.drag&&y.scrollbar.drag.length&&y.scrollbar.drag.removeAttr("style"))},y.destroy=function(e,a){y.detachEvents(),y.stopAutoplay(),y.params.scrollbar&&y.scrollbar&&y.params.scrollbarDraggable&&y.scrollbar.disableDraggable(),y.params.loop&&y.destroyLoop(),a&&y.cleanupStyles(),y.disconnectObservers(),y.params.keyboardControl&&y.disableKeyboardControl&&y.disableKeyboardControl(),y.params.mousewheelControl&&y.disableMousewheelControl&&y.disableMousewheelControl(),y.params.a11y&&y.a11y&&y.a11y.destroy(),y.emit("onDestroy"),e!==!1&&(y=null)},y.init(),y}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),r=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||r||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var s=["jQuery","Zepto","Dom7"],r=0;r<s.length;r++)window[s[r]]&&e(window[s[r]]);var i;i="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,i&&("transitionEnd"in i.fn||(i.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<s.length;t++)r.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(t=0;t<s.length;t++)r.on(s[t],a);return this}),"transform"in i.fn||(i.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in i.fn||(i.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=t}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
});


// report data
var WEBP = window.WEBP || {}
try {
    WEBP.Stats().init('from_wechat');
    WEBP.PageLoad().updatePageLoadEndTimestamp();
    WEBP.Stats().upload(30, window.location.pathname);
} catch(e) {
    console.log(e);
}
