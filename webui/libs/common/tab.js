/*!
 *  Create Date: 2015-12-21
 *  Author: zihan
 */

/* hash Tab
 *
 * DOM:
    <div class="tab-nav">
        <ul class="ui">
            <li class="selected"><a href="#t-tab1">Tab 1</a></li>
            <li><a href="#t-tab2">Tab 2</a></li>
            <li><a href="#t-tab3" data-page-url='./page3.html'>Tab 3</a></li>
        </ul>
    </div>
    <div class="tabcontents">
        <div class="tab_content" data-hash-name="#t-tab1" style="display: block;"><!-- tab 1 content put here--></div>
        <div class="tab_content" data-hash-name="#t-tab2" style="display: none;"><!-- tab 2 content put here--></div>
        <div class="tab_content" data-hash-name="#t-tab3" style="display: none;"><!-- page3.html will load in here--></div>
    </div>
 */
XLJ.hashTab = window.XLJ.hashTab || (function(window) {
    function getPage(url, callback) {
        $.ajax({
            url: url,
            dataType: 'html',
            success: function(html) {
                var html = (XLJ.htmlFilter) ? XLJ.htmlFilter(html) : html
                if (callback) callback(html)
            }
        })
    }

    function tabcore(el, target, e) {
        var _this = el, _target = target
        if (_target.indexOf('#') != 0 || _target.length < 1) return

        var $target = $('[data-hash-name="' + _target + '"]')
        if (!$target || $target.length <= 0) return
        if (e) {
            e.preventDefault()

            //window.location.hash = _target
            var url = window.location.href
            url = url.replace(window.location.hash, '')
            url += _target
            window.history.pushState('', '', url)
        }

        var _pageURL = _this.attr('data-page-url') || '',
            _pageLoaded = _this.attr('data-page-loaded') || ''

        if (_pageURL && !_pageLoaded) {
            getPage(_pageURL, function(html) {
                _this.attr('data-page-loaded', 'true')
                $target.html(html)
            })
        }

        _this.parent().addClass('selected').siblings().removeClass('selected')
        $target.show().siblings('.tab_content').hide()
    }

    function tabnav() {
        var hash = window.location.hash
        if (!hash) return
        //$('a[href="' + hash + '"]').trigger('click')

        var _this = $('a[href="' + hash + '"]');
        //var _target = _this.attr('href');
        if (_this.length <=0) return;

        //if (_this.parent().hasClass('selected')) return false;
        tabcore(_this, hash)
    }

    tabnav() // page load run once
    if (window.addEventListener) {
        window.addEventListener('hashchange', tabnav, false);
    } else if (window.attachEvent) {
        window.attachEvent('onhashchange', tabnav, false);
    }

    $(document.body).on('click', '.tab-nav a', function(e) {
        var _this = $(this);
        var _target = _this.attr('href');

        if (_target.indexOf('#') == 0) e.preventDefault();
        if (_this.parent().hasClass('selected')) return false;
        tabcore(_this, _target, e)
    });

}(typeof window !== 'undefined' ? window : this));
