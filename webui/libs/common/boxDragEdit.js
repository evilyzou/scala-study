/*!
 * Create by zihan on 2016-06-22
 * boxDrag Edit type
 * verstion: 1.0.0
 */

XLJ.boxDragEdit = window.XLJ.boxDragEdit || function(target, dragArea, dragParent) {
    if (!target) return

    var $doc      = $(document),
        _move     = false

    // reset dragArea
    if (typeof dragArea == 'object') {
        if (dragArea.length == 0) dragArea = target
    } else if (!dragArea) {
        dragArea = target
    }

    // set drag box parent container
    function getDragParent(target) {

        if (typeof dragParent == 'object' && dragParent.length != 0) {
            return dragParent
        } else if (dragParent && typeof dragParent == 'string') {
            dragParent = target.closest(dragParent)
        } else {
            dragParent = target.parent()
        }

        if (!dragParent || dragParent.length == 0) {
            return dragParent = ''
        }
        var _dpPosition = dragParent.css('position')
        if (target.css('position') != 'fixed' &&
            _dpPosition != 'relative' &&
            _dpPosition != 'absolute' &&
            _dpPosition != 'fixed')
        {
            console.log('%cDrag parent container box is not finded', 'color:#abe')
            return dragParent = ''     // if have not requirement to drag at container
        }
        return dragParent
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
        // drag on document
        function doc_mousemove(e) {
            if (!_move) return

            var _x = e.pageX - x,
                _y = e.pageY - y

            // change x y unit to precent
            if (cx) _x = (_x / cx) * 100 + '%'
            if (cy) _y = (_y / cy) * 100 + '%'

            $target.css({
                position:   posType || '',
                left:       _x,
                top:        _y,
                transition: 'none'  // ban transition animation
            })
        }
        $doc
            .off('mousemove', doc_mousemove)
            .on('mousemove',  doc_mousemove)
    }

    // doc mouseup
    function doc_mouseup(e) {
        _move = false
    }
    $doc
        .off('mouseup',   doc_mouseup)
        .on('mouseup',    doc_mouseup)

    // drag box
    function dragArea_mousedown(e) {
        var $target = getTarget(e),
            dragParent = getDragParent($target)

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

        if (dragParent && dragParent.length > 0) {
            var _dParentOffset = dragParent.offset(),
                _dParent_left  = _dParentOffset.left,
                _dParent_top   = _dParentOffset.top

            var _testLeft = /left\: [0-9]*\.?[0-9]*?%\;/,
                _testTop = /top\: [0-9]*\.?[0-9]*?%\;/

            if (_testLeft.test(_style)) {
                _cx = dragParent.outerWidth()
            } else {
                _x -= _dParent_left
            }

            if (_testTop.test(_style)) {
                _cy = dragParent.outerHeight()
            } else {
                _y -= _dParent_top
            }

            // get area info
            var _dragParent_w = dragParent.outerWidth(),
                _dragParent_h = dragParent.outerHeight()

            dragParent
                .attr({
                    'data-width': _dragParent_w,
                    'data-height': _dragParent_h
                })
                .css({
                    'width': _dragParent_w,
                    'height': _dragParent_h
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
