/*!
 *  Create Date: 2016-06
 *  Author: zihan
 *  verstion: 1.3.1
 */

XLJ.ajaxData = window.XLJ.ajaxData || function(url, type, data, callback, returnTip, errorCallBack) {

    // if request ban, don't do anthing
    if (XLJ.httpRequestDisabled === true) return

    var _type = 'GET', timeout = ''

    if (typeof type === 'function') {
        returnTip = data
        callback = type
        data = ''
    } else if (typeof data === 'function') {
        returnTip = callback
        callback = data
    }

    if (type && (type === 'GET' || type === 'POST' || type === 'PUT' || type === 'DELETE')) {
        _type = type || 'GET'
    } else if (typeof type !== 'function') {
        data = type
    }

    if (data && typeof data == 'object' && data.timeout) {
        timeout = data.timeout
        delete data.timeout
    }

    // add request domain
    return $.ajax({
        url:     url,
        type:    _type,
        timeout: timeout,
        data:    data || '',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('System-Type', XLJ.systemType)
            xhr.setRequestHeader('Content-Type', XLJ.contentType)
            xhr.setRequestHeader('Current-Url', window.location.href)
        },
        complete: function(xhr, status) {
            if (status == 'timeout') return;
        },
        success: function(response, status, xhr) {
            if (response.apiCode && response.apiCode == 8002 && XLJ.loginPath) {
                // ban all http request
                XLJ.httpRequestDisabled = true
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
            }
            if (!response.success) {
                if (response.apiCode == 1302 && response.result && response.result.Location) {
                    // ban all http request
                    XLJ.httpRequestDisabled = true
                    return window.location.href = response.result.Location;
                }

                if (returnTip) return XLJ.tip(response.msg);
            }
            if (callback) callback(response, xhr);
        },
        error: function(xhr) {
            if (XLJ.debug) {
                alert('error: ' + xhr.status)
            } else {
                console.log('error:' + xhr.status)
            }

            if (xhr.status === 403 && XLJ.loginPath) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL
            }
            if (errorCallBack) errorCallBack()
            return XLJ.tip('ERROR:' + xhr.status)
        }
    });
}

XLJ.ajaxDataAlways = XLJ.ajaxDataAlways || function(request, $operation, callback) {
    clearTimeout(XLJ.ajaxDataAlwaysTimeSet)
    $.when(request).always(function(ev) {
        XLJ.ajaxDataAlwaysTimeSet = setTimeout(function() {
            if ($operation && $operation.length > 0) $operation.removeClass('loading')
            if (callback) callback(ev)
        }, 300)
    });
}
