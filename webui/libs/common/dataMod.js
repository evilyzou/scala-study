/*!
 * Create by zihan on 2015-12-22
 * Data Mod
 */


XLJ.dataMod = window.XLJ.dataMod || function(url, option, callback, msgTarget, loadingBoxType, ajaxState) {
    var root = this;
    var t2;

    var page     = option.page     || 1,
        pageSize = option.pageSize || ''

    if (page) url = url + '?page=' + page + '&pageSize=' + pageSize
    delete option.page
    delete option.pageSize

    var option         = (!option) ? null : JSON.stringify(option);
    var msgTarget      = (msgTarget === null) ? null : (msgTarget && msgTarget.length > 0) ? msgTarget : '',
        loadingBoxType = loadingBoxType || '';

    return $.ajax({
        url:  url,
        type: 'POST',
        data: option,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('System-Type', XLJ.systemType)
            xhr.setRequestHeader('Content-Type', XLJ.contentType)

            clearTimeout(t2);
            if (msgTarget !== null) {
                t2 = setTimeout(function() {
                    root.loadingBox('', '', msgTarget, loadingBoxType);
                }, 60);
            }
        },
        complete: function() {
            clearTimeout(t2);
            if (msgTarget !== null) root.loadingBox('remove', '', msgTarget, loadingBoxType);
        },
        success: function(response, status, xhr) {
            if (response.apiCode && response.apiCode == 8002 && XLJ.loginPath) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
            }
            if (!response.success) {
                if (response.apiCode == 1302 && response.result && response.result.Location)
                    return window.location.href = response.result.Location;

                if (returnTip) return XLJ.tip(response.msg);
            }
            if (callback) callback(response, xhr);
        },
        error: function(xhr) {
            console.log('error:' + xhr.status)
            if (xhr.status === 403 && XLJ.loginPath) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL
            }
        }
    });
}
