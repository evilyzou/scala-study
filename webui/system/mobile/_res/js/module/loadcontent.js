/*
 * Load content
 */
(function() {

    function createDom() {
        var _tpl = ''
                 + '<div class="singleContent" id="helpContent" style="display: none;translate3d(0, 0, 0);">'
                 + '  <div class="header">'
                 + '    <div class="icon close"></div>'
                 + '    <h1 class="title"></h1>'
                 + '  </div>'
                 + '  <div class="main"></div>'
                 + '</div>'
         $(document.body).append(_tpl)
    }

    function loadContentFn(_contentURL) {
        var $helpContent = $('#helpContent'),
            $helpContentMain = $helpContent.find('> .main')
        $helpContentMain.addClass('loading')

        // var _getContent = COMFIRM_TICK.getContent(_contentType, function(response) {
        //     console.log(response);
        //     $helpContent.find('> .header .title').html(response.result.detail.description)
        //     $helpContentMain.removeClass('loading')
        //     $helpContentMain.html(response.result.detail.content)
        // })

        var _getContent = $.ajax({
            url: _contentURL,
            success: function(response) {
                console.log(response);
                var _content = '<div>' + response + '</div>',
                    $content = $(_content),
                    _contentTitle = $content.find('.helpcontent-title').text() || '',
                    _contentMain = $content.find('.helpcontent-main').html()   || ''

                if (!_contentMain) _contentMain = response

                $helpContent.find('> .header .title').text(_contentTitle)
                $helpContentMain.html(_contentMain)
                $helpContentMain.removeClass('loading')
            }
        })

        $.when(_getContent)
            .done(function(response) {
                if (!response.success) $helpContentMain.removeClass('loading')
            })
            .fail(function() {
                $helpContentMain.removeClass('loading')
            })
    }

    if ($('#helpContent').length == 0) {
        createDom()
    }

    $(document.body).on(XLJ.clickType, '.popContent[data-content-url]', function() {
        var _this = $(this),
            _contentURL = _this.attr('data-content-url')

        if (!_contentURL) return;
        loadContentFn(_contentURL)
    })

})();
