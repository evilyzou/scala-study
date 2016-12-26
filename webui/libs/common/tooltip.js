/*!
 *  Create Date: 2015
 *  Author: zihan
 *  verstion: 1.0.1
 */

$.fn.extend({
    tooltip: function(text) {
        if (!text) return false;
        var root = this, tipbox, t;
        if (this.find('.tooltip').length > 0) {
            tipbox = this.find('.tooltip');
            tipbox.fadeIn(100);
            clearTimeout(t);
        } else {
            tipbox = $('<div class="tooltip">' + text + '</div>');
            this.prepend(tipbox);
            setTimeout(function() {
                tipbox = root.find('.tooltip');
                tipbox.addClass('show');
            }, 20);
        }
        t = setTimeout(function() {
            tipbox.fadeOut(300, function() {
                tipbox.remove();
            });
        }, 2000);
    }
});
