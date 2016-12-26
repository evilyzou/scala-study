
// Pagination plus
// v1.0.3
// How to use it (eg.):
/* HTML */
/*
<nav>
    <ul class="pagination">
        <li class="disabled"><a class="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
        <li><a class="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
    </ul>
</nav>

<div class="widget-foot pagenav foot form-inline">
    <nav class="form-group">
        <ul class="pagination" data-rowtotal="1747" data-pagesize="20">
            <li class="disabled"><a class="prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
            <li><a class="next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
        </ul>
    </nav>

    <div class="form-group">转到</div>
    <div class="form-group gopage">
        <div class="input-group form-inline form-group">
            <input type="text" class="form-control pageno" placeholder="" value="" style="width:75px">
            <span class="input-group-btn">
                <button class="btn btn-default pagego" type="button">Go!</button>
            </span>
        </div>
    </div>

</div>
*/
/* JS */
/*
if ($.fn.pagination) {
    var option = {
        total: 200,        // data row total
        //pageSize: 20       // rows in a page (default 20, Optional)
        //currentPageNo: 20  // the current page No. (Optional)
        //pageNum: 8         // pages on show (default 8, Optional)
    };
    $('.pagination').pagination(option, function(targetNo, option) {
        // targetNo is the new page no
        // option.pageSize is the rows in a page
        console.log(pageNo, option);
    });
}
*/
$.fn.extend({
    pagination: function(option, callback) {
        var root = $(this);
        var selector = root.find('.pagination');

        var option   = option          || {};
        var total    = option.total    || 0;            // data row total

        if (selector.attr('data-rowtotal') == total) return;

        var pageSize = option.pageSize || 20,           // how many row in a page
            currentPageNo = option.currentPageNo || 1,  // the current page no
            pageNum  = option.pageNum  || 8;            // how many pages on show


        var linkNum = Math.ceil(total / pageSize),
            maxShow = (linkNum >= pageNum + 1) ? pageNum : linkNum;

        // create page link
        function createLink(tarNo) {
            var tmp     = '';
            var tarNo   = Number(tarNo) || 1,
                midNo   = Math.floor((pageNum - 1) / 2),
                startNo = (tarNo > midNo) ? tarNo - midNo : 1,
                endNo   = (tarNo + midNo >= linkNum) ? linkNum : startNo + maxShow - 1;

            if (tarNo + midNo >= linkNum) {
                startNo = endNo - maxShow + 1;
            }

            if (startNo > 1) {
                tmp += '<li><span class="plink">...</span></li>';
            }

            for(var i = startNo; i <= endNo; i++) {
                tmp += '<li><a class="plink" data-pageno="' + i + '" href="#">' + i + '</a></li>';
            }

            if ((tarNo + Math.ceil((pageNum - 1) / 2) < linkNum) && linkNum > pageNum) {
                tmp += '<li><span class="plink">...</span></li>';
            }

            // prev and next stauts
            direction(tarNo, linkNum);

            selector.find('.plink').parent().remove();
            selector.find('li:last-child').before(tmp);
            selector.find('[data-pageno="' + tarNo + '"]').parent().addClass('active');
            selector.attr({
                'data-rowtotal': total,
                'data-pagesize': pageSize
            });
        }
        createLink(currentPageNo);

        function direction(tarNo, linkNum) {
            // prev stauts
            if (tarNo > 1) {
                selector.find('.prev').parent().removeClass('disabled');
            } else {
                selector.find('.prev').parent().addClass('disabled');
            }
            // next stauts
            if (tarNo < linkNum) {
                selector.find('.next').parent().removeClass('disabled');
            } else {
                selector.find('.next').parent().addClass('disabled');
            }
        }

        // bind link action
        selector.off('click', 'a').on('click', 'a', function(e) {
            e.preventDefault();
            var _this     = $(this),
                _parent   = _this.parent(),
                pageNo    = _this.attr('data-pageno')      || 1,
                pageSize  = selector.attr('data-pagesize') || 20;

            if (_parent.hasClass('disabled') || _parent.hasClass('active')) return;

            var tarNo = Number(selector.find('li.active a').attr('data-pageno') || 1);
            var targetNo = tarNo;

            // current page
            // prev
            if (_this.hasClass('prev')) {
                tarNo = Number(tarNo) - 1;
            // next
            } else if (_this.hasClass('next')) {
                tarNo = Number(tarNo) + 1;
            } else {
                tarNo = Number(pageNo);
            }

            // prev and next stauts
            direction(tarNo, linkNum);

            if (linkNum <= pageNum) {
                selector.find('[data-pageno="' + tarNo + '"]').parent().addClass('active').siblings().removeClass('active');
            } else {
                createLink(tarNo);
            }

            if (callback) {
                root.find('.pageno').val('');
                option.page = tarNo;
                // option.pageNo = tarNo;
                callback(tarNo, option);
            };
        });

        root.off('click', '.pagego').on('click', '.pagego', function(e) {
            var goPageno = root.find('.pageno').val() || 1;
            option.page = goPageno;
            if (callback) {
                createLink(goPageno);
                callback(goPageno, option);
            }
        });

        root.off('keydown', '.pageno').on('keydown', '.pageno', function(e) {
            var _this = $(this);
            if (e.keyCode == 13) {
                var goPageno = _this.val() || 1;
                option.page = goPageno;
                if (callback) {
                    createLink(goPageno);
                    callback(goPageno, option);
                }
            }
        });

    },

    paginationGo: function(target, callback) {
        var _target = target || $('.gopage'),
            _input = _target.find('.pageno'),
            _button = _target.find('.pagego'),
            _pageNo = _input.val() || 1,
            _pageSize = _input.attr('data-pagesize') || 20;

        if (callback) {
            _target.off('click', '.pagego').on('click', '.pagego', function() {
                callback(_pageNo, _pageSize)
            })
        }
    }
});
