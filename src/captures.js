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
        formData = JSON.parse(cookies[key]);
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
