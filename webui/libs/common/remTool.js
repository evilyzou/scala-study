/*!
 * Create by zihan on 2016-07-11
 * verstion: 1.3.1
 */

XLJ.remTool = XLJ.remTool || (function(root, window) {

    'use strict'

    var document = window.document

    function baseFontSize() {
        var
            // _docBody_w    = document.body.clientWidth,
            _docBody_w    = window.innerWidth,
            _baseFontSize = 10,
            _baseWidth    = 320

        // ,ua = navigator.userAgent
        // ,dpr = window.devicePixelRatio

        if (_docBody_w > 640) _docBody_w = 640
        return _docBody_w * _baseFontSize / _baseWidth
    }

    root.init = (function() {
        var $html = document.getElementsByTagName('html')
        if (!$html || $html.length == 0) return

        $html[0].style.fontSize = baseFontSize() + 'px'

        window.addEventListener('resize', function() {
            $html[0].style.fontSize = baseFontSize() + 'px'
        }, false)
    })();

    return root;

}(XLJ.remTool || {}, typeof window !== 'undefined' ? window : this));
