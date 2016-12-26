/*!
 *  Create by zihan on 2015
 *  XLJ XMLHttpRequest
 */

XLJ.httpRequest = window.XLJ.httpRequest || function(options) {
    var options = options  || {}
    var _url = options.url || ''
    if (!_url) return console.log('A bed url, no request.')
    // add request domain
    if (!/^http/.test(_url)) _url = XLJ.requestDomain + _url

    var _data        = options.data        || '',
        _type        = options.type        || 'GET',
        _dataType    = options.dataType    || 'json',
        _systemType  = options.systemType  || XLJ.systemType,
        _contentType = options.contentType || XLJ.contentType,
        _beforeSend  = options.beforeSend  || '',
        _completed   = options.completed   || '',
        _success     = options.success     || '',
        _error       = options.error       || '',
        _fail        = options.fail        || ''

    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open(_type, _url)

    if (typeof _beforeSend === 'function') _beforeSend(XMLHttp)
    XMLHttp.setRequestHeader('System-Type', _systemType)
    XMLHttp.setRequestHeader('Content-Type', _contentType)

    XMLHttp.send(_data)
    XMLHttp.onreadystatechange = function() {
        if (XMLHttp.readyState != 4) return

        // request completed
        if (typeof _completed === 'function') _completed()

        // error
        if (XMLHttp.status != 200) {
            if (typeof _error === 'function') _error(XMLHttp)
            return
        }

        // requset success
        if (XMLHttp.responseText) {
            if (typeof _success === 'function') {
                var response = (_dataType == 'json') ? eval('(' + XMLHttp.responseText + ')') : XMLHttp.responseText
                _success(response, XMLHttp)
            }
        } else {
            console.log(XMLHttp.status + ':' + XMLHttp.statusText)
            if (typeof _fail === 'function') _fail(XMLHttp)
        }
    }
}
/* End XLJ XMLHttpRequest */
