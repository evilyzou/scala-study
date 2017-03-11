
var XLJ = window.XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}


var _global = {
    systemType:    XLJ.getQueryString('systemType')    || 'SystemJiangNan',
    customType:    XLJ.getQueryString('customType')    || '',
    guideType:     XLJ.getQueryString('guideType')     || 'GuidePage',                                      //GuidePage|GuideRecord
    pfunction:     XLJ.getQueryString('pfunction')     || 'free',                                           //group|free
    mainCategory:  decodeURIComponent(XLJ.getQueryString('mainCategory'))  || 'guideCategoryJiangNan',      //guideCategoryJiangNan|guideCategoryJapan,
    subCategory:   decodeURIComponent(XLJ.getQueryString('subCategory'))   || ''
}


var PRODUCT_LIST = (function(root, window) {
    var document = window.document, $ = window.$

    var data = {}
    var emptyTxt = '没有相关的内容'

    root.getList = function($target, pfunction, callback) {

        console.log(_global)
        /*
         * scroll to load more content
         */
        var scrollData_usable = new XLJ.ScrollData({
            // url:          XLJ.rootPath + '_res/data/productList.json',                       // data url put here
            url:          XLJ.rootPath + 'product/list',                       // data url put here
            data:         {
                            systemType:  _global.systemType,
                            customType:  _global.customType,
                            pfunction:   pfunction || _global.pfunction,
                            subCategory: _global.subCategory
                          },
            container:    $target,
            target:       $target.find('.datalist'),
            requestModel: XLJ.ajaxData,
            emptyTxt:     emptyTxt,
            success: function(response, $target) {
                root.vendor(response, $target)
                if (callback) callback()
            }
        });
    }

    root.vendor = function(data, $target, callback) {
        if (!data) return
        var html = template('search_item_template', data);
        $target.attr('data-totalCount', data.result.totalCount).append(html);

        if (callback) callback(data)
    }

    return root
}(PRODUCT_LIST || {}, typeof window !== 'undefined' ? window : this));


$(function() {


    // init
    PRODUCT_LIST.getList($('#list-travel'), _global.pfunction)

    if (typeof BANNER == 'object') {
        BANNER.init({
            dataUrl: XLJ.rootPath + 'banner/list',
            tplUrl: XLJ.rootPath + '_res/tpl/tpl_banners.html',
            tplElname: '#tpl_banners',
            targetElname: '#banners',
            success: function($target) {
                BANNER.swiper('.swiper-container', '.swiper-pagination')
            }
        })
    }

    // set page title
    var _pageTilte = ''
    switch(_global.pfunction) {
        case 'group':
            _pageTilte = '旅行团'
            break;
        case 'free':
        default:
            _pageTilte = '自由行'
    }
    $('#header .title').text(_pageTilte)
    if (_global.subCategory) $('.selectArea').find('.icon-location').text(_global.subCategory)

    var $pfunction = $('#pfunction')
    $pfunction.on(XLJ.clickType, '.item', function(e) {
        e.preventDefault()

        var _this = $(this),
            _pfunction = _this.attr('data-pfunction')

        var _url = window.location.href
        // _url = XLJ.setUrlParam(_url, 'subCategory', '')
        _url = XLJ.setUrlParam(_url, 'pfunction', _pfunction)

        window.location.href = _url
    });

});
