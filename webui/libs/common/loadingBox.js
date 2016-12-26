
// Loading Box
// How to use it :
// XLJ.loadingBox();          // will be close/remove loading box
// XLJ.loadingBox('remove');  // remove loading box
XLJ.loadingBox = window.XLJ.loadingBox || function (text, cls) {

    var cls = cls || '';
    var $boxTpl = $('<div class="mod-loading" style="display: block;"><div class="animate"></div><div class="txt"></div></div>');
    var mloadingbox = $('body > .mod-loading');

    if (text == 'remove') {
        mloadingbox.fadeOut(500);
        t = setTimeout(function () {
            mloadingbox.remove();
        }, 501);
    } else {
        clearTimeout(t);

        mloadingbox.remove();
        if (text) $boxTpl.find('.txt').text(text);
        $(document.body).append($boxTpl);
        t = setTimeout(function () {
            $('.mod-loading').addClass('bgmark ' + cls);
        }, 20);
    }
}
