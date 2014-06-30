// Create chainable jQuery plugin:
$.fn.capture = function (options, args) {
    if (!this.is('form')) {
        return;
    }

    var action = function () {
        var data = {};
        var elements = $(this).find('[name]');

        for (var i = 0; i < elements.length; i++) {
            var self = elements.eq(i);
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
    };

    this.submit(action);
};

$.captures = function (key) {
    
};
