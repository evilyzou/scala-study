/* Create by zihan no 2015-12-31 */
/* v1.3.2 */
/*
 * EXP:

    var scrollData = new XLJ.ScrollData({
        url: '/List/product',
        container: $('.maincontent'),
        target: $('#product-list'),
        success: function(response) {
            // you callback function put here
        }
    });

 * EXP 2:

    var emptyTxt = 'Not coupons'
    var $mycouponUsed = $('.mycoupon-used')
    var scrollData_used = new XLJ.ScrollData({
        url:          '/My/coupons',
        data:         {useStatus: 'used'},
        container:    $mycouponUsed,
        target:       $mycouponUsed.find('.coupons'),
        requestModel: XLJ.ajaxData,
        emptyTxt:     emptyTxt,
        success: function(response, target) {
            // you callback function put here
        }
    });
 */
XLJ.ScrollData = window.XLJ.ScrollData || function(options) {
    this.options       = options                    || {}
    this.url           = this.options.url           || ''
    this.data          = this.options.data          || null
    this.total         = this.options.total         || ''
    this.totalPath     = this.options.totalPath     || ''
    this.page          = this.options.page          || 1
    this.pageSize      = this.options.pageSize      || 20
    this.pagePath      = this.options.pagePath      || 'page'
    this.pageSizePath  = this.options.pageSizePath  || 'pageSize'
    this.$container    = this.options.container     || ''
    this.$target       = this.options.target        || ''
    this.dataCheck     = this.options.dataCheck
    this.emptyTxt      = this.options.emptyTxt      || '还没有相关的内容'
    this.emptyHtml     = this.options.emptyHtml     || '<div class="nothingbox"><div class="main"><p>' + this.emptyTxt + '</p></div></div>'
    this.waitingHtml   = this.options.waitingHtml   || '<div class="loadmore mod-loading" style="visibility: hidden;"><div class="animate"></div></div>'
    this.requestModel  = this.options.requestModel  || ''
    this.success       = this.options.success       || function() {}
    this.initStatus    = this.options.initStatus

    this.debug = false

    // init start
    if (this.initStatus !== false) this.init()
}

XLJ.ScrollData.prototype = {

    vendor: function(data, $target, total) {
        var root = this

        if (root.dataCheck !== false && (!data || !data.success || total === 0)) {
            if (data.msgHtml) root.emptyHtml = data.msgHtml
            $target.html(root.emptyHtml)
            console.log('Not data or error')
            return
        }

        root.success(data, $target)
    },

    request: function(callback) {
        var root = this

        var $target = root.$target
        if (!$target || $target.length <= 0) return console.log('找不到数据容器')

        // scroll to bottom gono function
        var
            // _loading = $target.attr('data-loading') || 'false'
            _hasNext = $target.attr('data-hasNext') || 'true'
        // if (_loading == 'true' || _hasNext == 'false') return   // lock
        if (_hasNext == 'false') return   // lock
        // $target.attr('data-loading', 'true')

        var _pageNo = parseFloat($target.attr('data-pageNo') || root.page || 1)

        // load animation box
        var $loadmore = $target.next('.loadmore')
        if ($loadmore.length <= 0) {
            $loadmore = $(root.waitingHtml)
            $target.after($loadmore)
        } else {
            $loadmore.css('visibility', 'visible')
        }

        var data = {}
        data[root.pagePath] = _pageNo
        data[root.pageSizePath] = root.pageSize

        data = $.extend({}, root.data, data)

        var model = root.requestModel || $.get
        return model(root.url, data, function(response) {
            if (root.debug) console.log(response)

            // custome callback fn
            if (callback) return callback(response, $target, _pageNo)

            if (!response.success) {
                // $target.attr({'data-hasNext': 'false', 'data-loading': 'false'})
                $target.attr({'data-hasNext': 'false'})
            }

            root.page += 1
            var _total = root.total || response[root.totalPath]
            if (!_total && _total !== 0 && response.result) {
                _total = response.result[root.totalPath] || response.result.totalCount
            }
            if (!_total && _total !== 0) _total = ''

            if (_total === false) {
                _hasNext = false
            } else if (_total === true) {
                _hasNext = true
            } else {
                _hasNext  = (!_total || ((_pageNo * root.pageSize) >= _total)) ? 'false' : 'true'
            }
            $target.attr({
                'data-hasNext': _hasNext,
                // 'data-loading': 'false',
                'data-pageNo':  _pageNo + 1
            })
            $loadmore.css('visibility', 'hidden')

            root.vendor(response, $target, _total)
        })
    },

    scroll: function(callback) {
        var root = this

        var $mainBox     = root.$container
        var $mainContent = root.$target
        if (!$mainContent || $mainContent.length <= 0) return
        if ($mainContent.attr('data-hasNext') == 'false') return

        var mainH = 0, $body = $mainBox
        if (!$mainBox || $mainBox.length <= 0) {
            $mainBox  = $(document)
            $body     = $(document.body)
            mainH     = $body.height()
        } else {
            mainH     = $mainBox.height()
        }

        var $win = $(window)
        $win.on('resize', function () {
            mainH = $body.height()
        })

        var t
        $mainBox.on('scroll', function () {
            clearTimeout(t)
            var _this = this

            t = setTimeout(function() {
                // if ($mainContent.attr('data-loading') == 'true') return
                if ($mainContent.attr('data-hasNext') == 'false') return $mainBox.off('scroll'), $win.off('resize')

                var $this  = $(_this),
                    mainST = $this.scrollTop(),
                    conH   = $mainContent.height();

                if (root.debug) console.log('main scrolltop:' + mainST + ' + main height:' + mainH + '; ' + (mainST + mainH) + '------ content height:' + conH)
                if ((mainST + mainH) >= (conH - 100)) {
                    if (callback) callback()
                }
            }, 80);
        })
    },

    init: function() {
        var root = this
        var _r = ''

        if (!root.url) return console.log('%cNeed a real request URL !', 'color: #c00; font-weight: bold;')
        if (root.page == 1) r = root.request()

        root.scroll(function() {
            $.when(_r).always(function() {
                _r = root.request()
            })
        })
    }
}
