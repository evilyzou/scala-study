
var XLJ = window.XLJ || {}
var UTILS = (XLJ.Utils) ? XLJ.Utils() : ''
var t

function register(data, callback) {
    XLJ.ajaxData('/User/registration', 'POST', JSON.stringify(data), callback, 'showTip')
}

function login(data, callback) {
    XLJ.ajaxData('/User/login', 'POST', JSON.stringify(data), callback, 'showTip')
}

function updatePasswd(data, callback) {
    var data = {
        mobile: data.username,
        password: data.password,
        captcha: data.captcha
    }
    XLJ.contentType = 'application/x-www-form-urlencoded'
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
    XLJ.ajaxData('/User/isExist', 'POST', JSON.stringify(data), callback)   // false -- is exist, true -- no exist
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

var backUrl = XLJ.getQueryString('backUrl') || XLJ.rootPath + 'user/index.html';
var $username = $('#username'),
    $checkCode = $('#checkCode'),
    $password = $('#password'),
    $repassword = $('#repassword'),
    $usernameMsg = $username.parentsUntil('.item').last().parent().parent().find('.msg')

function userInput(callback) {
    var options = {};
    options.username = $username.val();
    options.password = $password.val();
    
    //if (!options.username) return XLJ.tip('请输入账号');
    if (!options.password) return XLJ.tip('请输入密码');

    if (callback) callback(options)
}

function userInputGP(callback) {
    var options = {};
    options.username = $username.val();
    options.password = $password.val();
    if (options.password != $repassword.val()) return showMsg($usernameMsg, '两次密码不一致')
    if (!options.username) return XLJ.tip('请输入手机号');
    if (callback) callback(options)
}


$username.on('keyup', function(e) {
    $username.attr('data-isExist', '')
}).on('blur', function(e) {
    var _this = $username
    _this.attr('data-isExist', 'checking')
    checkUser({ userName: $username.val() || '' }, function(response) {
        if (!response.success) {
            //showMsg($usernameMsg, response.msg)
            $username.attr('data-isExist', 'false')
            return
        } else {
            $usernameMsg.html('用户名不存在，<a href="reg.html">点击免费注册</a>')
            $usernameMsg.addClass('show')
            $username.attr('data-isExist', 'true')
        }
    })
});


$('.getCaptcha').on('click', function(e) {
    e.preventDefault()
    var _this = $(this)
    if (_this.hasClass('disabled')) return
    _this.addClass('disabled')
    $usernameMsg.text('')

    var _mobile = $username.val()
    if (UTILS && (UTILS.isStringEmpty(_mobile) || !UTILS.validateMobile(_mobile))) {
        $usernameMsg.text($username.attr('data-invalid-tip'))
        $usernameMsg.addClass('show')
        setTimeout(function() {
            //$usernameMsg.text('')
            $usernameMsg.removeClass('show')
            _this.removeClass('disabled')
        }, 1000)
        return false
    }

    function get() {
        getFindPasswordCaptcha({ mobile: _mobile }, function(response) {
            if (!response.success) return _this.removeClass('disabled')
            clearTimeout(t)
            countDown(_this)
            return XLJ.tip(response.msg)
        });
    }

    var isExist = ''
    var st = setInterval(function() {
        isExist = $username.attr('data-isExist') || ''
        if (isExist != 'checking') {
            clearInterval(st)
            
            if (isExist == 'false') return get()/*showMsg($usernameReg, response.msg)*/
            if (isExist == 'true')  {
                $usernameMsg.html('用户名不存在，<a href="reg.html">点击免费注册</a>')
                $usernameMsg.addClass('show')
                return
            }
            checkUser({ userName: _mobile }, function(response) {
                if (!response.success) {
                    /*showMsg($usernameMsg, response.msg)*/
                    $username.attr('data-isExist', 'false')
                    get()
                    return
                } else {
                    $usernameMsg.html('用户名不存在，<a href="reg.html">点击免费注册</a>')
                    $usernameMsg.addClass('show')
                    $username.attr('data-isExist', 'true')
                }
            })
            return
        }
    }, 300);

});


var getPWStep1 = $('#submit-getPW-step1')
$('#checkCode').on('keydown', function(e) {
    getPWStep1.removeClass('unactive')
});
getPWStep1.on(XLJ.clickType, function(e) {
    e.preventDefault()
    var _this = $(this)
    if (_this.hasClass('unactive')) return
    
    var _mobile = $username.val()
    var captcha = $checkCode.val()
    checkCaptcha({ mobile: _mobile, captcha: captcha, smsType: 'FORGET_PASSWORD' }, function(response) {
        if (!response.success) return
        window.location.hash = _this.attr('data-next')
    })
});



// getPassword
$('#getPassword-form').on('submit', function(e) {
    e.preventDefault();

    userInputGP(function(options) {

        options.captcha = $checkCode.val()
        updatePasswd(options, function() {

            delete options.captcha
            login(options, function() {
                window.location.href = backUrl;
            });
        });
    })
});

