
;(function(){
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