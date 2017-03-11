/*!
 *  Create Date: 2015-12-22
 *  Author: zihan
 */

!function(e,t){e["global.js"]||(e["global.js"]=!0,t(e))}("undefined"!=typeof window?window:this,function(window){"use strict";var document=window.document,$=window.$,XLJ=window.XLJ=window.XLJ||{};XLJ.requestDomain=window.XLJ.requestDomain||"",XLJ.rootPath=window.XLJ.rootPath||"../",XLJ.loginPath=window.XLJ.loginPath||"passport/login.html",XLJ.safaPathRex=window.XLJ.safaPathRex||/(\/user|\/order)/;var ua=navigator.userAgent.toLowerCase();XLJ.clickType=window.XLJ.clickType||(/mobile/.test(ua)?"touchstart":"click"),XLJ.systemType=window.XLJ.systemType||(/micromessenger/.test(ua)?"wap_wx":/mobile/.test(ua)?"wap":"web"),XLJ.contentType=window.XLJ.contentType||"text/plain;charset=UTF-8",!function(e,t){e.XLJ=e.XLJ||{},t(e.XLJ)}("undefined"!=typeof window?window:this,function(e){function t(e){return c.raw?e:encodeURIComponent(e)}function n(e){return c.raw?e:decodeURIComponent(e)}function o(e){return t(c.json?JSON.stringify(e):String(e))}function i(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(s," ")),c.json?JSON.parse(e):e}catch(t){}}function a(e){return"function"==typeof e}function r(e,t){var n=c.raw?e:i(e);return a(t)?t(n):n}if(!e.cookie){var s=/\+/g,c=e.cookie=function(e,i,s){if(void 0!==i&&!a(i)){var s=s||{};if("number"==typeof s.expires){var c=s.expires,u=s.expires=new Date;u.setTime(+u+864e5*c)}return document.cookie=[t(e),"=",o(i),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var d=e?void 0:{},p=document.cookie?document.cookie.split("; "):[],f=0,L=p.length;L>f;f++){var m=p[f].split("="),w=n(m.shift()),l=m.join("=");if(e&&e===w){d=r(l,i);break}e||void 0===(l=r(l))||(d[w]=l)}return d};c.defaults={},e.removeCookie=function(t,n){if(void 0===e.cookie(t))return!1;var n=n||{};return n.expires=-1,e.cookie(t,"",n),!e.cookie(t)}}}),XLJ.getQueryString=window.XLJ.getQueryString||function(e,t){var n=new RegExp("(^|\\?|&)"+e+"=([^&]*)(&|$)","i"),t=t||window.location.search,o=t.match(n);return null!=o?decodeURIComponent(o[2]):""},XLJ.isDocReady=window.XLJ.isDocReady||!1,XLJ.docReady=window.XLJ.docReady||function(e){if(XLJ.isDocReady||document.getElementsByTagName("body")[0])XLJ.isDocReady=!0,e&&e();else if(document.addEventListener){var t=function(){XLJ.isDocReady=!0,e&&e(),document.removeEventListener("DOMContentLoaded",t,!1)};document.addEventListener("DOMContentLoaded",t,!1)}else if(document.attachEvent){var t=function(){"complete"==document.readyState&&(XLJ.isDocReady=!0,e&&e(),document.detachEvent("onreadystatechange",t))};document.attachEvent("onreadystatechange",t)}},XLJ.setPageClass=window.XLJ.setPageClass||function(){var e=navigator.userAgent.toLowerCase();/bringbuys/.test(e)&&document.getElementsByTagName("html")[0].classList.add("inApp")}(),XLJ.httpRequest=window.XLJ.httpRequest||function(options){var options=options||{},_url=options.url||"";if(!_url)return console.log("A bed url, no request.");/^http/.test(_url)||(_url=XLJ.requestDomain+_url);var _data=options.data||"",_type=options.type||"GET",_dataType=options.dataType||"json",_systemType=options.systemType||XLJ.systemType,_contentType=options.contentType||XLJ.contentType,_beforeSend=options.beforeSend||"",_completed=options.completed||"",_success=options.success||"",_error=options.error||"",_fail=options.fail||"",XMLHttp=new XMLHttpRequest;XMLHttp.open(_type,_url),"function"==typeof _beforeSend&&_beforeSend(XMLHttp),XMLHttp.setRequestHeader("System-Type",_systemType),XMLHttp.setRequestHeader("Content-Type",_contentType),XMLHttp.send(_data),XMLHttp.onreadystatechange=function(){if(4==XMLHttp.readyState){if("function"==typeof _completed&&_completed(),200!=XMLHttp.status)return void("function"==typeof _error&&_error(XMLHttp));if(XMLHttp.responseText){if("function"==typeof _success){var response="json"==_dataType?eval("("+XMLHttp.responseText+")"):XMLHttp.responseText;_success(response,XMLHttp)}}else console.log(XMLHttp.status+":"+XMLHttp.statusText),"function"==typeof _fail&&_fail(XMLHttp)}}},XLJ.themeStyle=window.XLJ.themeStyle||function(){if(XLJ.themeLayout=XLJ.getQueryString("ly")||XLJ.themeLayout,XLJ.themeLayout){var e=document.getElementById("themeStyle");if(e){var t=e.href||"";if(t){var n=new RegExp("(theme/)(.*)?(.css)","i");e.href=t.replace(n,"$1"+XLJ.themeLayout+"$3")}}}}(),XLJ.getUrlObj=window.XLJ.getUrlObj||function(e){var t=document.createElement("a");return t.href=e||"",t.relative=(t.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],t},function(){function e(){document.domain=window.location.host}var t=window.WEBP=window.WEBP||{},n={zh_cn:"￥",zh_CN:"￥",zh_hk:"HK$",zh_HK:"HK$",en_us:"$",en_US:"$"},o=/(?:[0-9a-z]*?\.|)([0-9a-z\-]*\.[0-9a-z]*$)/,i=window.location.host.match(o);i=i?i[1]:"domain.com",t.Config=function(){return e(),{getStatsUrl:function(){return"http://data."+i+"/"},getUid:function(){return""},getCoinSymbol:function(e){for(var t in n)if(t.toLowerCase()===e.toLowerCase())return n[t];return"￥"}}}}(),function(){var e=window.WEBP=window.WEBP||{},t=0,n=0;e.PageLoad=function(){function e(){t=(new Date).getTime()||""}return{init:e,getPageLoadStartTimestamp:function(){return t},getPageLoadEndTimestamp:function(){return n},updatePageLoadEndTimestamp:function(){n=(new Date).getTime()},getPageLoadTimestamp:function(){return n-t}}},e.PageLoad().init()}()});

