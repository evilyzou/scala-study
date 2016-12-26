
var XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}
var t,t1


// data
function vendor(data) {
    if (!data) return
    var html = template('search_item_template', data);
    $('#product-list').attr('data-totalCount', data.result.totalCount).append(html);
}

/*
 * scroll to load more content
 */
var $target = $('#product-list');
var keyword = XLJ.getQueryString('kw') || '',
    cid = XLJ.getQueryString('cid') || '';

function loadmoreContent() {
    // scroll to bottom gono function
    var _loading = $target.attr('data-loading') || 'false',
        _hasNext = $target.attr('data-hasNext') || 'true'
    if (_loading == 'true' || _hasNext == 'false') return   // lock
    $target.attr('data-loading', 'true')

    var _pageNo  = Number($target.attr('data-pageNo') || 2),
        _pageSize = 20,
        _total   = $target.attr('data-totalCount') || ''

    if (((_pageNo - 1) * _pageSize) >= _total) return $target.attr('data-hasNext', 'false')     // lock
    $('.loadmore').css('visibility', 'visible')

    $.get('/Search?kw=' + keyword + '&cid=' + cid + '&pageSize=20&page=' + _pageNo, {}, function (response) {
        if (!response.success) {
            $target.attr({'data-hasNext': 'false', 'data-loading': 'false'})
            return
        }

        var _products = response.result.list
        if(_products && _products.length > 0) {
            vendor(response)
        }

        var hasNext = (((_pageNo) * _pageSize) >= _total) ? 'false' : 'true'
        $target.attr({
            'data-hasNext': hasNext,
            'data-loading': 'false',
            'data-pageNo': _pageNo + 1
        })
        $('.loadmore').css('visibility', 'hidden')
    });
}
//    loadmoreContent()

var $mainBox = $('.maincontent')
var $mainContent = $('#product-list')
var winH = $mainBox.height();
$(window).resize(function () {
    winH = $mainBox.height();
});

$mainBox.scroll(function () {
    if ($target.attr('data-hasNext') == 'false') return
    var _this = $(this),
        docH  = $mainContent.height(),
        docST = _this.scrollTop();

    if ((docST + winH) >= (docH - 100)) {
        loadmoreContent()
    }
});

function searchList(keyword) {
    var keyword = keyword || ''
    XLJ.ajaxData('/Search?kw=' + keyword + '&cid=' + cid + '&pageSize=20&page=1', 'GET', '', function(response) {
        $('#product-list').empty();
        if (response.result.list.length <= 0) {
            $('.tipbox.nothing').show();
        } else {
            $('.tipbox.nothing').hide();
            vendor(response);
        }
    });
}
searchList(keyword);



$(function() {

    $('#searchBar input[type="search"]').focus(function() {
        $('#searchBar').addClass('current');
        $('#searchTipBar').show();
        $('.link.cancel').show();
        $('#header').prevAll('.mod_appbanner').hide();
        $('#main').addClass('blur');
    }).blur(function() {
        var keyword = $("input[type='search']").val();
        searchList(keyword);
    });
    $('.link.cancel, #searchTipBar').click(function() {
        $('#searchBar').removeClass('current');
        $('#searchTipBar').hide();
        $('.link.cancel').hide();
        $('#header').prevAll('.mod_appbanner').removeAttr('style');
        $('#main').removeClass('blur');
    });
    $('#searchTipBar .list').click(function(event) {
        event.stopPropagation();
    });
    $('#searchForm').on('submit',function(e) {
        e.preventDefault();
        var keyword = $("input[type='search']").val();

        $('#searchBar').removeClass('current');
        $('#searchTipBar').hide();
        $('.link.cancel').hide();
        $('#header').prevAll('.mod_appbanner').removeAttr('style');
        $('#main').removeClass('blur');

        searchList(keyword);

        // data report
        try {
            WEBP.Stats().init('from_wechat');
            WEBP.Stats().upload(2, keyword);
        } catch(e) {
            console.log(e);
        }
        //window.location.href = "./index.html?kw=" + keyword;
    });

    $('input[type="search"]').keyup(function(event) {
        if ($(this).val() != '') {
            console.log($(this).val());
            var keyword = $(this).val();
            keyword = encodeURIComponent(encodeURIComponent(keyword));
            $.get("/Search/suggest",{kw:keyword},function(data){
                if(data.success){
                    var cell = "";
                    $.each(data.result.list,function(i,item){
                        cell += '<li><a href="' + XLJ.rootPath + 'product/search.html?kw=' + item + '">' + item + '</a></li>';
                    });
                    $(".list").empty().append(cell);
                }
            });
        }
    });
    $('input[type="search"]').keyup(function(event) {
        if (event.keyCode == 13) {
            var keyword = $("input[type='search']").val();

            searchList(keyword);

            // data report
            try {
                WEBP.Stats().init('from_wechat');
                WEBP.Stats().upload(2, keyword);
            } catch(e) {
                console.log(e);
            }
            //window.location.href = "/search.html?kw=" + keyword;
        }
    });

})
