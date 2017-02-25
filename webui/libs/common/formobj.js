/*!
 * Create by zihan on 2015-12-22
 * v1.2.3
 */

$.fn.extend({
    formobj: function(type) {
        var obj = '{', serialize = ''
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

            if (type && type == 'string') {
                if (serialize !== '') serialize += '&'
                serialize += _this.attr('name') + '=' + _val
            } else {
                if (obj !== '{') obj += ','
                obj += '"' + _this.attr('name') + '"' + ':' + _valfinal
            }
        })
        obj += '}'

        if (type && type == 'string') {
            return serialize
        } else {
            return JSON.parse(obj)
        }
    }
});
