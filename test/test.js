if (window.sessionStorage) {
    sessionStorage.clear();
}
$.mockjaxSettings.log = $.noop;

// Asserts that there is a visible error with the given text for the specified element
QUnit.assert.hasError = function(element, text, message) {
    var errors = $(element).closest('form').validate().errorsFor(element[ 0 ]),
        actual = (errors.length === 1 && errors.is(':visible')) ? errors.text() : '';
    QUnit.push(actual, actual, text, message);
};

// Asserts that there is no visible error for the given element
QUnit.assert.noErrorFor = function(element, message) {
    var errors = $(element).closest('form').validate().errorsFor(element[ 0 ]),
        hidden = (errors.length === 0) || (errors.is(':hidden') && (errors.text() === ''));
    QUnit.push(hidden, hidden, true, message);
};

module('postcapture');

var target = $('#target')[0];
test('get all form data', function() {
    $('#testForm1').capture();
    $('#testForm1 input:submit').click();

    var apple = target.$.captures('input1');
    var banana = target.$.captures('input2');

    equal(apple, 'apple');
    equal(banana, 'banana');
});
