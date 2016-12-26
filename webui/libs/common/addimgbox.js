
'use strict'

var XLJ = window.XLJ = window.XLJ || {}


/* LRIMG Image Upload
 * Create by zihan on 2016-01-16
 * verstion: 1.0.3
 * must import lib:
                    LocalResizeIMG 1.0
                    AjaxForm 3.51.0

 * ex:

    <!-- HTML -->
    <form class="content item upimg-item uploadImage" method="post" enctype="multipart/form-data">
        <div class="addface">
            <label class="addbtn icon cssicon user" for="upImg0">
                <img class="ImgPr" id="ImgPr0" src="" style="display: none" >
                <span class="tip">上传头像</span>
                <input class="upImg" id="upImg0" type="file" data-no="0"/>
                <input name="file" type="hidden" value="" />
            </label>
            <div class="progress-box" style="display: none;">
                <div class="progress"><div class="progress-bar"></div></div>
            </div>
        </div>
    </form>

    // JS
    var Addimgbox = (XLJ.Addimgbox) ? new XLJ.Addimgbox() : ''
    var _target = $('.uploadImage')
    _target.on('click', '.upImg', function(e) {
        var _this = $(this),
            _parent = _this.parent()

        if (typeof Addimgbox === 'object') Addimgbox.LocalResizeIMG(_this, function(result, blob) {
            _parent.attr('class', '')
            _parent.addClass('haveimg')
            _parent.css('background-image', 'url(' + blob + ')')
            Addimgbox.add(_this)
        })
    })

 */

XLJ.Addimgbox = window.XLJ.Addimgbox || function(options) {
    this.options = options || {}
    this.selectElName  = this.options.selectElName  || '.upImg'
    this.imgElName     = this.options.imgElName     || '.ImgPr'
    this.itemElName    = this.options.itemElName    || '.upimg-item'
    this.pictureAddURL = this.options.pictureAddURL || XLJ.requestDomain + '/Picture/add'
    this.uploadURL     = this.options.uploadURL     || XLJ.requestDomain + '/Picture/upload'
    this.upload64URL   = this.options.upload64URL   || XLJ.requestDomain + '/Picture/uploadBase64'
    this.spaceId       = this.options.spaceId       || 2
}

XLJ.Addimgbox.prototype = {

    fail: function(target) {
        XLJ.tip('上传失败，请重新操作')
        if (!target || !target.length > 0) return
        target.find('.progress-box').html('<div class="reupload">上传失败</div>')
    },

    file: function(target, callback, parent) {
        var root = this

        var _this = target,
            _file = target[0].files[0],
            _parent = _this.parent(),
            _form   = _this.parentsUntil('form').last().parent(),
            _img    = _parent.find(root.imgElName),
            _upImg  = _parent.find(root.selectElName),
            _thisNo = _upImg.attr('data-no'),
            _name   = _parent.find('.name'),
            _boxIndex = Number(_parent.attr('data-boxIndex')) || 0

        _form.attr({
            'enctype': 'multipart/form-data',
            'action':  root.uploadURL
        })

        var URL  = window.URL || webkitURL,
            blob = URL.createObjectURL(_file)

        // if not have image return
        if (!_file) return

        _img.attr('src', blob)
        _name.text(_file.name).attr('title', _file.name)

        if (callback) callback(_thisNo, blob)

    },

    upload: function(target, callback) {
        var root = this

        var _this = target,
            _parent = _this.closest(root.itemElName),
            _imgbox = _this.parent(),
            _imgPr  = _imgbox.find(root.imgElName),
            _file   = _imgbox.find('[name="file"]'),
            _progressBox = _imgbox.parent().find('.progress-box')

        XLJ.ajaxSubmit(_parent, _progressBox, function(response) {
            if (!response.success) return root.fail(_parent)

            var option = {
                spaceId:         root.spaceId,
                name:            response.result.name,
                originalName:    response.result.originalName,
                pictureUrl:      response.result.url,
                pictureLocalUrl: response.result.imgDomain + '/' + response.result.url
            }

            _imgPr.attr({
                'data-url': option.pictureLocalUrl,
                'data-pic': option.pictureUrl
            })
            _file.val('')

            if (callback) callback(response, option)
        })
    },

    addto: function(option, target, callback, showTip) {
        var root = this

        var _this      = target,
            _pictureId = _this.attr('data-pictureId') || 0,
            _parent    = _this.closest(root.itemElName),
            _type      = (_pictureId) ? 'update' : 'submit'

        XLJ.ajaxData(root.pictureAddURL, 'POST', JSON.stringify(option), function(response) {
            if (!response.success) {
                if (showTip !== false) root.fail(_parent)
                return
            }
            if (_type !='update') {
                _this.attr('data-pictureId', response.result.id)
            }
            response.result.pictureUrl = option.pictureUrl || ''
            if (callback) callback(response, option)
        })
    },

    add: function(target, callback) {
        var root = this
        root.upload(target, function(response, option) {
            root.addto(option, target, callback)
        })
    },

    LocalResizeIMG: function(target, callback) {
        var root = this

        var _parent = target.parent(),
            _file   = _parent.find('[name="file"]'),
            _form   = target.parentsUntil('form').last().parent(),
            _imgPr  = _parent.find(root.imgElName),
            _blob   = ''

        _form.attr({
            'enctype': 'application/x-www-form-urlencoded',
            'action':  root.upload64URL
        })

        target.localResizeIMG({
            width: 1000,
            quality: 0.9,
            before: function (obj, blob, file) {
                _blob = blob

                var img = new Image()
                img.src = blob
                img.onload = function() {
                    var that = this,
                        w = that.width,
                        h = that.height,
                        scale = w / h

                    if (w < 1000) {
                        obj.width = w
                        if (_imgPr && _imgPr.length > 0) _imgPr[0].src = blob

                        return false
                    }
                }
            },
            success: function (result) {
                //_imgPr.show();
                _file.val(result.base64)

                if (callback) callback(result, _blob)
            }
        })
    }
}
