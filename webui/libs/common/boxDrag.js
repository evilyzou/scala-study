/*!
 * Create by zihan on 2016-06-22
 * boxDrag
 * verstion: 2.3.6
 */

XLJ.boxDrag = window.XLJ.boxDrag || function(target, dragArea, dragParent, callback) {
    if (!target) return

    var $doc      = $(document),
        _move     = false,
        _clearT   = '',
        _currentTarget = window.XLJ._currentDragTarget = ''

    if (typeof dragArea == 'function') callback = dragArea, dragArea = ''
    if (typeof dragParent == 'function') callback = dragParent, dragParent = ''

    // reset dragArea
    if (typeof dragArea == 'object') {
        if (dragArea.length == 0) dragArea = target
    } else if (!dragArea) {
        dragArea = target
    }

    // set drag box parent container
    function getDragParent(target) {

        var _dragParent = ''

        if (dragParent && typeof dragParent == 'string') {
            _dragParent = target.closest(dragParent)
        } else {
            _dragParent = target.parent()
        }

        if (!_dragParent || _dragParent.length == 0) {
            return _dragParent = ''
        }
        var _dpPosition = _dragParent.css('position')
        if (target.css('position') != 'fixed' &&
            _dpPosition != 'relative' &&
            _dpPosition != 'absolute' &&
            _dpPosition != 'fixed')
        {
            console.log('%cDrag parent container box is not finded', 'color:#abe')
            return _dragParent = ''     // if have not requirement to drag at container
        }
        return _dragParent
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

    function dragCore($target, x, y, cx, cy, posType) {
        if (!_currentTarget) return

        // drag on document
        function doc_mousemove(e) {
            if (!_move) return

            var _x = e.pageX - x,
                _y = e.pageY - y

            // change x y unit to precent
            if (cx) _x = (_x / cx) * 100 + '%'
            if (cy) _y = (_y / cy) * 100 + '%'

            //console.log('e.pageX: ' + e.pageX);
            //console.log(_x);
            _currentTarget.css({
                position:   posType || '',
                left:       _x,
                top:        _y,
                transition: 'none'  // ban transition animation
            }).attr('data-moving', 'true')
        }
        $doc
            .off('mousemove', doc_mousemove)
            .on('mousemove',  doc_mousemove)
    }

    // doc mouseup
    function doc_mouseup(e) {
        _move = false
        _currentTarget = ''
    }
    $doc
        .off('mouseup',   doc_mouseup)
        .on('mouseup',    doc_mouseup)

    // drag box
    function dragArea_mousedown(e) {
        e.stopPropagation()
        e.preventDefault()

        var $target = getTarget(e),
            $dragParent = (typeof dragParent == 'object' && dragParent.length != 0) ? dragParent : getDragParent($target)

        _currentTarget = $target

        clearTimeout(_clearT)
        _move = true
        var _left = $target.css('left'),
            _top  = $target.css('top'),
            _x    = e.pageX - ((_left != 'auto') ? parseInt(_left) : 0),
            _y    = e.pageY - ((_top != 'auto') ? parseInt(_top) : 0),
            _cx   = '',
            _cy   = '',
            _posType = $target.css('position'),
            _style = $target.attr('style')

        if (_posType != 'fixed') _posType = 'absolute'

        if ($dragParent && $dragParent.length > 0) {
            var _dParentOffset = $dragParent.offset(),
                _dParent_left  = _dParentOffset.left,
                _dParent_top   = _dParentOffset.top

            var _testLeft = /left\: [0-9]*\.?[0-9]*?%\;/,
                _testTop  = /top\: [0-9]*\.?[0-9]*?%\;/

            // get area info
            var _baseFontSize = 20
            var _dragParent_boxSizing = $dragParent.css('box-sizing')
            var _dragParent_w = $dragParent.outerWidth(),
                _dragParent_h = $dragParent.outerHeight()

            if (_dragParent_boxSizing != 'border-box') {
                _dragParent_w = $dragParent.width()
                _dragParent_h = $dragParent.height()
            }

            _cx = _dragParent_w
            _cy = _dragParent_h

            $dragParent
                .attr({
                    'data-width':  _dragParent_w,
                    'data-height': _dragParent_h
                })
                .css({
                    'width':  _dragParent_w / _baseFontSize + 'rem',
                    'height': _dragParent_h / _baseFontSize + 'rem'
                })
        }

        dragCore($target, _x, _y, _cx, _cy, _posType)

        //stop select text if moveing
        function selectstart() {
            if (_move) return false
        }
        $doc
            .off('selectstart', selectstart)
            .on('selectstart', selectstart)
    }
    function dragArea_mouseup(e) {
        _move = false

        var $target   = getTarget(e)
        $target.css({
            transition: ''  // remove transition animation
        })

        _clearT = setTimeout(function() {
            $target.attr('data-moving', 'false')
        }, 20)

        _currentTarget = ''
        if (callback) callback()
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

}
