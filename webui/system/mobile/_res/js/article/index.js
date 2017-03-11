
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


    root.vendor = function(data, $target, callback) {
        if (!data) return
        var html = template('search_item_template', data);
        $target.attr('data-totalCount', data.result.totalCount).append(html);

        if (callback) callback(data)
    }

    return root
}(PRODUCT_LIST || {}, typeof window !== 'undefined' ? window : this));


$(function() {

    // set page title
    var _pageTilte = ''
    switch(_global.guideType) {
        case 'GuideRecord':
            _pageTilte = '典藏'
            break;
        case 'GuidePage':
        default:
            _pageTilte = '笔记'
    }
    $('#header .title').text(_pageTilte)
    if (_global.subCategory) $('.selectArea').find('.icon-location').text(_global.subCategory)

    var $guideType = $('#guideType')
    $guideType.on(XLJ.clickType, '.item', function(e) {
        e.preventDefault()

        var _this = $(this),
            _guideType = _this.attr('data-type')

        var _url = window.location.href
        // _url = XLJ.setUrlParam(_url, 'subCategory', '')
        _url = XLJ.setUrlParam(_url, 'guideType', _guideType)

        window.location.href = _url
    });

});
