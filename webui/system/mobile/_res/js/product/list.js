
var XLJ = window.XLJ || {}

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
        url:          '',                       // data url put here
        data:         {useStatus: 'usable'},
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

});
