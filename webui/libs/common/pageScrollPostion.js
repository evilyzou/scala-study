/*!
 *  Create Date: 2017-01
 *  Author: zihan
 *  verstion: 1.2.0
 */
/*
 * ex:

    // ex 1:
    // just use this init fn is ok
    if (typeof XLJ.pageScrollPostion != 'undefined') XLJ.pageScrollPostion.init()

    // this code just use after you do soming, must use init fn first
    if (typeof XLJ.pageScrollPostion != 'undefined') XLJ.pageScrollPostion.scrollTo()


    // ex 2:
    // pageScrollPostion custom params
    var _pspOption = {
        $container: $('.maincontent')    // the scroll container, always is $(document.body)
        // ,$dataBox: $container
        // ,saveHTMLState: true
    }
    if (typeof XLJ.pageScrollPostion != 'undefined') XLJ.pageScrollPostion.init(_pspOption)
*/

XLJ.pageScrollPostion = window.XLJ.pageScrollPostion || (function(root, window) {
    // if (!/micromessenger/.test(navigator.userAgent.toLocaleLowerCase())) return

    function buildHrefTag() {
        var _wl = window.location
            ,_href_tag = _wl.pathname + _wl.search + _wl.hash
        return encodeURIComponent(decodeURIComponent(_href_tag))
    }

    function clearTheSamePathStorage() {
        if (XLJ.sessionStorage.length < 1) return

        var _path = encodeURIComponent(decodeURIComponent(window.location.pathname))
        var _regx = new RegExp(_path)
        for (var key in XLJ.sessionStorage) {
            if (_regx.test(key)) {
                delete XLJ.sessionStorage[key]
            }
        }
    }

    function getHTML($container) {
        var $container = $container || $('.maincontent')
        return XLJ.sessionStorage.getItem('pageScroll-content-' + buildHrefTag())
    }

    function setHTML($container) {
        var $container = $container || $('.maincontent')
        return XLJ.sessionStorage.setItem('pageScroll-content-' + buildHrefTag(), $container.html())
    }

    function getPoint($container) {
        return XLJ.sessionStorage.getItem('pageScroll-postion-' + buildHrefTag())
    }

    function scrollTo($container) {
        // scroll top save page postion
        var _pagep = getPoint()
        var $container = $container || $('.maincontent')
        if (_pagep) $container.scrollTop(getPoint())
    }

    function removeScrollContainer($container) {
        var $container = $container || $('.maincontent')

        var _saveT = ''
        var _fn_scroll = function(e) {
            var _stop = e.currentTarget.scrollTop

            clearTimeout(_saveT)
            _saveT = setTimeout(function() {
                XLJ.sessionStorage.setItem('pageScroll-postion-' + buildHrefTag(), _stop)
            }, 80)
        }

        $container
            .off('scroll', _fn_scroll)
    }

    function setPoint($container, $dataBox, saveHTMLState) {
        var $container = $container || $('.maincontent')

        clearTheSamePathStorage()

        var _saveT = ''
        var _fn_scroll = function(e) {
            var _stop = e.currentTarget.scrollTop

            clearTimeout(_saveT)
            _saveT = setTimeout(function() {
                XLJ.sessionStorage.setItem('pageScroll-postion-' + buildHrefTag(), _stop)
                if (saveHTMLState) setHTML($dataBox)
            }, 80)
        }

        $container
            .off('scroll', _fn_scroll)
            .on('scroll', _fn_scroll)
    }

    function init(option) {
        var _default = {
            $container: $('.maincontent')
            ,$dataBox:  $('.maincontent')
            ,saveHTMLState:  false
        }
        ,opt = $.extend({}, _default, option)

        if (opt.saveHTMLState) {
            var _html = getHTML(opt.$container)
            if (_html) opt.$container.html(_html)
        }

        // set
        var _fn = function(e) {
            scrollTo(opt.$container)
            setPoint(opt.$container, opt.$dataBox, opt.saveHTMLState)
        }
        $(window)
            .off('load', _fn)
            .on('load', _fn)
    }

    root.setHTML  = setHTML
    root.getHTML  = getHTML
    root.remove   = removeScrollContainer
    root.scrollTo = scrollTo
    root.set      = setPoint
    root.init     = init

    return root
})(XLJ.pageScrollPostion || {}, typeof window != 'undefined' ? window : this);
