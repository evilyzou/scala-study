
// 2017-01-22 by zihan
// incomplete

    XLJ.boxSrcollBanTouchMoveTopEnd = XLJ.boxSrcollBanTouchMoveTopEnd || function() {
        // var _client = '',
        //     _bando  = false
        //
        // var
        //     _start_fn = function(e) {
        //         var $this = $(this)
        //         _client = e.originalEvent.changedTouches[0].clientY
        //     },
        //     _move_fn = function(e) {
        //         var $this = $(this),
        //             _client_move = e.originalEvent.changedTouches[0].clientY,
        //             _this_stop = $this.scrollTop()
        //
        //         if (_this_stop === 0 && (_client >= _client_move)) {
        //             _bando = true
        //             e.stopPropagation()
        //         } else {
        //             _bando = false
        //         }
        //         document.querySelector('#header .title').innerHTML = _bando
        //     },
        //     _body_fn = function(e) {
        //         if (_bando) {
        //             e.preventDefault()
        //             e.stopPropagation()
        //         }
        //     }
        //
        // $(document.body)
        //     .off('touchstart', '.maincontent', _start_fn)
        //     .on('touchstart', '.maincontent', _start_fn)
        //     .off('touchmove', '.maincontent', _move_fn)
        //     .on('touchmove', '.maincontent', _move_fn)
        //
        //     .off('touchstart', _body_fn)
        //     .on('touchstart', _body_fn)
        //     .off('touchmove', _body_fn)
        //     .on('touchmove', _body_fn)


        var _nummm = 1, _clientY_start = 0

          var __top = 0
            , totalScroll = 0
            , currentScroll = top + 0

                var overscroll = function(el) {
                  el.addEventListener('touchstart', function(e) {
                      var _top = el.scrollTop
                    __top = _top
                    totalScroll = el.scrollHeight
                    currentScroll = __top + el.offsetHeight

                      _clientY_start = e.changedTouches[0].clientY
                    //If we're at the top or the bottom of the containers
                    //scroll, push up or down one pixel.
                    //
                    //this prevents the scroll from "passing through" to
                    //the body.
                    if(__top === 0) {
                      el.scrollTop = 1
                    } else if(currentScroll === totalScroll) {
                      el.scrollTop = __top - 1
                    }
                  })
                  el.addEventListener('touchmove', function(evt) {
                      console.log(evt.changedTouches[0].clientY);

                      if (__top <= 1) {
                          if (_clientY_start <= evt.changedTouches[0].clientY) evt._isScroller = false
                      } else {
                          evt._isScroller = true
                      }

                    if (currentScroll === totalScroll) {
                        if (_clientY_start >= evt.changedTouches[0].clientY) evt._isScroller = false
                    } else {
                        evt._isScroller = true
                    }

                    //if the content is actually scrollable, i.e. the content is long enough
                    //that scrolling can occur
                    if(el.offsetHeight < el.scrollHeight)
                      evt._isScroller = true
                  })
                }
                var __maincontent = document.querySelector('.maincontent')
                overscroll(__maincontent);
                __maincontent.scrollTop = 1
                document.body.addEventListener('touchmove', function(evt) {
                  //In this case, the default behavior is scrolling the body, which
                  //would result in an overflow.  Since we don't want that, we preventDefault.
                  if(!evt._isScroller) {
                      document.querySelector('#header .title').innerHTML = _nummm
                      _nummm ++
                    evt.preventDefault()
                  }
                })


    };

    // XLJ.boxSrcollBanTouchMoveTopEnd()
