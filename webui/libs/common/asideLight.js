/*!
 *  Create Date: 2016-02-13
 *  Author: zihan
 *  Version: 1.0.1
 */


/* Aside light
 */
var ASIDE = (function(root, window) {

    function urlObj(url) {
        var a = document.createElement('a')
        a.href = url
        a.relative = (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1]
        return a
    }

    function ajaxHTML(option, callback) {
        var option  = option || {},
            _target = option.target || '',
            _url    = option.url || '';

        var $target = $(_target);

        $.ajax({
            url:      _url,
            dataType: 'html',
            beforeSend: function() {
                if (typeof helper != 'undefined' && helper.loadingBox) helper.loadingBox('', '', _target);
            },
            complete: function() {
                if (typeof helper != 'undefined' && helper.loadingBox) helper.loadingBox('remove', '', _target);
            },
            success: function(html) {
                $target.html(html);
                if (callback) callback($target, html);
            }
        });
    }

    function selectedItem(target) {
        var _href     = window.location.href,
            _pathName = window.location.pathname,
            _search   = window.location.search,
            _hash     = window.location.hash,
            _origin   = window.location.origin,
            _reg      = /\/(.*).html/

        var _urlPath = _pathName + _search + _hash
        var _lastPos = _pathName.lastIndexOf('/')

        // cut last '/'
        if (_lastPos != 0 && (_lastPos == _pathName.length - 1)) _pathName.substring(0, _pathName.length - 1)

        //var _pageName = _pathName.substring(_lastPos + 1)

        var $link = target.find('[href="' + _href + '"]')

        if ($link.length == 0) {
            $link = target.find('[href="' + _urlPath + '"]')
        }

        if ($link.length == 0) {
            $link = target.find('[href="' + _urlPath.substring(1) + '"]')
        }

        if ($link.length == 0) {
            $link = target.find('[href="' + _pathName + '"]')
        }

        if ($link.length == 0) {
            target.find('a').each(function() {
                var _this = $(this),
                    _url = _this.attr('href')

                if (!_url || _url == '#') return
                // cut last '/'

                var _urlObj = urlObj(_url)
                if (_urlObj.href == _href) {
                    $link = _this
                    return false
                }

                var _uPname = _urlObj.pathname,
                    _uPnameLpos = _urlObj.pathname.lastIndexOf('/')
                if (_uPnameLpos != 0 && (_uPnameLpos == _uPname.length - 1)) {
                    _uPname = _uPname.substring(0, _uPname.length - 1)
                }

                if (_uPname == _pathName) {
                    $link = _this
                    return false
                }
            });
        }
        if (!$link.length > 0) return

        target.find('.current').removeClass('current')
        target.find('.selected').removeClass('selected')
        $link.addClass('current')
        $link.closest('li.main').find('> :first-child').addClass('selected');
    }

    function toggleMenuSub(target) {
        var _this = target
        if (_this.hasClass('expanded')) {
            _this.removeClass('expanded')
            _this.next().slideUp()
        } else {
            _this.addClass('expanded')
            _this.next().slideDown()
        }
    }


    root.selectedItem = selectedItem

    root.init = function(callback) {

        var $aside = $('#aside')

        $aside.on('click', 'a', function(e) {
            var _this = $(this),
                _parent = _this.parent(),
                _next   = _this.next(),
                _href   = _this.attr('href')

            // not link
            if (!_href || _href.indexOf('#') == 0) {
                e.preventDefault()
            }

            // if can drop
            if (_next.hasClass('dropdown')) toggleMenuSub(_next)

            if (!_parent.hasClass('main')) {
                $aside.find('.selected').removeClass('selected')
                $aside.find('.current').removeClass('current')
                _this.addClass('current')
                _this.closest('li.main').find('> :first-child').addClass('selected');
            }
        });

        $aside.on('click', '.dropdown', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var _this = $(this)
            toggleMenuSub(_this)
        });

        /*ajaxHTML({
            target: $aside,
            url:    '/_menu.html?ver=1.1.1'
        }, function(target) {
            selectedItem($aside)
            if (callback) callback();
        });*/

            selectedItem($aside)
            if (callback) callback();

    }

    return root

}(ASIDE || {}, typeof window !== undefined ? window : this));
