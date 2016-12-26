/*!
 *  Create Date: 2016-06-28
 *  Author: zihan
 *  verstion: 1.0.0
 */


XLJ.ajaxSubmit = window.XLJ.ajaxSubmit || function(form, progressBox, callback, returnTip) {
    if (!form || !form.length > 0) return console.log('Not form target')
    if (!progressBox || !progressBox.length > 0) progressBox = ''

    form.ajaxSubmit({
        beforeSend: function() {
            if (progressBox) progressBox.show()
        },
        uploadProgress: function(event, position, total, percentComplete) {
            console.log('total: ' + total)
            console.log('percentComplete: ' + percentComplete)
            if (progressBox) {
                var percent = percentComplete + '%'
                console.log(percent)
                if (percentComplete < 20) percent = '20%'
                progressBox.find('.progress-bar').css('width', percent)
            }
        },
        success: function(response, status, xhr) {
            if (response.apiCode && response.apiCode == 8002) {
                var backURL = encodeURIComponent(decodeURIComponent(window.location.href))
                return window.location.href = XLJ.rootPath + XLJ.loginPath + '?backURL=' + backURL;
            }
            if (!response.success) {
                if (response.apiCode == 1302 && response.result && response.result.Location)
                    return window.location.href = response.result.Location;

                if (returnTip) return XLJ.tip(response.msg);
            }
            if (progressBox) {
                progressBox.find('.progress-bar').css('width', '100%').addClass('progress-bar-success')
                setTimeout(function() {
                    progressBox.fadeOut()
                }, 500)
            }
            if (callback) callback(response);
        },
        error: function(err) {
            if (XLJ.debug) return alert('error: ' + err)
            console.log(err)
        }
    });
}
