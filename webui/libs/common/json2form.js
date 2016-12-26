/*!
 * Create by zihan on 2016
 * v1.0.0
 */

XLJ.json2form = window.XLJ.json2form || function(data) {
    var str = ''
    for (var key in data) {
        str += (key + '=' + data[key] + '&')
    }
    return str
}
