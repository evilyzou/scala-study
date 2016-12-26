/*!
  *  Create Date: 2016-06
  *  Author: zihan
  *  v2.1.1
  */

/**
// Tip Box
// How to use it :
// XLJ.tip('Tip text');          // default style
// XLJ.tip('Tip text', 'Type');  // Type1: success,
// Type2: warning,
// Type3: error,
// Type4: info;
*/
XLJ.tip = window.XLJ.tip || function(text, type, callback, keep) {
    if (!text) return false
    var _type = type || ''
    if (typeof type === 'function') callback = type, _type = ''

    var
        clickType = XLJ.clickType || (/Mobile/.test(navigator.userAgent) ? 'touchstart' : 'click'),
        $docBody = $(document.body),
        $popBoxWrap = $docBody.find('> .popBoxWrap'),
        _popTpl = '<div class="poptip ' + _type + '">'
                + '<div class="head"><div class="cssicon close"></div><div class="title"></div></div>'
                + '<div class="main"><div class="content">' + text + '</div></div>'
                + '<div class="foot"></div>'
                + '</div>',
        $popTPL = $(_popTpl),
        _lastBoxBottom = 50,
        removeTime,
        closeTime

    function closePop(target) {
        if (!target || !target.length) target = $(this).closest('.poptip')
        target.removeClass('show')

        clearTimeout(closeTime)
        closeTime = setTimeout(function () {
            target.remove()
        }, 500)
        if (callback) callback()
    }

    if ($popBoxWrap.length == 0) {
        $popBoxWrap = $('<div class="popBoxWrap"></div>')
        $docBody.append($popBoxWrap)
    }

    // current popbox number
    $popBoxWrap.find('> div').each(function() {
        var _this = $(this)
        if (_this.hasClass('show') && _this.css('display') != 'none') {
            _lastBoxBottom = (parseInt(_this.css('bottom')) + _this.outerHeight() + 5)
            return true // jump
        }
    })

    $popTPL.css('bottom', _lastBoxBottom)
    $popTPL.prependTo($popBoxWrap)

    // animate support
    setTimeout(function () {
        $popTPL.addClass('show')
    }, 10)

    if (!keep) {
        // close
        removeTime = setTimeout(function () {
            closePop($popTPL)
        }, 2800)

        $popTPL.on('mouseover', function() { clearTimeout(removeTime) })
        $popTPL.on('mouseout', function() {
            removeTime = setTimeout(function () {
                closePop($popTPL)
            }, 1000)
        })
    }

    $docBody
        .off(clickType, '.poptip',        closePop)
        .on(clickType,  '.poptip',        closePop)
        .off(clickType, '.poptip .close', closePop)
        .on(clickType,  '.poptip .close', closePop)
}
