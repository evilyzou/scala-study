/**
 * Created by wanp on 16-11-24.
 */

'use strict'


XLJ.weixin = window.XLJ.weixin || {
        config: function (callback, url) {

            var debug = XLJ.debug || false;
            if (XLJ.debug) alert('weixin sdk state: ' + ((typeof wx) ? 'ok' : 'fail'))

            if ((typeof wx) == "undefined" || wx == '') return;
            var apiList = [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'launch3rdApp',
                'openCard'
            ];

            // get signatures
            var _url = encodeURIComponent((url || window.location.href));
            var configUrl = '/Wechat/jsConfig?url=' + _url;
            //var configUrl = '/Wechat/jsConfig?url=http://m.mall.bringbuys.com/cart/index.html';
            if (debug) alert('weixin sdk config url: ' + configUrl)

            $.ajax({
                url: configUrl,
                //type: 'POST',
                //data: { url: window.location.href },
                success: function (data) {
                    if (XLJ.debug) alert('"/Wechat/jsConfig" return data: ' + JSON.stringify(data))
                    if (data && data.result && data.result.config)
                        wxconfig(data.result.config);
                },
                error: function () {
                    if (debug) {
                        alert('fail to get config url');
                    }
                    return console.log('can not get config url');
                }
            });

            function wxconfig(data) {
                // config before all things for weixin
                if (XLJ.debug) alert('api config: ' + JSON.stringify(data))
                if (typeof data == 'string') data = JSON.parse(data)
                wx.config({
                    debug:     debug,
                    appId:     data.appId,
                    timestamp: data.timestamp,
                    nonceStr:  data.noncestr,
                    signature: data.signature,
                    jsApiList: apiList
                });

                wx.checkJsApi({
                    jsApiList: ['getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log(res)
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });

                wx.ready(function () {
                    // run function
                    if (typeof callback === 'function') callback(data.appId);
                });

                if (debug) {
                    alert(
                        "appId: " + data.appId + "\n" +
                        "timestamp: " + data.timestamp + "\n" +
                        "nonceStr: " + data.noncestr + "\n" +
                        "signature: " + data.signature + "\n" +
                        "jsApi_ticket: " + data.jsapi_ticket
                    );
                }
            }

        },

        location: function (callback) {
            XLJ.weixin.config(function() {
                wx.getLocation({
                    success: function (res) {
                        if (typeof callback === 'function') callback(res);
                    },
                    cancel: function (res) {
                        alert('用户拒绝授权获取地理位置');
                    }
                });
            });
        },

        launch3rdApp: function (callback) {
            XLJ.weixin.config(function(appId) {
                wx.invoke('launch3rdApp', {
                    appID: appId || 'wx12312412312313',
                    messageExt: encodeURIComponent(a.iosUrl || a.url),
                    extInfo: encodeURIComponent(a.androidUrl || a.url)
                }, function(res) {
                });
            });
        },


        /*
         * share info template
         *

         var linkid = '';
         //var matchid = window.location.href.match(/\/post\/([0-9]*)/);   //此为获取贴子路径post
         //linkid = (matchid) ? matchid[1] : 0;                            //获取路径ID

         commonStart.weixinShare({
         lineLink    : window.location.href,
         imgUrl      : '',
         descContent : '',
         shareTitle  : '',,
         uskey       : 'SDSIIIZIHAN',
         reportData: {

         // 以下参数全部可选

         uid:      '12312'
         type:     'activityWeb',    // 页面类型
         // activityWeb	活动
         // productDetail	产品详情（商品详情）
         // videoDetail	视频
         // postDetail	帖子
         // home		    页面   （未知类型或分享页面）
         // app			分享app（邀请好友下载app）
         // paymentSuccess	支付成功分享红包
         // 其它自定义名称

         type_val: linkid            // 对应类型的ID
         }
         });
         */
        share: function (setting) {

            if ((typeof wx) == "undefined" || wx == '') return;
            var debug = XLJ.debug || false;

            if (debug) alert('weixin share in')

            if (setting) {
                var lineLink    = setting.lineLink    || window.location.href;
                var imgUrl      = setting.imgUrl      || '';
                var descContent = setting.descContent || '';
                var shareTitle  = setting.shareTitle  || '';
                var productId   = setting.productId   || '0';
                var uskey       = setting.uskey       || '0';
                var config      = setting.config      || '';
                var params      = setting.params      || '';
                var customUrl   = setting.customUrl   || '';
                var success     = setting.success     || function() {};
                var cancel      = setting.cancel      || function() {};
                var reportData  = setting.reportData  || {};
                var debug       = setting.debug       || false;
//            var test        = setting.test        || '';
            } else {
                return;
            }


            // filter the target key from url
            var urlSearchStart = lineLink.indexOf('?');
            if (urlSearchStart != -1) {
                var clearName = '(uskey=|userkey=|userKey=|code=|actId=|fromUserId=|orderUserId=)';
                var reg = new RegExp('(^|&)' + clearName + '([^&]*)(?=&|$)', 'g');
                var urlSearch = lineLink.substr(urlSearchStart + 1),
                    nUrlSearch = urlSearch.replace(reg, '');
                nUrlSearch = (nUrlSearch.indexOf('&') == 0) ? nUrlSearch.substr(1) : nUrlSearch;
                nUrlSearch = (nUrlSearch.length == 0) ? '' : '?' + nUrlSearch
                lineLink = lineLink.substr(0, urlSearchStart) + nUrlSearch;
            }

            // add uskey for user share
            if (uskey) {
                if (lineLink.indexOf('?') == -1) {
                    lineLink += '?uskey=' + uskey;
                } else {
                    lineLink += '&uskey=' + uskey;
                }
            }
//        if (reportData.sti) {
//            if (lineLink.indexOf('?') == -1) {
//                lineLink += '?sti=' + reportData.sti;
//            } else {
//                lineLink += '&sti=' + reportData.sti;
//            }
//        }

            if (params) {
                if (lineLink.indexOf('?') == -1) {
                    lineLink += '?' + params;
                } else {
                    lineLink += '&' + params;
                }
            }

            if (customUrl) lineLink = customUrl;

            function shareReport(doAct, shareTo) {
                var shareInfo = {
                    sti:        reportData.sti || 0,
                    do_act:     doAct   || '',
                    share_to:   shareTo || '',
                    type:       reportData.type     || 'activityWeb',
                    type_val:   reportData.type_val || '',
                    uskey:      uskey,
                    share_path: lineLink/*,
                     param: {
                     customStr: 'OH~~yes'
                     }*/
                }
                console.log('shareInfo: ' + JSON.stringify(shareInfo));
                try {
                    SFM.Stats().upload(20, shareInfo);
                } catch(e) {
                    console.log(e);
                }
            }

            function createData(shareTo) {
                /*console.log('createTo')*/
                return {
                    title: shareTitle,
                    desc: descContent,
                    link: lineLink,
                    imgUrl: imgUrl,
                    success: function (res) {
                        success();
                        shareReport('succ', shareTo);
                        console.log('分享成功');
                    },
                    cancel: function (res) {
                        cancel();
                        shareReport('cancel', shareTo);
                        console.log('用户取消');
                    },
                    fail: function(res) {
                        shareReport('fail', shareTo);
                        console.log('分享失败');
                    }
                }
            }

            function shareFN() {
                wx.onMenuShareAppMessage(createData('wfriend'));//分享给好友
                wx.onMenuShareTimeline(createData('wecosys'));//分享到朋友圈
                wx.onMenuShareQQ(createData('qq'));//分享到QQ
                wx.onMenuShareWeibo(createData('sina'));//分享到腾讯微博
                //wx.onMenuShareQZone(createData('qqzone'));//分享到QQ空间  //不存在
            }

            XLJ.weixin.config(function() {
                shareFN();
            });

        }
    }