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

// Create chainable jQuery plugin:
$.fn.capture = function (options, args) {
    if (!this.is('form')) {
        return;
    }

};

$.captures = {

};

}));