
XLJ.getQueryString = window.XLJ.getQueryString || function(name, source) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
        source = source || window.location.search,
        r = source.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return ''
}
