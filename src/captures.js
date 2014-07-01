var startsWith = 'formCapture#',
    currentLocation = location.href;

// First, collect formCapture cookie for security
var cookies = $.cookie();
var formData = null;
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
            dataObject[k] = $.captures(k, blankable);
        }

        return dataObject;
    }
};
