/*!
 * Create by zihan on 2015-12-22
 * Base form jQuery.cookie
 * XLJ.cookie
 */
!function (window, factory) {
    
    window.XLJ = window.XLJ || {}
    factory(window.XLJ)

}(typeof window !== 'undefined' ? window : this, function (XLJ) {
    
    if (XLJ.cookie) return;

	var pluses = /\+/g;

	function encode(s) { return config.raw ? s : encodeURIComponent(s);	}
	function decode(s) { return config.raw ? s : decodeURIComponent(s);	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

    function isFunction(s) { return typeof s === 'function' ? true : false; }
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return isFunction(converter) ? converter(value) : value;
	}

	var config = XLJ.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !isFunction(value)) {
			//options = $.extend({}, config.defaults, options);
			var options = options || {};

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	XLJ.removeCookie = function (key, options) {
		if (XLJ.cookie(key) === undefined) return false;

		// Must not alter options, thus extending a fresh object...
		//XLJ.cookie(key, '', $.extend({}, options, { expires: -1 }));
        var options = options || {};
        options.expires = -1;
		XLJ.cookie(key, '', options);
		return !XLJ.cookie(key);
	};

});