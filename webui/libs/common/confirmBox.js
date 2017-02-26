/*!
  *  Create Date: 2014
  *  Author: zihan
  *  v1.2.0
  */

// Confirm Box
// How to use it :
// Type1: XLJ.confirmBox('Message', function() { /* confirm function put here */ });
// Type2: XLJ.confirmBox('Message', function() { /* confirm function put here */ });
XLJ.confirmBox = window.XLJ.confirmBox || function(text, callback, buttondom) {
    if (!text) return false;

    var _head = ''
    var _title = text
    var _text = ''

    if (typeof text === 'object') {
        _head = text.head   || ''
        _text = text.text   || ''
        _title = text.title || ''
    }

    var popTPL = '<div>'
               + '<div class="popmark"></div>'
               + '<div class="popbox">'
               + '  <div class="head">' + _head + '<div class="cssicon close"></div><div class="title"></div></div>'
               + '  <div class="main">'
               + '    <div class="title">' + _title + '</div>'
               + '    <div class="content">' + _text + '</div>'
               + '  </div>'
               + '  <div class="foot">'
               + '    <button class="btn btn-primary default confirm" type="button">确认</button>'
               + '    <button class="btn btn-default cancel" type="button">取消</button>'
               + '  </div>'
               + '</div>'
               + '</div>'

    var $popTPL = $(popTPL);

    if (buttondom) $popTPL.find('.foot').html(buttondom);

    $popTPL
        .on(XLJ.clickType, 'div .close, .cancel', function (e) {
            removeBox($(this), e)
        })
        .on(XLJ.clickType, '.confirm', function (e) {
            var _this = $(this)
            removeBox(_this, e, function() {
                if (callback) callback(_this)
            })
        })

    function removeBox(el, e, cb) {
        e.preventDefault()
        e.stopPropagation()

        var _parent = el.closest('.popbox')
        if (el.attr('class').indexOf('popmark') != -1) _parent = el.next('.popbox')
        var _mark = _parent.prev('.popmark')
        _parent.removeClass('show')
        _mark.removeClass('show')

        setTimeout(function () {
            _parent.parent().remove()
            // _mark.remove()
        }, 500)
        if (cb) cb()
    }

    $('.popbox').removeClass('current')
    $popTPL.find('> div').addClass('current')
    $(document.body).append($popTPL);
    setTimeout(function () {
        $('.popmark.current').addClass('show');
        $('.popbox.current').addClass('show');
    }, 10);
}
