// for APP WebViewJavascriptBridge function

//window.onerror = function(err) {
//    log('window.onerror: ' + err)
//}


window.webkit.messageHandlers.BRB.postMessage({item:'1'})

//
// function getQueryString(name, source) {
//     var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i'),
//         source = source || window.location.search,
//         r = source.match(reg)
//     if (r != null) return decodeURIComponent(r[2])
//     return ''
// }
//
// ;(function(window) {
//     if ((window.location.search).indexOf('inapp') != -1) {
//         var link = document.querySelectorAll('a')
//         for (var i = 0; i < link.length; i++) {
//             var linkHref = link[i].getAttribute('href') || ''
//             if (!linkHref) return
//             if (!linkHref.indexOf('#') == 0) {
//                 if (linkHref.indexOf('inapp') == -1) {
//                     if (linkHref.indexOf('?') == -1) {
//                         link[i].setAttribute('href', linkHref + '?inapp')
//                     } else {
//                         link[i].setAttribute('href', linkHref + '&inapp')
//                     }
//                 }
//             }
//         }
//     }
// })(typeof window !== 'undefined' ? window : this);
//
// var APP_BRIDGE = function() {
//
// }
//
// /*
//    navtive app action ready
//  */
// function docReady(callback) {
//     var docBody = document.getElementsByTagName('body')[0]
//     if (docBody) {
//         if (callback) callback()
//     } else if (document.addEventListener) {
//         document.addEventListener('DOMContentLoaded', function() {
//             document.removeEventListener('DOMContentLoaded',arguments.callee, false)
//             if (callback) callback()
//         }, false)
//     } else if (document.attachEvent) {
//         document.attachEvent('onreadystatechange', function() {
//             if (document.readyState == 'complete') {
//                 document.detachEvent('onreadystatechange', arguments.callee)
//                 if (callback) callback()
//             }
//         })
//     }
// }
//
// function connectWebViewJavascriptBridge(callback) {
//     if (window.WebViewJavascriptBridge) {
//         callback(WebViewJavascriptBridge)
//     } else {
//         document.addEventListener('WebViewJavascriptBridgeReady', function() {
//             callback(WebViewJavascriptBridge)
//         }, false)
//     }
// }
//
// if (document.referrer.indexOf('cb=f') !== -1) {
//     var _origin = window.location.origin,
//         _pathname = window.location.pathname,
//         _search = window.location.search,
//         _hash = window.location.hash
//
//     if (_search && _search.indexOf('cb=f') === -1) {
//         _search += '&cb=f'
//     } else {
//         _search = '?cb=f'
//     }
//
//     var _winHref = _origin + _pathname + _search + _hash
//     if (_winHref) {
//         var _tagBody = document.getElementsByTagName('html')[0];
//         if (_tagBody.className.indexOf('inCbf') == -1) {
//             _tagBody.className += ' inCbf';
//         }
//         window.history.replaceState('', '', _winHref)
//     }
// }
//
// var objCcb = getQueryString('cb')
// if (objCcb !== 'f' && document.referrer.indexOf('cb=f') === -1)
//     connectWebViewJavascriptBridge(function(bridge) {
//
// //    bridge.init(function(message, responseCallback) {
// //        var data = { 'Javascript Responds':'Wee!' }
// //        responseCallback(data)
// //    });
//
// //    bridge.registerHandler('productJSHandler', function(data, responseCallback) {
// //        var responseData = { 'Javascript Says':'Right back atcha!' }
// //        responseCallback(responseData)
// //    });
//
//     var title = document.querySelector('#share_title');
//     var shareTitle = (title) ? title.innerHTML : '鎬濊姍缇庡';
//
//     var content = document.querySelector('#share_description');
//     var shareContent = (content) ? content.innerHTML : '鍏ㄧ悆缇庡娴峰璐紝鍥介檯杞繍棣欐腐鐩村彂銆�';
//
//     var pic = document.querySelector('#share_pic img');
//     var sharePic = (pic) ? pic.getAttribute('src') : 'http://assets.sephome.com/system/wechat/images/logo-share.png';
//
//     var url = document.querySelector('#share_url');
//     var shareUrl = (url) ? url.getAttribute('data-url') : window.location.href;
//
//     // 椤甸潰涓诲姩鍙戦€佸垎浜俊鎭� 锛堣皟鐢ㄥ垯鏄剧ず鍒嗕韩鎸夐挳锛屽弽涔嬪垯涓嶆樉绀猴級
//     var options = {
//         callType: 'needSharePage',
//         params: {
//             shareTitle: shareTitle,
//             shareContent:shareContent,
//             sharePic:sharePic,
//             shareUrl:shareUrl
//         }
//     }
//     bridge.callHandler('AppJSBack', options, function(response) {});
//
//     //璺宠浆鍟嗗搧
// 	/**
// 	 * var productlinks = document.querySelectorAll('.list a')
//     for (var i=0; i < productlinks.length; i++) {
//         productlinks[i].onclick = function(e) {
//
//             goApp(this, e)
//         }
//     }**/
//
//     var parent = document.querySelectorAll(".list");
//     for(var i = 0; i < parent.length; i++){
//     	parent[i].addEventListener("click",function(e) {
// 			e.preventDefault();
// 	        var target = e.target;
// 	        while(target !== e.currentTarget){
// 	            switch (target.nodeName){
// 	                case "A":
// 	                      goApp(target, e)
// 	                    break;
// 	            }
// 	            target = target.parentNode;
// 	        }
// 	    },false);
//     }
//
//     function goApp(target, e) {
//
//         var _this = target;
//         var linkHref = _this.getAttribute('href'),
//             linkPos = linkHref.lastIndexOf('/') + 1,
//             linkPosLast = linkHref.lastIndexOf('ios'),
//             linkid;
//
//         if (linkPosLast != -1) {
//             linkid = parseInt((linkHref.substring(linkPos, linkPosLast - 1)).match(/^\d+/g));
//
//         } else {
//             linkid = parseInt((linkHref.substring(linkPos, linkHref.length)).match(/^\d+/g));
//         }
//
//         if (linkHref.indexOf('products') != -1) {
//             e.preventDefault()
//
//             var dataContent = _this.getAttribute('data-content') || getQueryString('keyword', linkHref) || ''
//
//             var cid= getQueryString('cid', linkHref) || ''
//             var pv= getQueryString('pv', linkHref)   || ''
//
//             var options = {
//                 callType: 'searchProduct',
//                 params: {
//                     'cid': cid, 'pv': pv, 'keyword': dataContent
//                 }
//             }
//
//             bridge.callHandler('AppJSBack', options, function(response) {})
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'searchProduct': dataContent}, function(response) {})
//             }, 20)
//
//         } else if (linkHref.indexOf('category?brand') != -1) {
//             e.preventDefault()
//
//             var options = {
//                 callType: 'searchPanl',
//                 params: {
//                     'category': 'brand'
//                 }
//             }
//
//             bridge.callHandler('AppJSBack', options, function(response) {})
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'searchPanl': 'category=' + brand}, function(response) {})
//             }, 20)
//
//         } else if (linkHref.indexOf('product') != -1 && linkHref.indexOf('liveshow') != -1) {
//             var options = {
//                 callType: 'liveProduct',
//                 params: {
//                     'liveProductID': linkid
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'liveProductID': linkid}, function(response) {});
//
//                 setTimeout(function() {
//                     bridge.callHandler('AppJSBack', {'liveProductID': linkid}, function(response) {});
//                 }, 20);
//             }, 20);
//             e.preventDefault()
//         } else if (linkHref.indexOf('product') != -1 && linkHref.indexOf('exchange') != -1) {
//             var options = {
//                 callType: 'pointsMallProduct',
//                 params: {
//                     'pointsMallProduct': linkid
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'pointsMallProduct': linkid}, function(response) {});
//
//                 setTimeout(function() {
//                     bridge.callHandler('AppJSBack', {'pointsMallProduct': linkid}, function(response) {});
//                 }, 20);
//             }, 20);
//             e.preventDefault()
//         } else if (linkHref.indexOf('product') != -1) {
//             e.preventDefault()
//             var options = {
//                 callType: 'product',
//                 params: {
//                     'productID': linkid
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'productID': linkid}, function(response) {});
//             }, 20);
//
//             e.preventDefault()
//         } else if (linkHref.indexOf('video') != -1) {
//             var options = {
//                 callType: 'video',
//                 params: {
//                     'videoID': linkid
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'videoID': linkid}, function(response) {});
//             }, 20);
//
//             e.preventDefault()
//         } else if (linkHref.indexOf('showme') != -1) {
//             var options = {
//                 callType: 'showme',
//                 params: {
//                     'showmeID': linkid
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             setTimeout(function() {
//                 bridge.callHandler('productJSBack', {'showmeID': linkid}, function(response) {});
//             }, 20);
//
//             e.preventDefault()
//         }
//     }
//
//     //璺宠浆鍝佺墝
//     /**
//     var brandlinks = document.querySelectorAll('.listbrand a')
//     for (var i=0; i < brandlinks.length; i++) {
//         brandlinks[i].onclick = function(e) {
//
//             brandgoApp(this, e)
//         }
//     }**/
//
//    	var parent = document.querySelectorAll(".listbrand");
//     for(var i = 0; i < parent.length; i++){
//     	parent[i].addEventListener("click",function(e) {
// 			e.preventDefault();
// 	        var target = e.target;
// 	        while(target !== e.currentTarget){
// 	            switch (target.nodeName){
// 	                case "A":
// 	                      brandgoApp(target, e)
// 	                    break;
// 	            }
// 	            target = target.parentNode;
// 	        }
// 	    },false);
//     }
//
//     function brandgoApp(target, e) {
//
//         var _this = target;
//         var linkHref = _this.getAttribute('href'),
//             linkPos = linkHref.lastIndexOf('/') + 1,
//             linkPosLast = linkHref.lastIndexOf('ios'),
//             linkid;
//
//         var keywords= getQueryString('keyword', linkHref)
//
//         if (linkHref.indexOf('keyword') != -1) {
//             var options = {
//                 callType: 'searchProduct',
//                 params: {
//                     'cid': '', 'pv': '', 'keyword': keywords
//                 }
//             }
//             bridge.callHandler('AppJSBack', options, function(response) {});
//             e.preventDefault()
//         }
//
//     }
//
//     /*
//        navtive app action ready
//      */
//     docReady(function() {
//         var dochtml = document.getElementsByTagName('html')[0]
//         dochtml.classList.add('appready')
//         dochtml.classList.remove('loading')
//     })
//     /* end navtive app action ready */
// });
