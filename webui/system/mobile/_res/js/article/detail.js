
var XLJ = window.XLJ = window.XLJ || {}

var CONTENT_DETAIL = (function(root, window) {
    var document = window.document, $ = window.$
    
    root.get = function(id, callback) {
        var url = '/CmsCategories/'
        if (id) url += id
        XLJ.ajaxData(url, function(response) {
            console.log(response)
            if (callback) callback(response)
        })
    }

    root.vendor = function(data) {
        var data = data.result.cmsCategory
        var html = data.content

        var $article_box = $('#article_box')
        $('.header .title').html(data.title)
        
        if (data.content.indexOf('<body') != -1) {
            var $html = $('<div>' + data.content + '</div>')
            html = $html.find('.maincontent').html()
        }

        $article_box.find('.main').html(html)
    }

    root.vendorList = function(data, callback) {
        if (!data.result || !data.result.data.length > 0) return
        var html = template('aside_list_item_template', data.result)
        $('#aside_list').html(html)
        if (callback) callback()
    }

    return root
}(CONTENT_DETAIL || {}, typeof window !== 'undefined' ? window : this));


var article_id = XLJ.getQueryString('id') || ''

if (article_id) CONTENT_DETAIL.get(article_id, function(response) {
    $(function() {
        CONTENT_DETAIL.vendor(response)
    });
});


// header background-color
$('.maincontent').on('scroll', function(e) {
    var _opacity = (e.currentTarget.scrollTop <= 160) ? e.currentTarget.scrollTop / 200 : 0.95
    var _header = $(this).prev('.header')
    _header.css('background-color', 'rgba(255,255,255,' + _opacity + ')')
    _header.find('.title').css('color', 'rgba(51,51,51,' + _opacity + ')')
});
