/*!
 *  Create Date: 2016-02-13
 *  Author: zihan
 *  verstion: 1.0.0
 */

XLJ.checkAll = window.XLJ.checkAll || function(options) {

    var defaults = {
        groupName:         'checkgroup',
        checkFn:            function() {},

        initStatus:         '',
        debug:              false
    }

    this.config = $.extend(defaults, options)
    this.config.checkGroupAllName = '[data-checkbox-group="' + this.config.groupName + '"]'
    this.config.checkAllName = '[data-checkbox-group="' + this.config.groupName + '"][data-checkbox-type="all"]'
    this.config.checkGroupName = '[data-checkbox-group="' + this.config.groupName + '"][data-checkbox-type="item"]'

    // init start
    if (this.config.initStatus !== false) this.init()

}


XLJ.checkAll.prototype = {

    checkAction: function(target, callback) {
        var root = this

        var
            _checkAll  = true,
            _checkType = target.attr('data-checkbox-type'),
            _checked   = target.prop('checked'),

            $checkGroup    = $(root.config.checkGroupName),
            $checkGroupAll = $(root.config.checkGroupAllName)

        // all items
        if (_checkType == 'all') {
            var _havetoChangeState = (_checked) ? ':not(:checked)' : ':checked',
                $havetoChangeItems = $(root.config.checkGroupName + _havetoChangeState)
            $checkGroupAll.prop('checked', _checked)
            if (callback) callback($havetoChangeItems)
            return
        }

        // single item
        var $checkAll = $(root.config.checkAllName)
        if (!_checked) {
            _checkAll  = false
        } else {
            $checkGroup.each(function() {
                if (!$(this).prop('checked')) {
                    _checkAll = false
                    return false
                }
            })
        }
        if (callback) callback(target)
        $checkAll.prop('checked', _checkAll)
    },

    action: function(callback) {
        var root = this
        var $docbody = $(document.body),
            _elname  = '[data-checkbox-group="' + root.config.groupName + '"]'

        function changeFn(cb) {
            $docbody.off('change', _elname).on('change', _elname, function() {
                root.checkAction($(this), cb)
            })
        }
        if (callback) callback(changeFn)
    },

    // initialzation
    init: function(callback) {
        var root = this
        root.action(callback)
    }

}
