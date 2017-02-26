
var XLJ = window.XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}


var PRODUCT_DETAIL = (function(root, window) {
    var document = window.document, $ = window.$

    var data = {}

    root.getDetail = function(id, callback) {
        // return XLJ.ajaxData(XLJ.rootPath + '_res/data/product.json', function(response) {
        return XLJ.ajaxData(XLJ.rootPath + 'product/' + id, function(response) {
            if (callback) callback(response)
        })
    }

    root.swiper = function() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }

    root.vendor = function(data, callback) {

        var _product_base_html = template('tpl_product_detail_base', data)
        $('#productBase').html(_product_base_html)

        template.config("escape", false);
        var _product_detail_html = template('tpl_product_detail_contents', data)
        $('#productContents').html(_product_detail_html)

        $('#header .title').text(data.data.product.departure + '-' + data.data.product.arrive)
        var $shoppingTool = $('.shopping-tool')
        $shoppingTool.find('.product-arrive-depart').text(data.data.product.departure + '-' + data.data.product.arrive)
        $shoppingTool.find('.product-no').text(data.data.product.teamNo)

        if (callback) callback(data)
    }

    return root
}(PRODUCT_DETAIL || {}, typeof window !== 'undefined' ? window : this));



var boxShowFlag = false;
var $skubox = $('#skubox');
var $product = $('#productBase');

var productID = XLJ.getQueryString('id');
PRODUCT_DETAIL.getDetail(productID, function(response) {
    if (!response.success) return

    PRODUCT_DETAIL.vendor(response.result, function() {
        // re run scroll tab function
        PRODUCT_DETAIL.swiper()
        if (typeof XLJ.scrolltab != 'undefined') XLJ.scrolltab()
    });
});


// function failProcess(data) {
//     if (!data) return false;
//
//     if (data.apiCode && data.apiCode == 8002 && XLJ.loginPath) {
//         var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
//         return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
//     }
//
//     if (!data.success) {
//
//         if (data.apiCode == 1302 && data.result && data.result.Location) {
//             return window.location.href = data.result.Location;
//         } else if (!boxShowFlag && data.msg) {
//             XLJ.tip(data.msg);
//             boxShowFlag = true;
//             setTimeout(function() {
//                 window.location.href = XLJ.rootPath;
//             }, 1000);
//         }
//         return false;
//     }
//     return true;
// }
//
// function bindProductPicture(data) {
//     if (!failProcess(data)) return
//
//     var photos = data.result.data;
//     if (photos && photos.length > 0) {
//         var tpl = ''
//         var imgDomain = data.result.imgDomain
//         for (var i = 0; i < photos.length; i++) {
//             var d = photos[i]
//             var dataSrc = ''
//             if (i == 0) dataSrc = 'data-src="' + imgDomain + '/' + d + '@750w_90Q"'
//             var rowTpl = '<div class="photo swiper-slide"><img src="' + imgDomain + '/' + d + '@750w_90Q" alt="" ' + dataSrc + '></div>'
//             tpl += rowTpl
//         }
//
//         var $photos = $('#productBase .photos')
//         $photos.html(tpl)
//         var swiper = new Swiper('.swiper-container', {
//             pagination: '.swiper-pagination',
//             paginationClickable: true
//         });
//
//     }
// }


(function() {

    //PRODUCT_DETAIL.swiper()

    // header background-color
    $('.maincontent').on('scroll', function(e) {
        var _opacity = (e.currentTarget.scrollTop <= 160) ? e.currentTarget.scrollTop / 200 : 0.95
        var _header = $(this).prev('.header')
        _header.css('background-color', 'rgba(255,255,255,' + _opacity + ')')
        _header.find('.title').css('color', 'rgba(51,51,51,' + _opacity + ')')
    });

})();

// var productIdObj = '{id:' + productID + '}';
//     document.getElementById('jsonp-pictures').setAttribute('src', "/Product/pictures?callback=bindProductPicture&" + productIdObj);
