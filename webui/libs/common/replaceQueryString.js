/*
 * Create by zihan on 2016-04
 * v1.0.1
 */

XLJ.replaceQueryString = window.XLJ.replaceQueryString || function (name, param, source) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
        source = source || window.location.search,
        r = source.match(reg),
        nParam = ''

    if (!r) return

    nParam = r[1] + name + '=' + param + r[3]
    source = source.replace(reg, nParam)
    return source
};
