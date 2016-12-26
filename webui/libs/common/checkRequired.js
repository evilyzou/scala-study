/*!
  *  Check Required
  *  Create Date: 2014
  *  Author: zihan
  */

$.fn.extend({
    checkRequired: function(text) {
        var text = text || '不能为空';
        var _isRequired = true;
        var _input = this.find('[data-required="true"]');
        _input.each(function() {
            var _that = $(this);
            if (!_that.val()) {
                if ($.fn.tooltip) {
                    _that.parent().tooltip(text);
                } else {
                    alert(text);
                }
                _isRequired = false;
            }
        });
        return _isRequired;
    }
});
