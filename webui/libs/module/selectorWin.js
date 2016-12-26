/*!
 *  Create Date: 2016-06-14
 *  Author: zihan
 *  verstion: 1.4.6
 */
/*
 * ex.:
;(function() {
    if (typeof XLJ.selectorWin == 'function') {
        // this function to get the oparetion item data
        function popcontentLoadedCB($items, currentItemChange) {
            console.log('selectorWin data list loaded')
            currentItemChange(function(item) {
                console.log(item)
            })
        }
        var ProductSelector = new XLJ.selectorWin({
            dataURL:   XLJ.rootPath + 'Product/list',
            tplURL:    XLJ.rootPath + '_res/tpl/tpl_popcontent-product-selector.tpl',
            optElname: '.selectProduct',   // class name of button for open this selector win
            checkType: 'radio',
            boxId:     'product-selector'
        })
        ProductSelector.init(popcontentLoadedCB)
    }
}());
 */

'use static'

var XLJ = window.XLJ = window.XLJ || {}

XLJ.selectorWin = function(options) {

    var defaults = {
        dataURL:            XLJ.rootPath + 'Product/list',
        dataOption:         '',
        tplURL:             XLJ.rootPath + '_res/tpl/tpl_popcontent-product-selector.tpl',
        optElname:          '.selectProduct',
        openObj:            '',
        listTplElname:      '[data-tpl-name="datalistTpl"]',
        checkType:          'checkbox',                     // checkbox || radio
        boxId:              '',                             // the popcontent id
        tabbarItem:         '.tab_bar a',                   // the popcontent id
        dataMethod:         $.get,
        pageSize:           50,
        totalPath:          'totalCount',
        groupName:          'checkgroup',
        getDataComplate:    function() {},

        initStatus:         '',
        debug:              true
    }

    this.config = $.extend(defaults, options)

    // init start
    // if (this.config.initStatus !== false) this.init()

}


