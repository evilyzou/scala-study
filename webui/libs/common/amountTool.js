/*!
 *  Create Date: 2016-01-04
 *  Author: zihan
*/

/* Amount Tool
 * v1.2.1
 * ex:

    var amountTool = new XLJ.AmountTool({
        elName: '.mod-amount'
    });
    amountTool.init()    // init will run check function once
    //amountTool.check() // if you want to check the new elements click status

    // plus
    // you can set below function for action callback
    window.XLJ.amountCallback = function() {}
*/


XLJ.AmountTool = window.XLJ.AmountTool || function(options) {
    this.options = options || {}
    this.elName  = this.options.elName  || '.mod-amount'
    this.incName = this.options.incName || '.increase'
    this.decName = this.options.decName || '.decrease'
    this.couName = this.options.couName || '.count'
    this.coTName = this.options.coTName || '.countTxt'
    this.action  = this.options.action  || ''
}

XLJ.AmountTool.prototype = {

    // check the action button operation status
    check: function() {
        var root = this
        var $amountBox = $(root.elName)
        $amountBox.each(function() {
            var that = $(this);
            var $count = that.find(root.couName),
                $countTxt = that.find(root.coTName),
                $decrease = that.find(root.decName),
                $increase = that.find(root.incName);

            root.checkBtnState($count, $increase, $decrease);
        });
    },

    // lock the operation when the amount action run
    lock: function($count, $increase, $decrease, cls, type) {
        if (!cls) return
        if (type && type == 'remove') {
            $count.removeClass(cls)
            $decrease.removeClass(cls)
            $increase.removeClass(cls)
        } else {
            $count.addClass(cls)
            $decrease.addClass(cls)
            $increase.addClass(cls)
        }
    },

    // waiting the amount operation callback to run this function,
    // if callback return false, don't do anthing, if no set this function, go on amount
    amountCallback: function($count, $currentOperation, $increase, $decrease, newCount, callback) {
        var root = this
        root.lock($count, $increase, $decrease, 'unactive')

        var cb = root.action || window.XLJ.amountCallback || ''

        if (typeof cb === 'function') {
            var _cb = cb($count, $currentOperation, $increase, $decrease, newCount)
            if (_cb === false) return root.lock($count, $increase, $decrease, 'unactive', 'remove')
            $.when(_cb)
                .done(function() {
                    root.lock($count, $increase, $decrease, 'unactive', 'remove')
                    if (callback) callback()
                })
                .fail(function() {
                    root.lock($count, $increase, $decrease, 'unactive', 'remove')
                })
        } else {
            root.lock($count, $increase, $decrease, 'unactive', 'remove')
            if (callback) callback()
        }
    },

    // operation button disable status
    checkBtnState: function($count, $increase, $decrease) {
        var root = this
        var _count = parseInt($count.val() || 0),
            _min = parseInt($count.attr('min')),
            _max = parseInt($count.attr('max') || 0)

        if (!_min && _min != 0) _min = 1;

        if (_count <= _min) {
            $decrease.addClass('disabled');
        } else {
            $decrease.removeClass('disabled');
        }

        if (_max && _count >= _max) {
            $increase.addClass('disabled');
        } else {
            $increase.removeClass('disabled');
        }
    },

    // core count
    countAction: function(target) {
        var root = this
        var _this     = target,
            _parent   = _this.closest(root.elName),
            $increase = _parent.find(root.incName),
            $decrease = _parent.find(root.decName),
            $count    = _parent.find(root.couName),
            $countTxt = _parent.find(root.coTName),
            _count    = parseFloat($count.val())       || 0,
            _min      = parseFloat($count.attr('min')),
            _max      = parseFloat($count.attr('max')) || 0;

        if (!_min && _min != 0) _min = 1;

        if (_this.hasClass('disabled')) return;

        var _newCount = _count
        if (_this.attr('class').indexOf('increase') != -1) {
            if (_count >= _max && _max != 0) return;

            _newCount += 1

        } else if (_this.attr('class').indexOf('decrease') != -1) {
            if (_count <= _min) return;

            _newCount -= 1
        }

        if (_newCount != _count) {
            root.amountCallback($count, _this, $increase, $decrease, _newCount, function() {
                $count.val(_newCount).attr('data-count', _newCount);
                $countTxt.text(_newCount);
                root.checkBtnState($count, $increase, $decrease);
            });
        }
    },

    init: function() {
        var root = this
        var selectorName = '', selectorCountName = ''
        selectorName += (root.elName + ' ' + root.decName + ', ')
        selectorName += (root.elName + ' ' + root.incName)

        selectorCountName = root.elName + ' ' + root.couName

        // build operation action
        $(document.body)
            .off('click', selectorName)
            .on('click', selectorName, function() {
                var _this = $(this)
                if (_this.hasClass('unactive')) return
                root.countAction($(this))
            })
            .off('blur', selectorCountName)
            .on('blur', selectorCountName, function() {
                var _this = $(this)
                if (_this.hasClass('unactive')) return
                root.countAction($(this))
            });

        root.check()
    }
}
