/*!
 * Create by zihan on 2015-12-22
 * v1.1.4
 */

$.fn.extend({
    formobj: function(type) {
        var obj = '{'
        var input = $(this).find('[name]')
        input.each(function(i) {
            var _this = $(this)
            if (!_this.attr('name')) return
            if (_this.attr('data-skipData') == 'true') return
            if (_this.prop('disabled') == true) return
            if ((_this.attr('type') == 'radio' || _this.attr('type') == 'checkbox') && _this.prop('checked') == false) return

            var _val = (_this.val() || '').trim()
            var _valfinal = (/^[0-9]+([\.0-9]+)?$/.test((1 * _val))) ? Number(_val) : '"' + _val + '"'
            if (_val === '') _valfinal = '""'
            obj += _this.attr('name') + ':' + _valfinal
            if (i < input.length - 1) obj += ','
        })
        obj += '}'

        if (type && type == 'string') {
            return obj
        } else {
            return eval('(' + obj +')')
        }
    }
});