XLJ.selectorWin.prototype = {

    getData: function(url, data, method, callback) {
        var method = method || this.config.dataMethod
        return (url) ? method(url, data, callback || '') : ''
    },

    searchTool: function(target) {

    },

    createDatalist: function(options, method, callback) {
        var root = this

        var options  = options || {},
            url      = options.url,
            $target  = options.$target,
            $tpl     = options.$tpl,
            page     = options.page     || root.config.page     || '',
            pageSize = options.pageSize || root.config.pageSize || '',
            data     = options.data     || ''

        var $datalist   = $target,
            _dataLoad   = $datalist.attr('data-load')    || '',
            _builded    = $datalist.attr('data-builded') || ''

        if (!options.create) {
            if (_builded || _dataLoad == 'loading' || _dataLoad == 'loaded') return
            options.create = false
        }

        // ban runing
        $datalist.attr('data-load', 'loading')

        function emptyContainer($target, html) {
            $datalist.attr({
                'data-load':    '',
                'data-builded': ''
            });
            $target.html(html || '<div class="nothingbox">暂无数据</div>')
        }

        var _urlParams = 'page=' + page + '&pageSize=' + pageSize,
            _url = (url.indexOf('?') == -1) ? (url + '?' + _urlParams) : (url + '&' + _urlParams)

        var _getData = root.getData(_url, data, method || '', function(response) {
            if (root.debug) console.log(response)
            root.config.getDataComplate(response)

            // if get data error
            if (!response.success) {
                var _msg = response.msg
                if (response.apiCode == 8002 && XLJ.loginPath) {
                    _msg += ', 请<a href="' + XLJ.rootPath + XLJ.loginPath + '">登录</a>'
                } else {
                    emptyContainer($datalist)
                }
                return XLJ.tip(_msg, 'warning', '', 'keep')
            }

            // if no data
            if (!response.result || response.result[root.config.totalPath] == 0 || (response.result.data && response.result.data[root.config.totalPath] == 0)) {
                emptyContainer($datalist)
                return
            }

            var tplRender = template.compile($tpl.html()),
                _tplData  = response.result || {}

            _tplData.checkType = root.config.checkType
            if (root.config.checkType != 'checkbox') $datalist.parent().find('[data-checkbox-type="all"]').remove()

            var html = tplRender(_tplData)

            $datalist.html(html).attr('data-builded', 'true')
            var $items = $datalist.find('[name="selectitem"]')

            function currentSelect(cb) {
                if (!$items || !$items.length > 0) return

                // check item
                if (typeof XLJ.checkAll == 'function') {
                    function checkItemFn(fn) {
                        fn(function(item) {
                            console.log(item)
                            var _data = [];
                            item.each(function() {
                                var _this     = $(this),
                                    _id       = _this.attr('data-id'),
                                    _checked  = _this.prop('checked'),
                                    _itemData = _this.attr('data-json'),
                                    _jsonData = JSON.parse(_itemData)

                                _jsonData.checked = _checked
                                _jsonData.target  = _this
                                _data.push(_jsonData)
                            })
                            if (cb) cb(_data)
                        })
                    }
                    var CheckAll = new XLJ.checkAll({groupName: root.config.groupName})
                    CheckAll.init(checkItemFn)
                } else {
                    // navtive fn, not plug-in
                    $items.off('change').on('change', function() {
                        var _data     = [];
                        var _this     = $(this),
                            _id       = _this.attr('data-id'),
                            _checked  = _this.prop('checked'),
                            _itemData = _this.attr('data-json'),
                            _jsonData = JSON.parse(_itemData)

                        _jsonData.checked = _checked
                        _jsonData.target  = _this
                        _data.push(_jsonData)
                        if (cb) cb(_data)
                    })
                }
            }

            if ($.fn.pagination) {

                var _totalCount = response.result[root.config.totalPath]
                if (!_totalCount && _totalCount != 0 && response.result.data) _totalCount = response.result.data[root.config.totalPath]
                var option = {
                    total: _totalCount,        // data row total
                    pageSize: root.config.pageSize,       // rows in a page (default 20, Optional)
                    //currentPageNo: 20  // the current page No. (Optional)
                    //pageNum: 8         // pages on show (default 8, Optional)
                }
                $datalist.closest('.container').find('.pagenav').pagination(option, function(targetNo, option) {
                    // targetNo is the new page no
                    // option.pageSize is the rows in a page
                    delete option.total

                    options.create = true
                    var opt = $.extend({}, options, option)
                    root.createDatalist(opt)
                })
            }

            if (callback) callback($items, currentSelect)
        })

        $.when(_getData)
            .always(function() {
                $datalist.attr('data-load', '')
            })
            .fail(function(res) {
                emptyContainer($datalist)
            })
    },

    popcontentOperation: function(elname, $source, callback) {
        if (!elname) return

        var root = this
        var $dbody = $(document.body),
            $tpl   = $source.find(root.config.listTplElname),
            t

        $dbody
            .off(XLJ.clickType, elname)
            .on(XLJ.clickType, elname, function(e) {
                e.preventDefault()

                var _this = $(this),
                    _target = _this.attr('data-target'),
                    $target = (_target) ? $(_this.attr('data-target')) : $source

                if (!$target || !$target.length > 0) return

                $target.addClass('show')
                $dbody.addClass('noscroll')

                clearTimeout(t)
                t = setTimeout(function() {
                    root.createDatalist({
                        url:     root.config.dataURL,
                        $target: $source.find('.datalist').eq(0),
                        $tpl:    $tpl,
                        data:    root.config.dataOption
                    }, '', callback)
                }, 500)
                //if (callback) callback()
            })

        $source
            .off(XLJ.clickType, root.config.tabbarItem)
            .on(XLJ.clickType, root.config.tabbarItem, function(e) {
                var _this       = $(this),
                    _dataUrl    = _this.attr('data-dataUrl'),
                    _dataOption = _this.attr('data-dataOption') || {},
                    _dataTpl    = _this.attr('data-dataTpl'),
                    _target     = _this.attr('href')

                var $dataTpl = $('[data-tpl-name="' + _dataTpl + '"]')
                if (!$dataTpl || $dataTpl.length ==0) $dataTpl = $tpl

                root.createDatalist({
                    url:     XLJ.rootPath + _dataUrl,
                    $target: $source.find(_target).find('.datalist'),
                    $tpl:    $dataTpl,
                    data:    _dataOption
                }, '', callback)
            })

            // popcontent close
            .off(XLJ.clickType, '.close')
            .on(XLJ.clickType, '.close', function() {
                $dbody.removeClass('noscroll');
                $(this).closest('.popcontent').removeClass('show');
            })

            // popcontent close
            .off('submit', '.searchbox')
            .on('submit', '.searchbox', function() {
                var _this       = $(this),
                    _parent     = _this.closest('.container'),
                    _dataUrl    = _this.attr('data-dataUrl'),
                    _dataOption = {kw: _this.find('[name="name"]').val() || ''},
                    _dataTpl    = _this.attr('data-dataTpl')

                var $dataTpl = $(_dataTpl)
                if (!$dataTpl || $dataTpl.length ==0) $dataTpl = $tpl

                root.createDatalist({
                    url:     XLJ.rootPath + _dataUrl,
                    $target: _parent.find('.datalist'),
                    $tpl:    $dataTpl,
                    data:    _dataOption,
                    create:  true
                }, $.get, callback)
            })
    },

    render: function(source, callback, winloadfn) {
        var root = this
        // var tplRender = template.compile(source),
        //     html      = tplRender(data)

        if (!source) return
        var $source = $(source)
        $source.attr('id', root.config.boxId)
        $(document.body).append($source)

        if (winloadfn) winloadfn()
        // bind pop window operation
        root.popcontentOperation(root.config.optElname, $source, callback)
    },

    // initialzation
    init: function(callback, winloadfn) {
        if (typeof template != 'function') return console.log('%cPlease include artTemplate lib!', 'color:#c00')

        var root = this

        var
            selector = '',
            getSelector = $.get(root.config.tplURL, function(response) {
                if (root.debug) console.log(response)
                selector = response
            })

        $.when(getSelector).always(function() {
            if (!selector) return
            root.render(selector, callback, winloadfn)
        })

    }
}
