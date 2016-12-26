
XLJ.boxShowFlag = window.XLJ.boxShowFlag || false;
XLJ.failProcess = window.XLJ.failProcess || function (data, callback) {
    if (!data) return false;

    if (!data.success) {
        if (!XLJ.boxShowFlag && data.msg) {
            //box.show(data.msg);
            if (XLJ.tip) {
                XLJ.tip(data.msg, '', function() {
                    if (callback) callback()
                })
            } else {
                alert(data.msg);
                if (callback) callback()
            }
            XLJ.boxShowFlag = true;
        }
        return false;
    }
    return true;
}
