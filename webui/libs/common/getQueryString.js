/*
 * Create by zihan on 2016
 * v1.2.1
 */
XLJ.getQueryString = window.XLJ.getQueryString || function(name, source) {
    var reg = new RegExp('(?:^|\\?|&)(' + name + ')(?:=([^&]*)|)(?:&|$)', 'i'),
        source = source || window.location.search,
        result = source.match(reg)
    return (result) ? decodeURIComponent(result[2]) : ''
}
