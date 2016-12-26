
// countDown
$.fn.extend({
    countDown: function (options, startCallback, endCallback) {
        var _this = this;

        if (options) {
            var startTime = options.startTime     || '',
                endTime = options.endTime         || '',
                openText = options.openText       || '于' + startTime.replace('00:00:00', "") + '开团',
                offText = options.offText         || '已结束',
                showMsec = options.showMsec       || false,
                formatTxt = options.formatTxt     || ['', '天', '时', '分', '秒'],
                formatStart = options.formatStart || ['距开团：', '天', '时', '分', '秒'],
                formatEnd = options.formatEnd     || ['', '天', '时', '分', '秒'];
        } else {
            return;
        }

        var startT = new Date(startTime).getTime(),
            endT = new Date(endTime).getTime(),
            now = new Date().getTime(),
            countT = Math.floor((endT - now) / 1000);

        var msec = 9;

        // if the time is error, stop function
        if (startT > endT) {
            $(_this).remove();
            return;
        }

        // off function
        if ((now > endT) || (startT > endT)) {
            _this.text(offText);
            return;
        }

        // if the time smaller than startime
        if (now < startT) {
            $(_this).prevAll('.num_buy').remove();
            $(_this).show();
            if (openText.indexOf('00:00:00') != 0) {
                openText = openText.replace('00:00:00', '0点');
            } else if (openText.indexOf(':00:00') != 0) {
                openText = openText.replace(':00:00', '点');
            }
            _this.text(openText);
            return;
        }

        // in time
//        if (now >= startT && now <= endT) {
//            console.log('');
//        }

        $(_this).show();
        timer($(_this));

        function addZero(m) {
            return m < 10 ? '0' + m : m
        }

        function timer(target) {
            var selector = target || '';
            var t = window.setInterval(function () {
                var newNow = new Date().getTime();
                var countT = Math.floor((endT - newNow) / 1000);

                var day = Math.floor(countT / (60 * 60 * 24)),
                    hour = Math.floor(countT / (60 * 60)) - (day * 24),
                    hourAll = Math.floor(countT / (60 * 60)),
                    minute = Math.floor(countT / 60) - (day * 24 * 60) - (hour * 60),
                    second = Math.floor(countT) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

                if (now < startT) {

//                    selector.html(
//                        format[0] + 
//                        '<span class="ui-num">' + addZero(day) + '</span>' + format[1] + 
//                        '<span class="ui-num">' + addZero(hour) + '</span>' + format[2] + 
//                        '<span class="ui-num">' + addZero(minute) + '</span>' + format[3] + 
//                        '<span class="ui-num">' + addZero(second) + '</span>' + 
//                        ((showMsec) ? '.' + msec : '') +
//                        format[4]
//                    );

                } else if (now >= startT && now <= endT) {

                    if (countT > 0) {

                        if (showMsec) {
                            if (msec == 0) {
                                countT--;
                            }
                            ;
                            if (msec < 0)  msec = 9;
                        } else {
                            countT--;
                        }

                        var format = formatEnd;

                        selector.html(
                                format[0] +
                                /*'<span class="ui-num">' + addZero(day) + '</span>' + format[1] +*/
                                '</span><span class="ui-num">' + addZero(hourAll) + '</span><span class="ui-txt">' + format[2] +
                                '</span><span class="ui-num">' + addZero(minute) + '</span><span class="ui-txt">' + format[3] +
                                '</span><span class="ui-num">' + addZero(second) + '</span><span class="ui-txt">' +
                                ((showMsec) ? '.' + msec : '') +
                                format[4]
                        );
                        
                        
                        if (showMsec) msec--;
                        if (endCallback) endCallback(selector);

                    } else {
                        _this.text(offText);
                        if (endCallback) endCallback(_this);
                        clearInterval(t);
                        return;
                    }

                } else {
                    if (endCallback) endCallback(_this);
                    clearInterval(t);
                    return;
                }
                //}, 100);
            }, ((showMsec) ? 100 : 1000));
        }
    }
});
