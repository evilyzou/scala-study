
var XLJ = window.XLJ || {}

var _global = {
    systemType: XLJ.getQueryString('systemType') || 1,
    customType: XLJ.getQueryString('customType') || 1,
    pfunction: XLJ.getQueryString('pfunction')   || 'group',
}

// vendor
function vendor(data, target) {
    if (!data) return
    var html = template('search_item_template', data);
    target.attr('data-totalCount', data.result.totalCount).append(html);
}

$(function() {

    var emptyTxt = '没有相关的内容'

    /*
     * scroll to load more content
     */
    var $listAll = $('#list-all')
    var scrollData_usable = new XLJ.ScrollData({
        url:          XLJ.rootPath + '_res/data/productList.json',                       // data url put here
        data:         {systemType: _global.systemType, customType: _global.customType, pfunction: _global.pfunction},
        container:    $listAll,
        target:       $listAll.find('.datalist'),
        requestModel: XLJ.ajaxData,
        emptyTxt:     emptyTxt,
        success: function(response, target) {
            vendor(response, target)
        }
    });

    var $list2 = $('#list2')
    var scrollData_used = new XLJ.ScrollData({
        url:          '',                       // data url put here
        data:         {useStatus: 'used'},
        container:    $list2,
        target:       $list2.find('.datalist'),
        requestModel: XLJ.ajaxData,
        emptyTxt:     emptyTxt,
        success: function(response, target) {
            vendor(response, target)
        }
    });

    var $list3 = $('#list3')
    var scrollData_expire = new XLJ.ScrollData({
        url:          '',                       // data url put here
        data:         {useStatus: 'expire'},
        container:    $list3,
        target:       $list3.find('.datalist'),
        requestModel: XLJ.ajaxData,
        emptyTxt:     emptyTxt,
        success: function(response, target) {
            vendor(response, target)
        }
    });




    ;(function() {
        if (typeof XLJ.selectorWin == 'function') {
            // this function to get the oparetion item data
            function popcontentLoadedCB($items, currentItemChange) {
                console.log('selectorWin data list loaded')
                currentItemChange(function(item) {
                    console.log(item)
                })
            }
            var ProductSelector = new XLJ.selectorWin({
                // dataURL:   XLJ.rootPath + 'product/subCategorys?mainCategory=guideCategoryJiangNan|guideCategoryJapan',
                dataURL:   XLJ.rootPath + '_res/data/subCategorys.json?mainCategory=guideCategoryJiangNan|guideCategoryJapan',
                tplURL:    XLJ.rootPath + '_res/tpl/tpl_area-selector.html',
                optElname: '.selectArea',   // class name of button for open this selector win
                checkType: 'radio',
                boxId:     'area-selector'
            })
            ProductSelector.init(popcontentLoadedCB)
        }
    }());
});
