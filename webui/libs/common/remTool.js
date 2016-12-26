/*!
 * Create by zihan on 2016-07-11
 * verstion: 1.0.2
 */
//

XLJ.remTool = XLJ.remTool || (function(root, window) {

    'use strict'

    // sandbox model
    var document = window.document
    var $ = window.jQuery

    var
        $doc         = $(document),
        $docBody     = $(document.body),
        docBody_w    = $docBody.width(),
        baseFontSize = 10,
        baseWidth    = 320,
        winW         = $docBody.width,

        ua = navigator.userAgent,
        dpr = window.devicePixelRatio

    if (docBody_w > 640) docBody_w = 640
    baseFontSize = (docBody_w / baseWidth) * baseFontSize


    $('html').css('font-size', baseFontSize)

    return root;

}(XLJ.remTool || {}, typeof window !== 'undefined' ? window : this));
