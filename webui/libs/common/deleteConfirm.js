/*!
  *  Create Date: 2016-06-20
  *  Author: zihan
  */

XLJ.deleteConfirm = window.XLJ.deleteConfirm || function(model, id, name, callback) {
    if (!model || !id) return

    var _delTPl = '<div class="popbox min" style="display: none;" data-popbox-tid="' + (id || '') + '">'
                + '  <div class="head"><h3 class="title">删除</h3></div>'
                + '    <div class="main">'
                + '      <div class="content">'
                + '        <input type="hidden" name="id" value="' + (id || '') + '">'
                + '        是否<span class="text-wrong">删除</span> <strong class="name">' + (name || '') + '</strong> ?'
                + '        <div class="msg"></div>'
                + '      </div>'
                + '      <div class="foot">'
                + '        <button type="button" class="btn btn-primary confirm" data-id="' + (id || '') + '">确认</button>'
                + '        <button type="button" class="btn btn-default cancel" data-id="' + (id || '') + '">取消</button>'
                + '      </div>'
                + '    </div>'
                + '</div>'

    var $target = $(_delTPl)
    $target.appendTo($(document.body))
    $target.popbox({removeDom: true})
    $target.on(XLJ.clickType, '.confirm', function(e) {
        var _id = $target.find('[name="id"]').val() || '';

        var option = {};
        option.id = _id;

        function cb(response) {
            if (response.success) {
                if (XLJ.tip) {
                    XLJ.tip('删除成功', 'success');
                } else {
                    alert('删除成功')
                }
                $target.popbox({close: true, removeDom: true}, function($target) {
                    $target.remove();
                });

                if (callback) callback(response);
            } else {
                $target.find('.msg').show().text(response.msg);
                setTimeout(function() {
                    $target.find('.msg').fadeOut(300);
                }, 3000);
            }
        }

        if (typeof model == ('function' || 'obect')) {
            model(option, function(response) {
                cb(response)
            })
        } else if (typeof model == 'string') {
            $.get(model, option, function(response) {
                cb(response)
            })
        }
    })
}
