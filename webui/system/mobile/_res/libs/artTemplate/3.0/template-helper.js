
// ver: 1.2.1

template.helper('dateFormat', function (date, format) {
    var now = new Date().getTime();
    var s = parseInt((now - date)/1000);
    if(s < 60) return s + '秒前';
    if(s < 3600) return parseInt(s/60) + '分钟前';
    if(s < 86400) return parseInt(s/3600) + '小时前';

    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };


    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});

template.helper('price', function (data) {
    return (data / 100).toFixed(2);
});

template.helper('sortData', function (data, num) {
    return data.substring(0, num || 10)
});

template.helper('parcelData', function (data, name) {
    var o = {}, name = name || 'data';
    o[name] = data
    console.log(o)
    return o
});

template.helper('getDay', function (data, prefix) {
    var data = data || ''
        ,_d  = new Date(data)
    if (prefix) {
        return prefix + "日一二三四五六".split("")[_d.getDay()];
    } else {
        return _d.getDay();
    }
});

template.helper('parseJson', function (data) {
    return (data) ? JSON.parse(data) : []
});

// custom artTemplate function for get key param name
template.helper('keyMap', function (keyname) {
    return (WEBP && WEBP.keyMap) ? ((WEBP.keyMap[keyname]) ? WEBP.keyMap[keyname] : keyname) : keyname
});

// custom artTemplate function for get key param name
template.helper('weekdate', function (date, prefix) {
    var _d = new Date(date)
        ,_date = (_d.getMonth() + 1) + '-' + _d.getDate()
        ,_week = (prefix || '周') + "日一二三四五六".split("")[_d.getDay()]

    return _date + ' ' + _week
});
