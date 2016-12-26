
;(function(){
    var WEBP = window.WEBP = window.WEBP || {}
    var coinSymbol = { 'zh_cn':'￥', 'zh_CN':'￥', 'zh_hk':'HK$', 'zh_HK':'HK$', 'en_us':'$', 'en_US':'$' };

    function init() {
        document.domain = window.location.host
    };

    var reg = /(?:[0-9a-z]*?\.|)([0-9a-z\-]*\.[0-9a-z]*$)/,
        baseHost = window.location.host.match(reg)
    baseHost = (baseHost) ? baseHost[1] : 'domain.com'

    WEBP.Config = function() {
        init();
        return {
            getStatsUrl: function() {
                return 'http://data.' + baseHost + '/'
            },
            getUid: function() {
                return ''
            },
            getCoinSymbol: function(locale) {
                for(var key in coinSymbol) {
                    if (key.toLowerCase()===locale.toLowerCase()) {
                        return coinSymbol[key]
                    }
                }
                return'￥'
            }
        }
    };
})();
