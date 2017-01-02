/*!
 *  Create Date: 2017-01-02
 *  Author: zihan
 *  verstion: 1.0.0
 */

var XLJ = window.XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}


var BANNER = (function(root, window) {
    var document = window.document, $ = window.$

    root.getList = function(dataUrl, callback) {
        return XLJ.ajaxData(dataUrl, function(response) {
        // return XLJ.ajaxData(XLJ.rootPath + '/banner/list', function(response) {
            if (callback) callback(response)
        })
    }

    root.swiper = function(containerName, paginationName) {
        var swiper = new Swiper(containerName || '.swiper-container', {
            pagination: paginationName || '.swiper-pagination',
            paginationClickable: true
        });
    }

    root.getTpl = function(tplUrl, callback) {
        return $.get(tplUrl, function(response) {
            if (callback) callback(response)
        })
    }


    root.init = function(option) {
        var opt = {
            dataUrl: XLJ.rootPath + '_res/data/bannerList.json',
            tplUrl: XLJ.rootPath + '_res/tpl/tpl_banners.html',
            tplElname: '#tpl_banners',
            targetElname: '#banners',
            success: function() {}
        }
        opt = $.extend({}, opt, option)

        var $target = $(opt.targetElname)
        if (!$target || $target.length == 0) return console.log('%cCan not find the banner show target', 'color:#c00')

        var tplRender = function() {}
        var _getTpl = root.getTpl(opt.tplUrl, function(response) {
            var $html = $('<div>' + response + '</div>')
            var $tpl = $html.find(opt.tplElname)
            if (!$tpl || $tpl.length == 0) return console.log('%cNot have banner template html', 'color:#c00')

            tplRender = template.compile($tpl.html())
        })

        root.getList(opt.dataUrl, function(response) {
            $.when(_getTpl).done(function() {
                var _tplData  = response.result || {}
                var html = tplRender(_tplData)

                $target.html(html).attr('data-builded', 'true')
                opt.success($target)
            })
        })
    }

    return root
}(BANNER || {}, typeof window !== 'undefined' ? window : this));

