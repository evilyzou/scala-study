/*!
 *  Create by zihan on 2016-11
 *  version: 1.2.2
 */

XLJ.page = window.XLJ.page || function(pageNumber, pageContainer, currentPage) {
    //if this function put in hashchange, the pageNumber is a event
    if (typeof pageNumber == 'object') pageNumber = null

    var pagewrap = pageContainer || document.querySelector('.slidepage-wrap')
    if (!pagewrap) return

    var main     = currentPage || pagewrap.querySelectorAll('.slidepage-page')
    if (!main || main.length <= 1) return

    var pagename = ''
    if (pageNumber && pageNumber == 0) {
        pagename = pageNumber
    } else {
        var hash = window.location.hash
        var preg = /#p-([0-9a-zA-Z]*)/
        pagename = hash.match(preg)
        pagename = (pagename) ? pagename[1] : ''
    }
    if (!pagename && pageNumber != 0 && pageNumber != null) return

    var translate3d = 'translate3d(0, 0, 0)'
    var transition  = 'all 0.5s ease'

    if (/^[0-9]*$/.test(pagename)) {
        translate3d = 'translate3d(-' + (pagename * 100) + '%, 0, 0)'
    } else if (hash) {
        var target = document.getElementById(hash.substr(1))
        if (!target) return
        if (!XLJ.nodeIndex) return
        pagename = XLJ.nodeIndex(target)
        translate3d = 'translate3d(-' + (pagename * 100) + '%, 0, 0)'
    }

    for (var i = 0; i < main.length; i++) {
        var m = main[i]
        m.style.webkitTransition = transition
        m.style.transition = transition

        m.style.webkitTransform = translate3d
        m.style.transform = translate3d
    }
}

// init
if (window.addEventListener) {
    window.addEventListener('hashchange', XLJ.page, false)
} else if (window.attachEvent) {
    window.attachEvent('onhashchange', XLJ.page, false)
}
XLJ.docReady(function() {
    // page show init
    XLJ.page()
})
