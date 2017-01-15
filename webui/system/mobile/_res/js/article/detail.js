
var XLJ = window.XLJ = window.XLJ || {}

var CONTENT_DETAIL = (function(root, window) {
    var document = window.document, $ = window.$
    
    root.get = function(id, callback) {
        if (!id) return
        var url = '../_res/data/article.json'
        // var url = '/guide/' + id
        XLJ.ajaxData(url, function(response) {
            console.log(response)
            if (callback) callback(response)
        })
    }

    root.vendor = function(data, callback) {

        // custom artTemplate function for get key param name
        template.helper('keyMap', function (keyname) {
            return (WEBP && WEBP.keyMap) ? WEBP.keyMap[keyname] : keyname
        });

        // escape for content html
        template.config("escape", false);


        var _article_base_html = template('tpl_article_detail_base', data)
        $('#articleBase').html(_article_base_html)

        var _article_detail_html = ''
        // if guideType == 'GuidePage', just onlye show content
        if (data.data.guide.guideType == 'GuidePage') {
            _article_detail_html = template('tpl_article_detail_content_guidePage', data)
        } else {
            _article_detail_html = template('tpl_article_detail_content', data)
        }
        $('#articleContents').html(_article_detail_html)
        $('#header .title').text(data.data.guide.title)

        if (callback) callback(data)
    }

    return root
}(CONTENT_DETAIL || {}, typeof window !== 'undefined' ? window : this));


var article_id = XLJ.getQueryString('id') || XLJ.getQueryString('articleId') || ''

if (article_id) CONTENT_DETAIL.get(article_id, function(response) {
    $(function() {
        CONTENT_DETAIL.vendor(response.result)
    });
});


// header background-color
$('.maincontent').on('scroll', function(e) {
    var _opacity = (e.currentTarget.scrollTop <= 160) ? e.currentTarget.scrollTop / 200 : 0.95
    var _header = $(this).prev('.header')
    _header.css('background-color', 'rgba(255,255,255,' + _opacity + ')')
    _header.find('.title').css('color', 'rgba(51,51,51,' + _opacity + ')')
});
