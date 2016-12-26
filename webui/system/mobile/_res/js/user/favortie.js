
// data
function vendor(data, target) {
    if (!data) return

    var html = template('product_item_template', data);
    target.attr('data-totalCount', data.result.totalCount).append(html);
}

// delete
function deleteFav(id, target) {
    if (!id) return

    XLJ.ajaxData('/UserFavorite/delete', 'GET', {id: id}, function() {
        if (target && target.length > 0) target.remove()
    });
}


$(function() {
    
    var $maincontent = $('.maincontent'),
        $productList = $('#product-list')

    /*
     * scroll to load more content
     */
    var scrollData = new XLJ.ScrollData({
        url:          '/UserFavorite/list',
        container:    $maincontent,
        target:       $productList,
        requestModel: XLJ.ajaxData,
        emptyTxt:     '还没有收藏的商品',
        success: function(response, target) {
            vendor(response, target)
        }
    });

    $productList.on('click', '.delete', function() {
        var _this = $(this),
            _id =_this.attr('data-id') || ''
        if (!_id) return
        deleteFav(_id, _this.closest('.item'))
    });
});
