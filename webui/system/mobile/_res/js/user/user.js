var XLJ = window.XLJ || {}

if (XLJ.docReady) XLJ.docReady(function() {

    document.querySelector('.logout').classList.add('test')
    function logout() {
        XLJ.ajaxData('/User/logout', 'POST', '', function(response) {
            if (!response.success) return XLJ.tip(response.msg);
            window.location.href = XLJ.rootPath + XLJ.loginPath + '?auto=false';
        })
    }

    document.querySelector('.logout').addEventListener('click', logout, false)

    ;(function() {
        /* user information */
        var $userArea     = $('.user-show'),
            $userName     = $userArea.find('.name strong'),
            $userGrade    = $userArea.find('.grade'),
            $userIntegral = $userArea.find('.integral'),
            $userFace     = $userArea.find('.face .img')

        XLJ.ajaxData('/My/profile', '', function(response) {
            if (!response.success) return
            var data = response.result.user

            if (!data) return
            $userName.html(data.encryptNick || data.nick || '')
            $userGrade.html(data.levelName || '')
            if (data.integral > 0) $userIntegral.html('积分：' + data.integral)
            if (data.headIcon) {
                $userFace.css('background-image', 'url(' + data.headIcon + '@200w_90Q)')
            } else {
                $userFace.addClass('icon cssicon user')
            }
            if (response.result.isAgency){
                $("#bonus").show();
            }
        });
    })();
})
