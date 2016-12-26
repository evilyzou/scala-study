
var XLJ = window.XLJ || {};
var WEBP = window.WEBP || {}


function register(data, callback) {
    XLJ.ajaxData('/User/registration', 'POST', JSON.stringify(data), callback, 'shopTip')
}

function login(data, callback) {
    XLJ.ajaxData('/User/login', 'POST', JSON.stringify(data), callback, 'shopTip')
}

function updatePasswd(data, callback) {
    XLJ.ajaxData('/User/updatePassword', 'POST', data, callback, 'shopTip')
}

function getRegCaptcha(data, callback) {
    //data.smsType = 'SIGN_UP'
    XLJ.ajaxData('/Captcha/forRegister', 'GET', data, callback, 'shopTip')
}

function getLoginCaptcha(data, callback) {
    //data.smsType = 'SIGN_IN_WITH_CAPTCHA'
    XLJ.ajaxData('/Captcha/forCaptchaLogin', 'GET', data, callback, 'shopTip')
}

function getFindPasswordCaptcha(data, callback) {
    //data.smsType = 'FORGET_PASSWORD'
    XLJ.ajaxData('/Captcha/forFindPassword', 'GET', data, callback, 'shopTip')
}

function checkCaptcha(data, callback) {
    XLJ.ajaxData('/Captcha/check', 'GET', data, callback, 'shopTip')
}

function checkUser(data, callback) {
    XLJ.ajaxData('/User/isExist', 'POST', JSON.stringify(data), callback, 'shopTip')   // false -- is exist, true -- no exist
}

var backUrl = XLJ.getQueryString('backUrl') || XLJ.rootPath + 'user/index.html';
var $username = $('#username'),
    $password = $('#password'),
    $repassword = $('#repassword')

function userInput(callback) {
    var options = {};
    options.username = $username.val();
    options.password = $password.val();
    
    if (!options.username) return XLJ.tip('请输入账号');
    if (!options.password) return XLJ.tip('请输入密码');

    if (callback) callback(options)
}


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
