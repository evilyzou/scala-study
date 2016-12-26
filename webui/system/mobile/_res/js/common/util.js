(function(){
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
