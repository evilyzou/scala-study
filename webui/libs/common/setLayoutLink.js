
XLJ.addLayoutLink = window.XLJ.addLayoutLink || function(lyname) {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i]
        var _href = link.getAttribute('href') || '';

        if (_href && _href.indexOf('#') != 0 && _href.indexOf(lyname) == -1) {
            if (_href.indexOf('?') == -1) {
                link.setAttribute('href', _href + '?ly=' + lyname);
            } else {
                link.setAttribute('href', _href + '&ly=' + lyname);
            }
        }
    }
}

XLJ.setLayoutLink = window.XLJ.setLayoutLink || function() {
//    var dochtml = document.getElementsByTagName('html')[0]
//    dochtml.classList.add('loaded')
//    dochtml.classList.remove('loading')

    var layout = XLJ.getQueryString('ly')
    if (layout) {
        document.getElementsByTagName('html')[0].classList.add(layout);
        XLJ.addLayoutLink(layout)
    }
}
