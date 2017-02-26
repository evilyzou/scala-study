/*!
 *  Create Date: 2017-01
 *  verstion: 1.2.0
 */

// callback exp:
// XLJ.CallApp.getMessage('login', {}, function(data) {
//     getUserInfo(data.cookie || '')
// })

// app send
// ex:
// web send:
// {
//     type: 'cookie',
//     value: true,
//     call: 'cookie'
// }
//
// app run and send:
// XLJ.CallApp.send['cookie']({
//     data: '__Track_=81a4df69-093e-4462-8d9f-e7bda4f37fbf; __Track_=acd62249-955d-462f-b0a8-3b4e8038957c;.......'
// })

XLJ.CallApp = window.XLJ.CallApp || (function(root, window) {
    var document = window.document
        ,ua = navigator.userAgent.toLowerCase()

    root.check = function() {
        var
            _inApp = /bringbuys|ola/.test(ua)
            ,isIos = /iphone|ipad|ipod/.test(ua)
            ,isAndroid = /android/.test(ua)

        if (!_inApp) return false
        if (isIos) {
            return 'isIos'
        } else if (isAndroid) {
            return 'isAndroid'
        }
        return false
    }

    root.postMessage = function(params){
        if (!params) return
        if (typeof params == 'object') params = JSON.stringify(params)

        if (/iphone|ipad|ipod/.test(ua)) {
            var webkit   = webkit || window.webkit
            if (!webkit) return console.log('%cNot have Webkit object', 'color:#c00');
            if (!webkit.messageHandlers || !webkit.messageHandlers.BRB) return console.log('%cHad not created BRB object', 'color:#f80');

            var BRBwebkit = webkit.messageHandlers.BRB;
            BRBwebkit.postMessage(params);
        } else if (/android/.test(ua)) {
            alert(params);
        }
    };

    root.send = {}
    root.getMessage = function(callName, params, callback) {
        if (!callName) return
        params.call = callName
        params.type = params.type || callName
        root.send[callName] = callback
        root.postMessage(params)
    }

    return root;
})(XLJ.CallApp || {}, typeof window != 'undefined' ? window : this);
