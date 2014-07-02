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
                    data[name].push(value);
                } else {
                    data[name] = 'on';
                }
            } else if (type == 'radio') {
                if (value !== '') {
                    data[name] = value;
                } else {
                    data[name] = 'on';
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
