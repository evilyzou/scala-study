/*!
 *  Create Date: 2016-02-13
 *  Author: zihan
 *  verstion: 1.1.1
 */


'use static'

var XLJ = window.XLJ = window.XLJ || {}

XLJ.ajaxPage = function(options) {

    var defaults = {
        url:                '',
        data:               '',

        container:         '',
        target:            '',

        link:               '.ajaxload',
        containerClass:     'ajaxpage-page',
        pageClass:          '',
        pageBoxClass:       'container-main',
        currentPageClass:   'ajaxpage-current',
        disabledPageClass:  'ajaxpage-disabled',

        replaceReg:         '',
        replaceCon:         '',
        replaceObj:         '',
        loadingTpl:         '<div class="mod-loading"><p class="animation"></p></div>',

        success:            '',
        fail:               '',

        delay:              0,
        clearPage:          true,

        initStatus:         '',
        debug:              false
    }

    this.config = $.extend(defaults, options)

    // init start
    if (this.config.initStatus !== false) this.init()

}


XLJ.ajaxPage.prototype = {

    helper: {

        htmlFilter: function(html) {
            var needcut = html.indexOf('<body');
            if (needcut != -1) {
                var bodyBegin = html.indexOf('>', needcut) + 1,
                    bodyEnd = html.indexOf('</body', needcut);
                return html.substring(bodyBegin, bodyEnd);
            } else {
                return html;
            }
        },

        urlObj: function(url) {
            var a = document.createElement('a')
            a.href = url
            a.relative = (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1]
            return a
        }

    },

    checkPage: function(url) {
        var root = this
        var targetPage = ''

        $('.' + root.config.containerClass).each(function() {
            var _this = $(this),
                _pUrl = _this.attr('data-page-path')

            if (url == _pUrl) return targetPage = _this
        });

        return targetPage
    },

    clearPage: function(targetParent) {
        targetParent.prev().prevAll().remove()
        targetParent.nextAll().remove()
    },

    setCurrentUrl: function(target) {
        if (!target || !target.length > 0) return
        if (target.attr('data-page-path')) return

        var _pathname = window.location.pathname,
            _search = window.location.search

        target.attr('data-page-path', _pathname)
    },

    setCurrentClass: function(target) {
        var root = this

        if (!target || !target.length > 0) return

        $('.' + root.config.currentPageClass).removeClass(root.config.currentPageClass)

        target
            .addClass(root.config.currentPageClass)
            .removeClass(root.config.disabledPageClass)
            //.css('pointer-events', 'auto')
            .siblings()
            .addClass(root.config.disabledPageClass)
            //.css('pointer-events', 'none')
    },

    replaceContent: function(html) {
        var root = this

        if (typeof root.config.replaceReg === 'object' && root.config.replaceReg.length > 0) {

            for (var i = 0; i < root.config.replaceReg.length; i++) {
                var r = root.config.replaceReg[i],
                    c = root.config.replaceCon[i] || ''

                html = html.replace(r, c)
            }

        } else if (root.config.replaceReg) {
            html = html.replace(root.config.replaceReg, root.config.replaceCon)
        }

        return html
    },

    createContentBox: function(url, currentDom) {

        var root = this
        var target = ''
        var $target = $(root.config.target)

        if ($target.length > 0) {
            $target
                .html(root.config.loadingTpl)
                .attr('data-page-path', url)

            target = $target

        } else {
            target = $('<div class="' +
                          (root.config.pageBoxClass || '') + ' ' +
                          (root.config.containerClass || '') + '" data-page-path="' +
                          url + '">' +
                          root.config.loadingTpl +
                          '</div>')

            if (currentDom && currentDom.length > 0) {
                currentDom.after(target)
            } else {
                window.location.reload()
            }
        }


        root.setCurrentClass(target)
        return target
    },

    request: function(url, callback) {
        var root = this

        return $.ajax({
            url:      url || root.config.url,
            data:     root.config.data,
            dataType: 'html',
            success: function(response, xhr) {
                if (callback) callback(response)
            },
            error: function(err, xhr) {
                if (root.config.fail) root.config.fail(err, xhr)
            }
        })
    },

    pickPage: function() {

        var _pathname = window.location.pathname,
            _search = window.location.search,
            $page = $('[data-page-path="' + _pathname + '"]')

        if (!$page.length > 0) {
            window.location.reload()
        } else {
            return $page
        }

    },

    loadpage: function(url, parent) {
        if (!url || url.indexOf('#') == 0) return

        var root = this

        var uObj = root.helper.urlObj(url) || {},
            urlPath = uObj.pathname,
            urlRelative = uObj.relative

        // check target page is exists before load
        var targetPage = root.checkPage(urlRelative)
        if (targetPage && targetPage.length > 0) return root.setCurrentClass(targetPage)

        // create and append
        var target = root.createContentBox(urlRelative, parent)
        if (!target.length > 0) return console.log('not target dom')

        // clear other page to release memory
        if (root.config.clearPage) {
            setTimeout(function() {
                root.clearPage(target)
            }, root.config.delay + 20)
        }

        // request the page from target url
        var html = ''
        var request = root.request(urlRelative, function(response) {

            html = root.helper.htmlFilter(response) || response

            // replace content, ex. path and so on
            html = root.replaceContent(html)

            // replace select target dom
            if (root.config.replaceObj && root.config.replaceObj.length > 0) {
                var $html = $('<div>' + html + '</div>')
                for (var i = 0; i < root.config.replaceObj.length; i++) {
                    var d = root.config.replaceObj[i]
                    $html.find(d).remove()
                }

                html = $html.html()
            }

            // put the content into current document container
            //target.html(html)

            // callback
            if (root.config.success) root.config.success(html, response)

        });

        setTimeout(function() {
            html = $($.parseHTML(html, document, true));

            $.when(request).done(function() {
                target.html(html)
            })

        }, root.config.delay + 80)

    },

    popstate: function(callback) {

        function changeLoad(e) {
            console.log('change load')
            if (!window.location.hash) return
            var e = e || window.event
            if (callback) callback(e)
        }

        if (window.addEventListener) {
            window.addEventListener('popstate', changeLoad)
        } else if (window.attachEvent) {
            window.attachEvent('onpopstate', changeLoad)
        }

    },

    action: function(callback) {
        var root = this

        $(document.body).on(XLJ.clickType || 'click', root.config.link, function(e) {
            e.preventDefault()
            e.stopPropagation()

            var _this = $(this),
                _url = _this.attr('data-url') || _this.attr('href'),
                _parent = ''

            if (root.config.containerClass) {
                _parent = _this.closest('.' + root.config.containerClass)
            }
            if (callback) callback(_url, _parent)
        });

        $(document.body).on('click', root.config.link, function(e) {
            e.preventDefault()
            e.stopPropagation()
        });

    },

    // initialzation
    init: function() {
        var root = this

        root.popstate(function(e) {
            if (!root.config.target || !$(root.config.target).length > 0) {
                root.setCurrentClass(root.pickPage())
            } else {

                // set the current url to container dom data
                //root.setCurrentUrl(parent)

                var url = window.location.href
                root.loadpage(url)
            }
        });

        // trigger action
        root.action(function(url, target) {
            var uObj = root.helper.urlObj(url) || {}

            // set the current url to container dom data
            root.setCurrentUrl(target)

            // push history
            window.history.pushState('', '', uObj.href)

            root.loadpage(url, target)
        });
    }

}
