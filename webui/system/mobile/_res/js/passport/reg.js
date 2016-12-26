
var XLJ = window.XLJ || {}
var WEBP = window.WEBP || {}
var UTILS = (XLJ.Utils) ? XLJ.Utils() : ''
var t

function register(data, callback) {
    XLJ.ajaxData('/User/registration', 'POST', JSON.stringify(data), callback, 'showTip')
}

function login(data, callback) {
    XLJ.ajaxData('/User/login', 'POST', JSON.stringify(data), callback, 'showTip')
}

function updatePasswd(data, callback) {
    XLJ.ajaxData('/User/updatePassword', 'POST', data, callback, 'showTip')
}

function getRegCaptcha(data, callback) {
    //data.smsType = 'SIGN_UP'
    XLJ.ajaxData('/Captcha/forRegister', 'GET', data, callback, 'showTip')
}

function getLoginCaptcha(data, callback) {
    //data.smsType = 'SIGN_IN_WITH_CAPTCHA'
    XLJ.ajaxData('/Captcha/forCaptchaLogin', 'GET', data, callback, 'showTip')
}

function getFindPasswordCaptcha(data, callback) {
    //data.smsType = 'FORGET_PASSWORD'
    XLJ.ajaxData('/Captcha/forFindPassword', 'GET', data, callback, 'showTip')
}

function checkCaptcha(data, callback) {
    XLJ.ajaxData('/Captcha/check', 'GET', data, callback, 'showTip')
}

function checkUser(data, callback) {
    XLJ.ajaxData('/User/isExist', 'POST', JSON.stringify(data), callback, 'showTip')   // false -- is exist, true -- no exist
}

var currentTime = 60
function countDown(target) {
    target.find('.countdown').text('(' + currentTime + ')');
    t = setTimeout(function () {
        if (currentTime > 0) {
            currentTime -= 1;
            countDown(target);
        } else {
            target.find('.countdown').text('');
            target.removeClass('disabled');
        }
    }, 1000);
}

function showMsg(msgTarget, text, callback) {
    msgTarget.text(text)
    msgTarget.addClass('show')
    setTimeout(function() {
        msgTarget.text('')
        msgTarget.removeClass('show')
        if (callback) callback()
    }, 2500)
}

var ly = XLJ.getQueryString('ly');
var referrer = document.referrer;
var backUrl = XLJ.getQueryString('backUrl', referrer) || XLJ.getQueryString('backUrl') || ((ly) ? XLJ.rootPath + 'user/index.html?ly=' + ly : XLJ.rootPath + 'user/index.html');

var $username = $('#username'),
    $checkCode = $('#checkCode'),
    $password = $('#password'),
    $repassword = $('#repassword'),
    $usernameMsg = $username.parentsUntil('.item').last().parent().parent().find('.msg')

function userInput(callback) {
    var options = {};
    options.username = $username.val();
    options.password = $password.val();
    
//    if (!options.username) return XLJ.tip('请输入账号');
    if (!options.password) return XLJ.tip('请输入密码');

    if (callback) callback(options)
}


$username.on('keyup', function(e) {
    $username.attr('data-isExist', '')
})/*.on('blur', function(e) {
    var _this = $username
    _this.attr('data-isExist', 'checking')
    checkUser({ username: $username.val() || '' }, function(response) {
        if (!response.success) {
            showMsg($usernameMsg, response.msg)
            $username.attr('data-isExist', 'false')
            return
        } else {
            $username.attr('data-isExist', 'true')
        }
    })
})*/;


$('.getCaptcha').on('click', function(e) {
    e.preventDefault()
    var _this = $(this)
    if (_this.hasClass('disabled')) return
    _this.addClass('disabled')
    $usernameMsg.text('')

    var isExist = ''
        isExist = $username.attr('data-isExist') || ''
    if (isExist == 'false') {
        showMsg($usernameMsg, '用户已存在')
        _this.removeClass('disabled')
        return
    }

    var _mobile = $username.val()
    if (UTILS && (UTILS.isStringEmpty(_mobile) || !UTILS.validateMobile(_mobile))) {
        $usernameMsg.text($username.attr('data-invalid-tip'))
        $usernameMsg.addClass('show')
        setTimeout(function() {
//            $usernameMsg.text('')
            $usernameMsg.removeClass('show')
            _this.removeClass('disabled')
        }, 1000)
        return false
    }

    function get() {
        getRegCaptcha({ mobile: _mobile }, function(response) {
            if (!response.success) return _this.removeClass('disabled')
            clearTimeout(t)
            countDown(_this)
            return XLJ.tip(response.msg)
        });
    }

    var st = setInterval(function() {
        isExist = $username.attr('data-isExist') || ''
        if (isExist != 'checking') {
            clearInterval(st)
            
            if (isExist == 'false') {
                showMsg($usernameMsg, '用户已存在')
                _this.removeClass('disabled')
                return
            }
            if (isExist == 'true')  return get()
            checkUser({ username: _mobile }, function(response) {
                if (!response.success) {
                    showMsg($usernameMsg, response.msg)
                    $username.attr('data-isExist', 'false')
                    _this.removeClass('disabled')
                    return
                }
                get()
            })
            return
        }
    }, 300);

});

var regStep1 = $('#submit-reg-step1')
$('#checkCode').on('keydown', function(e) {
    regStep1.removeClass('unactive')
});
regStep1.on(XLJ.clickType, function(e) {
    e.preventDefault()
    var _this = $(this)
    if (_this.hasClass('unactive')) return
    
    var _mobile = $username.val()
    var _captcha = $checkCode.val()
    checkCaptcha({ mobile: _mobile, captcha: _captcha, smsType: 'SIGN_UP' }, function(response) {
        if (!response.success) return
        window.location.hash = _this.attr('data-next')
    })
});



// register
$('#register-form').on('submit', function(e) {
    e.preventDefault();

    userInput(function(options) {
        if (options.password != $repassword.val()) return XLJ.tip('两次密码不一致');

        options.captcha = $checkCode.val()
        register(options, function(response) {
            try {
                var WEBPStats = WEBP.Stats()
                WEBPStats.init('from_wechat');
                WEBPStats.upload(15, response.result.id);
            } catch(e) {
                console.log(e);
            }

            delete options.captcha
            login(options, function(response) {
                try {
                    var WEBPStats = WEBP.Stats()
                    WEBPStats.init('from_wechat');
                    WEBPStats.upload(16, response.result.id || 0);
                } catch(e) {
                    console.log(e);
                }
                window.location.href = backUrl;
            });
        });
    })
});

// login
$('#login').on('submit', function(e) {
    e.preventDefault();

    userInput(function(options) {
        login(options, function(response) {
            if (!response.success) return XLJ.tip(response.msg);

            try {
                var WEBPStats = WEBP.Stats()
                WEBPStats.init('from_wechat');
                WEBPStats.upload(16, response.result.id || 0);
            } catch(e) {
                console.log(e);
            }
            window.location.href = backUrl;
        });
    })
});
