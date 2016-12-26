
/* srcoll fixed 
 */
var SRCOLL_FIXED = XLJ.SRCOLL_FIXED =  (function(root, window) {

    var $sfixed = $('.srcollfixed');
    var $topbar = $('#topbar');
    //var baseTop = 0;
    var $win = $(window);
    
    var scrollFN = function() {

        var _winSrcollTop = $win.scrollTop();
        $sfixed.each(function() {
            var _this = $(this);
            var _targetWidth = _this.width();
            if (_targetWidth <= 0) return;
            var _targetTop = _this.offset().top;
            var $sfixed_c = _this.find('.srcollfixed_c');

            var baseTop = ($topbar.length <= 0) ? 0 : $topbar.outerHeight();
            if (_targetTop - _winSrcollTop <= baseTop) {
                $sfixed_c.addClass('fixed').css({
                    'top': baseTop,
                    'width': _targetWidth
                });
            } else {
                $sfixed_c.removeClass('fixed').css({
                    'top': '',
                    'width': ''
                });
            }
        });
    }

    root.init = function(target) {
        $sfixed = target || $('.srcollfixed');
        $topbar = $('#topbar');
        window.onscroll = scrollFN;
    }

    return root

}(SRCOLL_FIXED || {}, typeof window !== undefined ? window : this));
