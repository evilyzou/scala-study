/* Create by zihan no 2016-09-09 */
/* v1.0.0 */

XLJ.setPageClass = window.XLJ.setPageClass || (function() {
    var ua = navigator.userAgent.toLowerCase()
    if (/bringbuys/.test(ua)) {
        document.getElementsByTagName('html')[0].classList.add('inApp');
    }
})();
