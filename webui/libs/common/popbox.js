
/* -----------------------
   Pop Box
   2014.07.05   - zihan
   v1.2.4

    1.New a pop box
    A:
        $('selector').popbox();
        or
        $('selector').popbox({
            width  : 680,       //default is 600
            height : 480        //default is auto
        });
    B:
        <a class="openpop" href="#mypop">openpop</a>    //Must have class="openpop" and href="#id"

    2.Close the pop box
        $('selector').popbox('close');
        or
        closepop(this); // 'this' is the inner elment of popbox.

    3.Dom:
        <div id="mypop" class='popbox'>
            <div class="head">Title</div>
            <div class="main">
                Content document
            </div>
        </div>


    //other setting
    //popbox start
    $('.openpop').trigger('openpop');
    $('.popbox').trigger('popbox');
 * - - - - - - - - - - - */

;(function(window) {


var XLJ = window.XLJ = window.XLJ || {}
var clickType = XLJ.clickType || (/mobile/.test(navigator.userAgent.toLowerCase()) ? 'touchstart' : 'click')

XLJ.popbox = XLJ.popbox || (function(window) {

    /*!
     * Create by zihan on 2016-06-22
     * boxDrag
     * verstion: 1.1.3
     */
    // pop box drag
    var boxDrag = XLJ.boxDrag || function(target, dragArea) {
        if (!target) return

        var $doc      = $(document),
            _move     = false,
            _x, _y

        // reset dragArea
        if (typeof dragArea == 'object') {
            if (dragArea.length == 0) dragArea = target
        } else if (!dragArea) {
            dragArea = target
        }

        function getTarget(e) {
            var _target

            if (typeof target == 'object') {
                _target = target
            } else if (target != dragArea) {
                _target = $(e.target).closest(target)
            } else {
                _target = $(e.target)
            }
            return _target
        }

        // drag box
        function dragArea_mousedown(e) {
            var $target   = getTarget(e)

            _move = true
            _x    = e.pageX - parseInt($target.css('left'))
            _y    = e.pageY - parseInt($target.css('top'))

            //stop select text if moveing
            $doc.on('selectstart', function() {
                if (_move) return false
            })
        }
        function dragArea_mouseup(e) {
            _move = false

            var $target   = getTarget(e)
            $target.css({
                transition: ''  // remove transition animation
            })
        }

        if (typeof dragArea == 'object') {
            if (dragArea.length == 0) dragArea = target
            if (target.length == 0) return                 // exit this box drag

            dragArea
                .off('mousedown', dragArea_mousedown)
                .off('mouseup',   dragArea_mouseup)
                .on('mousedown',  dragArea_mousedown)
                .on('mouseup',    dragArea_mouseup)
        } else {
            $doc
                .off('mousedown', dragArea, dragArea_mousedown)
                .off('mouseup',   dragArea, dragArea_mouseup)
                .on('mousedown',  dragArea, dragArea_mousedown)
                .on('mouseup',    dragArea, dragArea_mouseup)
        }


        // drag on document
        function doc_mousemove(e) {
            if (!_move) return

            var x = e.pageX - _x,
                y = e.pageY - _y

            var $target   = getTarget(e)
            $target.css({
                position:   'fixed',
                top:        y,
                left:       x,
                transition: 'none'  // ban transition animation
            })
        }
        function doc_mouseup(e) {
            _move = false
        }

        $doc
            .off('mousemove', doc_mousemove)
            .off('mouseup',   doc_mouseup)
            .on('mousemove',  doc_mousemove)
            .on('mouseup',    doc_mouseup)
    }

    function currentWin($target) {
        $('.popbox').removeClass('current');
        $target.addClass('current');
    }

    // close pop box
    function closepop($target, removeDom){
        if ($target && $target.length > 0) {
            var thisbox = $target.closest('.popbox');
            thisbox.fadeOut(100, function() {
                if (removeDom) return thisbox.remove()
                //reset the form to default when close the popbox
                thisbox.find('form').each(function(){ this.reset(); });
                thisbox.find('.msg').text('').hide();
            }).addClass('hide').removeClass('show').removeClass('current');
        }
    }

    // pop box position
    function boxPosition($target){
    	//set the position for each pop box can be used at center of screen
        $target.each(function() {
            var _this = $(this),
                thisW = _this.outerWidth(),
                thisH = _this.outerHeight();
            _this.css({
                'position'     : 'fixed',
                'left'         : '50%',
                'top'          : '50%',
                'margin-left'  : -(thisW/2),
                'margin-top'   : -(thisH/2)
            });
        });
    }

    function createPop($target, removeDom) {
        var $target = $target;
        var $head = $('> :first-child', $target);
        //add box style class
        $target.addClass('popbox popboxED hide').css('display', '');

        //reset the box position
        boxPosition($target);
        boxDrag($target, $head);

        //add close button
        if ($head.find('> .close').length == 0) {
            $head.append('<span class="close closepop">Close</span>');
        }

        $target.on(clickType, '.close, .cancel', function(e){
            closepop($(this), removeDom);
            e.stopPropagation();
        }).mousedown(function(e){
            e.stopPropagation();
        });
    }

    $.fn.extend({
        popbox: function(options, callback) {
            var options  = options || ''
            var _this    = this,
                _default = {
                    close:  (options == 'close') ? true : false,
                    width:  '',
                    height: '',
                    removeDom:  false
                },
                opt      = (typeof options == 'object') ? options : {}

            options = $.extend({}, _default, opt)

            //close pop
            if (options.close) {
                _this.find('form').each(function(){ this.reset(); });
                return _this.fadeOut(100, function() {
                    if (callback) callback(_this)
                    if (options.removeDom) _this.remove()
                }).addClass('hide').removeClass('show').removeClass('current');
            } else {
                //open pop
                //add box width height
                if (options.width)  _this.css('width', options.width);
                if (options.height) _this.css('height', options.height);

                if (_this.hasClass('popboxED')) {
                    //if no first start
                    _this.fadeIn(100, function() {
                       if (callback) callback(_this)
                    }).removeClass('hide').addClass('show');
                } else {
                    createPop(_this, options.removeDom);
                }

                _this.removeClass('hide').addClass('show');
                currentWin(_this);
            }

        }
    });

    var $docBody = $(document.body)
    // the pop box reset
    $docBody.on('popbox','.popbox',function(){
        var _this = $(this)
        _this.popbox()
        _this.removeClass('show current').addClass('hide')
    });

    // load pop box
    $docBody.on('openpop','.openpop',function(){
        var _this = $(this),
            _target = _this.attr('href') || _this.attr('data-target') || '';

        if (!_target || _target.indexOf('#') != 0 || _target.length < 2 ) return false;

        _this.click(function(){
            var $target = $(_target);
            $target.popbox('open')
            // if (!$target.hasClass('popboxED')) {
            //     createPop($target);
            // }
            // if ($target.css('display') == 'none') {
            //     $target.fadeIn(100).removeClass('hide').addClass('show');
            // } else {
            //     $target.removeClass('hide').addClass('show');
            //     currentWin(_target);
            // }
            $target.resizepop();
            return false;
        });
    });

    if (!$.fn.resizepop) $.fn.extend({
        resizepop: function() {
            var pbox = $(this);
            if (pbox.length == 0) return;

            var _win = $(window),
                _winW = $(_win).outerWidth(),
                _winH = $(_win).outerHeight();

            var _w = pbox.outerWidth(),
                _h = pbox.outerHeight();

            pbox.outerWidth();
            pbox.css({
                //'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'margin-top': -(_h / 2),
                'margin-left': -(_w / 2)
            });
    	}
    });

$(document.body).on(clickType,'.openpop',function(){
    var _this = $(this),
        _target = _this.attr('data-target') || _this.attr('href') || '';

    if (!_target) return

    var $target = $(_target);
    if ($target.length <= 0) return

    if (!$target.hasClass('popboxED')) {
        createPop($target);
    }
    if ($target.css('display') == 'none') {
        $target.fadeIn(100).removeClass('hide').addClass('show');
    } else {
        $target.removeClass('hide').addClass('show');
    }
    currentWin($target);
    $target.resizepop();
    return false;
});

$('.openpop').trigger('openpop');
$('.popbox').trigger('popbox');

}(typeof window != 'undefined' ? window : this));
}(typeof window != 'undefined' ? window : this));
/* - - - - - - - - - - -
   end Pop Box
   ---------------------- */
