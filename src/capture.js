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
            var self = elements.eq(i), // self is jQuery iterable object (Array) 
                me = self.get(0); // me is native DOM object (object)
            switch (me.tagName.toUpperCase()) {
                case 'INPUT':
                case 'SELECT':
                case 'TEXTAREA':
                    break;
                default:
                    continue;
            }

            var name = self.prop('name');
            var type = self.prop('type') ? self.prop('type').toLowerCase() : '';
            var value = self.val();

            // type is always String
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
                if (!data.hasOwnProperty(name)) {
                    data[name] = [];
                }
                if (value !== '') {
                    // IE >= 10, Safari, Chrome, Firefox ...
                    if (me.files !== undefined) {
                        for (var j = 0; j < me.files.length; j++) {
                            var file = me.files.item(j);
                            var fileData = {
                                name: ('name' in file) ? file.name :
                                      (file.fileName ? file.fileName : ''),
                                size: ('size' in file) ? file.size :
                                      (file.fileSize ? file.fileSize : -1),
                                mediaType: ('mediaType' in file) ? file.mediaType :
                                            'application/octet-stream'
                            };
                            data[name].push(fileData);
                        }
                    } else {
                        var fileName = value.replace(/^.*[\\\/]/, ''),
                            fileExt = fileName.split('.').pop();
                        var mimeType = MimeType.get(fileExt);
                        var fileData0 = {
                            name: fileName,
                            size: -1,
                            mediaType: mimeType
                        };
                        data[name].push(fileData0);
                    }
                }
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
