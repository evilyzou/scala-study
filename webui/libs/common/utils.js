
XLJ.Utils = window.XLJ.Utils || function() {
    var validationUtils = {
        validateEmail : function(_s) {
            var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            return emailRegex.test(_s);
        },
        validateMobile : function(_s) {
            var hkMobileRegex = /(^5|^6|^8|^9)[0-9]{7}$/;
            //var mainlandMobileRegex = /^1(3[0-9]|5[0-35-9]|8[0236-9]|14[57])[0-9]{8}$/;
            //弱化手机号码匹配,保证11位号码即可
            var mainlandMobileRegex = /^1[0-9]{10}$/;
            return mainlandMobileRegex.test(_s) || hkMobileRegex.test(_s);
        },
        validatePostCode : function(_s){
            /*var postCode= /^[1-9][0-9]{5}$/;
            return postCode.test(_s);*/
            return true;
        },
        validateInteger : function(_s) {
            return typeof _s === 'number' && _s%1 === 0
        },
        isNumbers : function(str){
            return /^[0-9]*$/.test(str);
        },
        isShortNumber: function(str){
            return /^[0-9]{4,6}-[0-9]+$/.test(str);
        }
    };

    var stringUtils = {
        isStringEmpty : function(_s) {
            if(typeof _s === 'undefined' || _s == null || _s == '') {
                return true;
            } else {
                return false;
            }
        }
    };

    var numberUtils = {
        getNumber: function(num) {
            if(num === undefined || num === '') {
                return 0;
            }
            num = Number(num);
            if(isNaN(num)) {
                return 0;
            }
            return num;
        }
    };

    return {
        validateEmail:    validationUtils.validateEmail,
        validateMobile:   validationUtils.validateMobile,
        isStringEmpty:    stringUtils.isStringEmpty,
        validateInteger:  validationUtils.validateInteger,
        validatePostCode: validationUtils.validatePostCode,
        getNumber:        numberUtils.getNumber,
        isNumbers:        validationUtils.isNumbers,
        isShortNumber:    validationUtils.isShortNumber
    };
}
