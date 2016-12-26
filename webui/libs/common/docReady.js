
/*
 *  document ready
 */
XLJ.isDocReady = window.XLJ.isDocReady || false
XLJ.docReady = window.XLJ.docReady || function(callback) {
    if (XLJ.isDocReady || document.getElementsByTagName('body')[0]) {
        XLJ.isDocReady = true
        if (callback) callback()
    } else if (document.addEventListener) {
        var domCLEDRM = function() {
            XLJ.isDocReady = true
            if (callback) callback()
            document.removeEventListener('DOMContentLoaded',domCLEDRM, false)
        }
        document.addEventListener('DOMContentLoaded', domCLEDRM, false)
    } else if (document.attachEvent) {
        var domCLEDRM = function() {
            if (document.readyState == 'complete') {
                XLJ.isDocReady = true
                if (callback) callback()
                document.detachEvent('onreadystatechange', domCLEDRM)
            }
        }
        document.attachEvent('onreadystatechange', domCLEDRM)
    }
}
/* end document ready */
