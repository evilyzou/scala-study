/*!
 * Create by zihan on 2015-12-22
 * Get link object
 */

XLJ.getUrlObj = window.XLJ.getUrlObj || function(url) {
    var a = document.createElement('a')
    a.href = url || ''
    a.relative = (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1]
    return a
}
