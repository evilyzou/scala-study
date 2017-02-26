
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


        if (data.data.productPrices) {
            var _product_prices_html = template('tpl_product_prices', data.data)
            var $productPrices = $('#productPrices')
            $productPrices.find('.datalist').html(_product_prices_html)
            $productPrices.show()

            $('#productPricesBox .datalist').html(_product_prices_html)
        }

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
