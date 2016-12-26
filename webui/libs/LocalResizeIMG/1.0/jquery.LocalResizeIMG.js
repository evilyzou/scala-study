/**
 * 获得base64
 * @param {Object} obj
 * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
 * @param {Boolean} [obj.cut=true] 裁剪
 * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
 * @param {Function} obj.success(obj) 处理后函数
 * @example
 *
 */

$.fn.localResizeIMG = function (obj) {

    var angle = '';
    this.on('change', function () {
        var file = this.files[0];
        var URL = window.URL || webkitURL;
        var blob = URL.createObjectURL(file);

        var BinaryAjax = window.BinaryAjax || '',
            EXIF = window.EXIF || '';
        if (BinaryAjax && EXIF) {
            // get photo orientation and set angle
            BinaryAjax(blob, function(o) {
                var oExif = EXIF.readFromBinaryFile(o.binaryResponse),
                    orientation = oExif.Orientation;

                switch(orientation) {
                    case 6:
                        angle = radians('90deg');
                        break;
                    case 3:
                        angle = radians('180deg');
                        break;
                    case 8:
                        angle = radians('270deg');
                        break;
                }
            });
        }

        // 执行前函数
        if($.isFunction(obj.before)) { obj.before(this, blob, file) };

        _create(blob, file);
        this.value = '';   // 清空临时数据

    });

    function radians(angle) {
        if (typeof angle == 'number') return angle;
        return {
            rad: function(z) {
                return z;
            },
            deg: function(z) {
                return Math.PI / 180 * z;
            }
        }[String(angle).match(/[a-z]+$/)[0] || 'rad'](parseFloat(angle));
    }

    /**
     * 生成base64
     * @param blob 通过file获得的二进制
     */
    function _create(blob) {
        var img = new Image();
        img.src = blob;

        img.onload = function () {
            var that = this;

            if (!obj.width) obj.width = that.width;
            if (!obj.height) obj.height = obj.width;

            //生成比例
            var w = that.width,
                h = that.height,
                scale = w / h,
                new_scale = obj.width / obj.height,
                long_side;

            if ((that.width < obj.width) && (that.height < obj.height)) {
                if (obj.cut) {
                    w = obj.width;
                    h = w / scale;
                    long_side = 'height';
                    if (h < obj.height) {
                        h = obj.height;
                        w = h * scale;
                        long_side = 'width';
                    }
                } else {
                    w = that.width;
                    h = w / scale;
                }
            } else {
                w = obj.width;
                h = w / scale;
                long_side = 'height';
                if (h < obj.height) {
                    h = obj.height;
                    w = h * scale;
                    long_side = 'width';
                }
            }

            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            if (obj.cut) {
                console.log('cut');
                $(canvas).attr({width : obj.width, height : obj.height});

                if (long_side == 'width') {
                    var sx = (that.width - (that.height * new_scale)) / 2,
                        sy = 0,
                        swidth = that.height * new_scale,
                        sheight = that.height;
                } else {
                    var sx = 0,
                        sy = (that.height - (that.width / new_scale)) / 2,
                        swidth = that.width,
                        sheight = that.width / new_scale;
                }

                w = obj.width;
                h = obj.height;

                ctx.drawImage(that, sx, sy, swidth, sheight, 0, 0, obj.width, obj.height);

            } else {
                console.log('do not cut');

                if (angle) {
                    var sin = Math.sin(angle);
                    var cos = Math.cos(angle);

                    var imgWidth = w;
                    var imgHeight = h;

                    // calculate the needed space
                    var fullWidth = Math.abs(sin) * imgHeight + Math.abs(cos) * imgWidth;
                    var fullHeight = Math.abs(cos) * imgHeight + Math.abs(sin) * imgWidth;

                    // safari 2 requires setAttribute
                    canvas.setAttribute('width', fullWidth);
                    canvas.setAttribute('height', fullHeight);

                    // makes everything relative to the center, effectively creating a grid
                    ctx.translate(fullWidth / 2, fullHeight / 2)
                    ctx.rotate(angle);

                    // rotates the image over its center point
                    ctx.drawImage(that, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
                } else {
                    canvas.setAttribute('width', w);
                    canvas.setAttribute('height', h);

                    ctx.drawImage(that, 0, 0, w, h);
                }
            }


            /**
             * 生成base64
             * 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8 );

            // 修复IOS
//                if( navigator.userAgent.match(/iphone/i) ) {
//                    var mpImg = new MegaPixImage(img);
//                    mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: obj.quality || 0.8});
//                    base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8 );
//                }

            // 修复android
//                if( navigator.userAgent.match(/Android/i) ) {
//                    var encoder = new JPEGEncoder();
//                    base64 = encoder.encode(ctx.getImageData(0,0,w,h), obj.quality * 100 || 80 );
//                }

            // 生成结果
            var result = {
                base64 : base64,
                clearBase64: base64.substr( base64.indexOf(',') + 1 )
            };

            // 执行后函数
            obj.success(result);
        };
    }
};


// 例子
/*
$('input:file').localResizeIMG({
    width: 100,
    quality: 0.1,
    //before: function (that, blob) {},
    success: function (result) {
        var img = new Image();
        img.src = result.base64;
        $('body').append(img);
        console.log(result);
    }
});
*/