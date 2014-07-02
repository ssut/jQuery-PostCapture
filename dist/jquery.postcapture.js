/*!
 * jQuery Validation Plugin v0.0.1
 *
 * https://github.com/ssut/jQuery-PostCapture
 *
 * Copyright (c) 2014 ssut (SuHun Han)
 * Released under the BSD 3-Clause license
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(window.jQuery);
	}
}(function($) {

/*!
* jQuery Cookie Plugin v1.4.1
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2013 Klaus Hartl
* Released under the MIT license
*/

var pluses = /\+/g;

function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
}

function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
}

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

function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
}

var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
        options = $.extend({}, config.defaults, options);

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

$.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
        return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
};
var startsWith = 'formCapture#',
    currentLocation = location.href,
    localStorage = (function () {
        var ls = window.localStorage;
        var test = 'test';
        try {
            ls.setItem(test, test);
            ls.removeItem(test);
            return ls;
        } catch(e) {
            return null;
        }
    })();

// First, collect formCapture cookie for security
var formData = null;

// getting data from localStorage
if (localStorage) {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.slice(0, startsWith.length) === startsWith) {
            formData = JSON.parse(localStorage.getItem(key));
            localStorage.removeItem(key);
            break;
        }
    }
}

// getting data from cookie
var cookies = $.cookie();
for (var key in cookies) {
    if (key.slice(0, startsWith.length) === startsWith) {
        var cookieData = JSON.parse(cookies[key]);
        if (!localStorage) {
            formData = cookieData;
        } else {
            $.extend(formData, cookieData);
        }
        $.removeCookie(key);
        break;
    }
}

// Create chainable jQuery plugin:
$.captures = function (key, blankable) {
    if (formData === null) {
        return null;
    }

    if (key === undefined || key === null || arguments.length === 0) {
        return formData;
    } else if (typeof key === 'string') {
        if (formData.hasOwnProperty(key)) {
            return formData[key];
        } else {
            return blankable ? '' : null;
        }
    } else if (Object.prototype.toString.call(key) === '[object Array]' ||
               key instanceof Array) {
        var dataObject = {};
        for (var i = 0; i < key.length; i++) {
            var k = key[i];
            if (typeof k !== 'string') {
                console.warn('jQuery PostCapture:',
                    'the element indexed', i, 'is not String');
                continue;
            }
            dataObject[k] = $.captures(k, blankable);
        }

        return dataObject;
    }
};

// Create chainable jQuery plugin:
$.fn.capture = function (options, args) {
    if (!this.is('form')) {
        console.warn('jQuery PostCapture:',
            'this library is only available on `form` element');
        return;
    }

    var action = function () {
        var action = $(this).attr('action');
        var data = {};
        var elements = $(this).find('[name]');

        for (var i = 0; i < elements.length; i++) {
            var self = elements.eq(i);
            switch (self.get(0).tagName.toUpperCase()) {
                case 'INPUT':
                case 'SELECT':
                case 'TEXTAREA':
                    break;
                default:
                    continue;
            }

            var name = self.prop('name');
            var type = self.prop('type').toLowerCase();
            var value = self.val();

            if (type == 'checkbox') {
                // multiple checkbox
                if (name.indexOf('[]') > -1) {
                    if (!data.hasOwnProperty(name)) {
                        data[name] = [];
                    }
                    if (self.is(':checked')) {
                        data[name].push(value);
                    }
                } else if (self.is(':checked')) {
                    data[name] = 'on';
                }
            } else if (type == 'radio') {
                if (self.is(':checked')) {
                    if (value !== '') {
                        data[name] = value;
                    } else {
                        data[name] = 'on';
                    }
                }
            } else if (type == 'file') {

            } else {
                data[name] = value;
            }
        }

        var key = 'formCapture#';
        for (i = 0; i < action.length; i++) {
            key += action.charCodeAt(i);
        }

        var serialized = JSON.stringify(data);
        // currentLocation is declared in captures.js
        var locationInfo = {
            current: getLocation(currentLocation),
            action: getLocation(action)
        };
        if (localStorage &&
            locationInfo.current !== null && locationInfo.action !== null &&
            locationInfo.current.host === locationInfo.action.host) {
            // can use localStorage with not break Same-Origin policy
            if (localStorage.getItem(key) !== undefined) {
                localStorage.removeItem(key);
            }
            localStorage.setItem(key, serialized);
        } else {
            if ($.cookie(key) !== undefined) {
                $.removeCookie(key);
            }
            $.cookie(key, serialized);
        }
    };

    this.submit(action);
};

function getLocation(href) {
    // If href starts with relative path
    if (href.slice(0, 1) === '/' ||
        (href.slice(0, 5) !== 'http:' && href.slice(0, 6) !== 'https:')) {
        current = getLocation(location.href);
        href = current.protocol + '//' + current.host + href;
    }
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/?[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    };
}

}));