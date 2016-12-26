
/*
 *  Theme
 */
XLJ.themeStyle = window.XLJ.themeStyle || (function() {
    XLJ.themeLayout = XLJ.getQueryString('ly') || XLJ.themeLayout
    if (XLJ.themeLayout) {
        var $themeStyle = document.getElementById('themeStyle')
        if ($themeStyle) {
            var _themeStyle_href = $themeStyle.href || ''
            if (_themeStyle_href) {
                var reg = new RegExp('(theme\/)(.*)?(\.css)', 'i')
                $themeStyle.href = _themeStyle_href.replace(reg, '$1' + XLJ.themeLayout + '$3')
            }
        }
    }
})();
