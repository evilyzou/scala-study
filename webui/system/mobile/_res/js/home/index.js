
var XLJ = window.XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}


var _global = {
    systemType:    XLJ.getQueryString('systemType')    || 1,
    customType:    XLJ.getQueryString('customType')    || '',
    pfunction:     XLJ.getQueryString('pfunction')     || 'free',                         //group|free
    mainCategory:  decodeURIComponent(XLJ.getQueryString('mainCategory'))  || '',      //guideCategoryJiangNan|guideCategoryJapan,
    subCategory:   decodeURIComponent(XLJ.getQueryString('subCategory'))   || ''
}


var HOME_PAGE = (function(root, window) {
    var document = window.document, $ = window.$

    root.areaSelector = function(callback) {
        if (typeof XLJ.selectorWin == 'function') {
            // this function to get the oparetion item data
            function popcontentLoadedCB($items, currentItemChange) {
                console.log('selectorWin data list loaded')
                currentItemChange(function(items) {
                    if (callback) callback(items)
                })
            }
            var ProductSelector = new XLJ.selectorWin({
                // dataURL:   XLJ.rootPath + 'product/subCategorys?mainCategory=' + _global.mainCategory,
                dataURL:   XLJ.rootPath + '_res/data/subCategorys.json?mainCategory=' + _global.mainCategory,
                tplURL:    XLJ.rootPath + '_res/tpl/tpl_area-selector.html',
                optElname: '.selectArea',   // class name of button for open this selector win
                checkType: 'radio',
                groupName: 'checkgroup-subCategorys-selector',
                boxId:     'area-selector'
            })
            ProductSelector.init(popcontentLoadedCB)
        }
    }

    root.action = function() {

        var $category_tags = $('.category_tags')
        $category_tags.on(XLJ.clickType, function(e) {
            e.preventDefault()

            var $this = $(this),
                _href = $this.attr('href'),
                _url  = _href

            _url = XLJ.setUrlParam(_url, 'systemType', _global.systemType)
            _url = XLJ.setUrlParam(_url, 'pfunction', _global.pfunction)
            _url = XLJ.setUrlParam(_url, 'subCategory', _global.subCategory)

            window.location.href = _url
        })
    }

    return root
}(HOME_PAGE || {}, typeof window !== 'undefined' ? window : this));


$(function() {

    HOME_PAGE.action()

    // area selector
    HOME_PAGE.areaSelector(function(items) {
        console.log(items)
        var _constValue = items[0].constValue,
            _constCategory = items[0].constValue

        _global.subCategory = _constValue

        var _loadingHtml = '<div class="mod-loading"><p class="animate"></p></div>'
        var $list = $('#list-travel'),
            $listData = $list.find('.datalist')
        $listData
            .empty()
            .attr({
                'data-loading': '',
                'data-hasnext': '',
                'data-pageno':  '',
                'data-totalcount': ''
            })
            .html(_loadingHtml)

        HOME_PAGE.getList($list, '', function() {
            $listData.find('.mod-loading').remove()
        })
        $('#area-selector').find('.header .close').trigger(XLJ.clickType)

        // set header text
        $('.selectArea').find('.icon-location').text(_constValue)

        var _newUrl = XLJ.setUrlParam(window.location.href, 'subCategory', _constValue)
        window.history.pushState('', '', _newUrl)
    });

});