var _global = window._global || {
    systemType:    XLJ.getQueryString('systemType')    || 'SystemJiangNan',
    customType:    XLJ.getQueryString('customType')    || '',
    pfunction:     XLJ.getQueryString('pfunction')     || 'free',                                           //group|free
    mainCategory:  decodeURIComponent(XLJ.getQueryString('mainCategory'))  || 'guideCategoryJiangNan',      //guideCategoryJiangNan|guideCategoryJapan,
    subCategory:   decodeURIComponent(XLJ.getQueryString('subCategory'))   || ''
}

;(function(){

    var WEBP = window.WEBP = window.WEBP || {}
    WEBP.keyMap = {
        "GuideCustomCH" : "春花",
        "GuideCustomQY" : "秋野",
        "GuideCustomWM" : "乐园",
        "GuideCustomMS" : "美食",
        "GuideCustomHX" : "滑雪",
        "GuideCustomQJ" : "骑迹",
        "GuideCustomQS" : "亲水",
        "GuideCustomWQ" : "温泉",

        "CustomGG":       "观光",
        "CustomHX":       "滑雪",
        "CustomDC":       "单车",
        "CustomQX" :      "温泉",
        "CustomQS" :      "亲水",
        "CustomXX" :      "休闲",
        "CustomOther" :   "其他",

        "SystemJapan":    "日本",
        "SystemJiangNan": "江南",

        "GuideRecord":    "典藏",
        "GuidePage":      "笔记",

        "GuideInfraWan":   "玩",
        "GuideInfraXiang": "享",
        "GuideInfraSu":    "宿",

        "Hotel":           "酒店",
        "Spot":            "景点",
        "XiangLe":         "享乐",

        "free":            "自由行",
        "group":           "旅游团"
    }
    WEBP.keyMap.get = function(key) {
        return WEBP.keyMap[key] || key
    }
    WEBP.keyMap.getKey = function(name) {
        for (var key in WEBP.keyMap) {
            if (WEBP.keyMap[key] == name) return key
        }
    }

})();


;(function(){

    var WEBP = window.WEBP = window.WEBP || {}
    var coinSymbol = { "zh_cn":"￥","zh_CN":"￥","zh_hk":"HK$","zh_HK":"HK$","en_us":"$","en_US":"$" };

    function init() {
        document.domain = window.location.host
    };

    var reportDataUrl = window.location.host

    var reg = /(?:[0-9a-z]*?\.|)([0-9a-z\-]*\.[0-9a-z]*$)/,
        baseHost = (window.location.host && window.location.host.match(reg)) ? window.location.host.match(reg)[1] : ''

    WEBP.Config = function() {
        init();
        return {
            getStatsUrl: function() {
                return "http://data." + baseHost + "/"
            },
            getUid: function() {
                return ""
            },
            getCoinSymbol: function(locale) {
                for(var key in coinSymbol) {
                    if (key.toLowerCase()===locale.toLowerCase()) {
                        return coinSymbol[key]
                    }
                }
                return"￥"
            }
        }
    };
})();

(function(){
    var WEBP = window.WEBP = window.WEBP || {}

    //记录当前页的起始/结束时间点
    var pageLoadStartTimestamp = 0;
    var pageLoadEndTimestamp = 0;

    WEBP.PageLoad = function () {
        function init() {
            pageLoadStartTimestamp = (new Date()).getTime() || '';
        }

        return {
            init: init,
            getPageLoadStartTimestamp : function() { return pageLoadStartTimestamp; },
            getPageLoadEndTimestamp : function() { return pageLoadEndTimestamp; },
            updatePageLoadEndTimestamp : function() {
                pageLoadEndTimestamp = (new Date()).getTime();
                //console.log("pageLoadEndTimestamp:" + pageLoadEndTimestamp);
            },

            getPageLoadTimestamp : function() {
                //console.log("getPageLoadTimestamp");
                return pageLoadEndTimestamp - pageLoadStartTimestamp;
            }
        };
    }
    WEBP.PageLoad().init();
})();
