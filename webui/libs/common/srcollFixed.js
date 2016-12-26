
/* srcoll fixed 
 */
$.fn.extend({
    srcollFixed: function(option) {

        var option = option || {}
        var $sfixed = this;
        //var $topbar = $('#topbar');
        var baseTop = option.baseTop || 0;
        var $win = $(window);

        var $sfixed_c = $sfixed.find('.srcollfixed_c')

        var scrollFN = function() {

            var _winSrcollTop = $win.scrollTop();

            var _main_h = $sfixed.height(),
                _main_Top = $sfixed.offset().top,
                _sfixed_h = $sfixed_c.outerHeight();

            if ((_winSrcollTop - _main_Top + _sfixed_h) >= _main_h) {
                $sfixed_c.addClass('fixed').css({
                    'top': _main_h - (_winSrcollTop - _main_Top + _sfixed_h)
                });
            } else if (_main_Top - _winSrcollTop <= baseTop) {
                $sfixed_c.addClass('fixed').css({
                    'top': baseTop
                });
            } else {
                $sfixed_c.removeClass('fixed').css({
                    'top': '',
                    'width': ''
                });
            }
        }

        window.onscroll = scrollFN;
    }
});
