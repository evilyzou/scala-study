/* 
* 智能机浏览器版本信息: 
*/ 
var Browser={ 
	versions:function(){ 
		var u = navigator.userAgent, app = navigator.appVersion; 
		return {//移动终端浏览器版本信息 
			trident: u.indexOf('Trident') > -1, //IE内核 
			presto: u.indexOf('Presto') > -1, //opera内核 
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器 
			WindowsPhone: u.indexOf('Windows Phone') > -1, //是否为Windows Phone 
			iPad: u.indexOf('iPad') > -1 //是否iPad 
		}; 
	}(), 
	language:(navigator.browserLanguage || navigator.language).toLowerCase() 
} 

function obj2str(o){
    var r = [];
    if(o==null) return "''";
    if(typeof o == "string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    if(typeof o == "object"){
        if(!o.sort){
            for(var i in o)
                r.push(i+":"+obj2str(o[i]));
            if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                r.push("toString:"+o.toString.toString());
            }
            r="{"+r.join()+"}"
        }else{
            for(var i =0;i<o.length;i++)
                r.push(obj2str(o[i]))
            r="["+r.join()+"]"
        }
        return r;
    }
    return o.toString();
}

/**
 * 微信支付
 */
var WeChatPay = {
    "init": function () {
    },
    /**
     * 验证用户浏览器是否支持微信支付
     */
    "isCanPay": function () {
        var userAgentStr = window.navigator.userAgent;
        var browserName = "micromessenger/";
        var idx = userAgentStr.toLocaleLowerCase().lastIndexOf(browserName);
        var wechatVersion = Number(userAgentStr.substring(idx + browserName.length).substring(0, 1));
        if (wechatVersion < 5) {    // 微信支付需要5.0客户端以上
            alert("微信支付需要5.0客户端以上！");
            return false;
        }
        return true;
    },
    /**
     * 调起微信支付（JS API方式）
     *
     * @param appId 公众号名称，由商户传入
     * @param timeStamp 时间戳
     * @param nonceStr 随机串
     * @param packageStr 扩展包
     * @param signType  微信签名方式: MD5
     * @param paySign 微信签名
     * @param orderNo
     */
    "pay": function (appId, timeStamp, nonceStr, packageStr, signType, paySign, orderNo) {
        if (typeof WeixinJSBridge == "undefined") {
            alert("您的浏览器暂不支持微信支付.");
            var url = '/order/' + orderNo+'?showwxpaytitle=1';
            window.location.href = url;
            return;
        }

        if (!this.isCanPay()) {
            return;
        }

        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": appId,
            "timeStamp": timeStamp,
            "nonceStr": nonceStr,
            "package": packageStr,
            "signType": signType,
            "paySign": paySign
        }, function (res) {
            /*
                          返回res.err_msg取值
             get_brand_wcpay_request:ok 发送成功
             get_brand_wcpay_request:cancel 用户取消
             get_brand_wcpay_request:fail   发送失败
             */
        	//alert(obj2str(res));
            //alert("测试信息，可以忽略：" + res.err_code + "," + res.err_desc + "," + res.err_msg);
            try {
                var image = new Image();
                image.src = WC.domainHome + "/wcpay/errorInfo?err_code=" + res.err_code + "&err_desc=" + res.err_desc + "&err_msg=" + res.err_msg;
            } catch (err) {
            }
            //该错误是“不允许跨号支付”
            if(res.err_code && (res.err_code=="268443680" || res.err_code=="3")){
            	window.location.href = '/order/'+orderNo+"?toWxScanPay=1&showwxpaytitle=1";
        		return;
        	}
            //该错误是“不允许跨号支付”
            if(res.err_desc && res.err_desc.indexOf("不允许跨号支付")>=0){
            	window.location.href = '/order/'+orderNo+"?toWxScanPay=1&showwxpaytitle=1";
            	return;
            }

            /*
		             使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
		             因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；
		             若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
             */
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                var url = '/order/paySuccess?orderNo=' + orderNo;
                window.location.href = url;
                return;
            }

            if (res.err_msg == "get_brand_wcpay_request:cancel") {
            	window.location.href = '/order/'+orderNo+'?showwxpaytitle=1';
            	/*if(Browser.versions.iPhone){
            	}else{
            		window.location.href = '/order/'+orderNo+"?toWxScanPay=1&showwxpaytitle=1";
            	}*/
                return;
            }

            if (res.err_msg == "get_brand_wcpay_request:fail") {
            	var url = '/error/submitform?error_type=PayError&orderNo=' + orderNo;
                window.location.href = url;
                return;
            }
            
            if (res.err_msg.indexOf("get_brand_wcpay_request:fail")!=-1) {
            	var url = '/order/' + orderNo+"?toWxScanPay=1&showwxpaytitle=1";
            	window.location.href = url;
            	return;
            }

            // TODO Retina.Ye 这里可以把错误信息发送到后台记录
            //console.log("微信支付出错.msg:" + res.err_msg);
        });
    },
    "joinFeePay": function (appId, timeStamp, nonceStr, packageStr, signType, paySign, mid) {
    	//alert('appId:'+appId+" timeStamp="+timeStamp+" nonceStr="+nonceStr+" packageStr="+packageStr+" signType="+signType+" paySign="+paySign);
    	if (typeof WeixinJSBridge == "undefined") {
    		alert("您的浏览器暂不支持微信支付");
    		var url = '/weishang/regsucc?mid='+mid+'&showwxpaytitle=1';
    		window.location.href = url;
    		return;
    	}
    	if (!this.isCanPay()) {
    		return;
    	}
    	
    	WeixinJSBridge.invoke('getBrandWCPayRequest', {
    		"appId": appId,
    		"timeStamp": timeStamp,
    		"nonceStr": nonceStr,
    		"package": packageStr,
    		"signType": signType,
    		"paySign": paySign
    	}, function (res) {
    		/*
                          返回res.err_msg取值
             get_brand_wcpay_request:ok 发送成功
             get_brand_wcpay_request:cancel 用户取消
             get_brand_wcpay_request:fail   发送失败
    		 */
    		//alert(obj2str(res));
    		//alert("测试信息，可以忽略：" + res.err_code + "," + res.err_desc + "," + res.err_msg);
    		//该错误是“不允许跨号支付”
            if(res.err_code && (res.err_code=="268443680" || res.err_code=="3")){
            	window.location.href = '/weishang/unpay?mid='+mid+"&toWxScanPay=1&showwxpaytitle=1";
        		return;
        	}
            //该错误是“不允许跨号支付”
            if(res.err_desc && res.err_desc.indexOf("不允许跨号支付")>=0){
            	window.location.href = '/weishang/unpay?mid='+mid+"&toWxScanPay=1&showwxpaytitle=1";
            	return;
            }
    		
    		/*
		             使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
		             因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；
		             若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
    		 */
    		if (res.err_msg == "get_brand_wcpay_request:ok") {
    			var url = '/weishang/paysucc?mid=' + mid;
    			window.location.href = url;
    			return;
    		}
    		
    		if (res.err_msg == "get_brand_wcpay_request:cancel") {
    			window.location.href = '/weishang/regsucc?mid='+mid+'&showwxpaytitle=1';
    			/*if(Browser.versions.iPhone){
    			}else{
    				window.location.href = '/weishang/regsucc?mid='+mid+"&toWxScanPay=1&showwxpaytitle=1";
    			}*/
    			return;
    		}
    		
    		if (res.err_msg == "get_brand_wcpay_request:fail") {
    			var url = '/weishang/unpay?mid='+mid;
    			window.location.href = url;
    			return;
    		}
    		
    		if (res.err_msg.indexOf("get_brand_wcpay_request:fail")!=-1) {
    			var url = '/weishang/unpay?mid='+mid+"&toWxScanPay=1&showwxpaytitle=1";
    			window.location.href = url;
    			return;
    		}
    		
    		// TODO Retina.Ye 这里可以把错误信息发送到后台记录
    		//console.log("微信支付出错.msg:" + res.err_msg);
    	});
    },
    "end": ""
};

