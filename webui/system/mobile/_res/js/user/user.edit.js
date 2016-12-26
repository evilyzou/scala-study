
'use strict'

var XLJ = window.XLJ || {}
var Addimgbox = (XLJ.Addimgbox) ? new XLJ.Addimgbox() : ''

var USER_EDIT = (function(root, window) {

    // user info
    root.user = {}
    root.user.vendor = function(data, target, callback) {
        if (!data.result || !data.result.user) return XLJ.tip(data.msg)
        var _userData = data.result.user

        var html = template('user_info_template', _userData)
        target.html(html)
        
        if (callback) callback(_userData)
    }

    root.user.get = function(callback) {
        XLJ.ajaxData('/My/profile', '', function(response) {
            if (callback) callback(response)
        })
    }

    // photo
    root.photo = {}
    root.photo.action = function(target, elName, callback) {

        target.on(XLJ.clickType, elName, function(e) {
            e.stopPropagation()

            var _this = $(this).find('.upImg'),
                _parent = _this.parent()

            function uploaded(result, blob) {
                _parent.attr('class', '')
                _parent.addClass('haveimg')
                _parent.css('background-image', 'url(' + blob + ')')
                Addimgbox.add(_this, function(response) {
                    if (!response.result || !response.result.pictureUrl) return XLJ.tip(response.msg)
                    var data = {
                        headPicUrl: response.result.pictureUrl
                    }
                    root.submit(JSON.stringify(data), function() {
                        if (callback) callback(blob)
                    })
                })
            }
            if (typeof Addimgbox === 'object') Addimgbox.LocalResizeIMG(_this, uploaded)
        })

    }

    // nickname
    root.nickname = {}
    root.nickname.action = function(target, elName, callback) {
        var elName = elName || '[name="nickname"]',
            _nickInput = target.find(elName),
            isSaved = false

        target.on('submit', function(e) {
            e.preventDefault()

            var _nickName = _nickInput.val()
            if (_nickName == target.attr('data-val')) return

            var data = {
                nickname: _nickName
            }
            root.submit(JSON.stringify(data), function() {
                target.attr('data-val', _nickName)
                if (callback) callback(_nickName)
            })
        })

        _nickInput.on('blur', function() {
            target.submit()
        })

    }

    root.submit = function(options, callback) {
        if (!options) return
        XLJ.ajaxData('/My/profile', 'POST', options || '', function(response) {
            if (callback) callback(response)
        }, 'showTip')
    }


    return root

}(USER_EDIT || {}, typeof window !== 'undefined' ? window : this));

// init
USER_EDIT.user.get(function(data) {
    $(function() {

        var $userInfo = $('#user_info')
        USER_EDIT.user.vendor(data, $userInfo, function(data) {

            var _userData = data

            if (_userData.headIcon) {
                $('.addface .addbtn')
                    .css('background-image', 'url(' + _userData.headIcon + ')')
                    .removeClass('icon cssicon user')
            }

            if (_userData.nick) {
                $('[name="nickname"]').attr({
                    'value': _userData.nick,
                    'data-val': _userData.nick
                });
            }
        });

    });
});

$(function() {
    var $userInfo = $('#user_info'),
        $addimgBox = $('#faceupload'),
        $formBox = $('.form-box')

    function updateFace(data) {
        //$userInfo.find('.member-face img').attr('src', data)
        $userInfo.find('.member-face .img').attr('background-image', 'url(' + data + ')')
    }

    function updateNick(data) {
        $userInfo.find('.member-nick').text(data)
    }

    USER_EDIT.photo.action($addimgBox, '.addbtn', updateFace)
    USER_EDIT.nickname.action($formBox, '[name="nickname"]', updateNick)
});
