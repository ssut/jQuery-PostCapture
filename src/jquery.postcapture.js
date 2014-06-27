/*
 * jQuery Post Capture Plugin
 * https://github.com/ssut/jQuery-PostCapture
 *
 * Copyright 2014, ssut(SuHun Han)
 * http://ssut.me
 *
 * Licensed under the BSD 3-Clause license:
 * http://www.opensource.org/licenses/BSD-3-Clause
 */

// Expose plugin as an AMD module if AMD Loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
})(function ($) {
    'use strict';

    // Create chainable jQuery plugin:
    $.fn.capture = function (options, args) {
        if (!this.is('form')) {
            return;
        }

    };

    $.captures = {

    };
});
