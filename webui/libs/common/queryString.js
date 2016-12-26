
XLJ.queryString = window.XLJ.queryString || (function () {
    var queryObj = {};
    var q = window.location.search;
    if (!q) {
        return queryObj;
    } else if (q.charAt(0) === '?') {
        q = q.substr(1);
    }

    if (!q) {
        return queryObj;
    } else {
        var hashIndex = q.indexOf('#')
        if (hashIndex !== -1) {
            q = q.substring(0, hashIndex);
        }
    }

    var qs = q.split('&') || [];
    for (var s in qs) {
        var kv = qs[s].split('=');
        if (kv[1]) {
            queryObj[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
        }
    }
    return queryObj;
})();
