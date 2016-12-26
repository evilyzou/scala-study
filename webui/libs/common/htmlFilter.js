/*!
  *  HTML Filter
  *  Create Date: 2014
  *  Author: zihan
  */

XLJ.htmlFilter = window.XLJ.htmlFilter || function(html) {
    if (!html) return

    var needcut = html.indexOf('<body');
    if (needcut != -1) {
        var bodyBegin = html.indexOf('>', needcut) + 1,
            bodyEnd = html.indexOf('</body', needcut);
        return html.substring(bodyBegin, bodyEnd);
    } else {
        return html;
    }
}
/* end HTML Filter */
