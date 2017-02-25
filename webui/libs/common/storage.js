/*!
 *  Create Date: 2017-01
 *  Author: zihan
 *  verstion: 1.0.0
 */

XLJ.sessionStorage = window.XLJ.sessionStorage || (function(root, window) {
    if (!window.sessionStorage) { console.log('not support sessionStorage') return {} }
    return window.sessionStorage
})(XLJ.sessionStorage || {}, typeof window != 'undefined' ? window : this);


XLJ.localStorage = window.XLJ.localStorage || (function(root, window) {
    if (!window.localStorage) { console.log('not support localStorage') return {} }
    return window.localStorage
})(XLJ.localStorage || {}, typeof window != 'undefined' ? window : this);
