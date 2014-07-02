if (window.sessionStorage) {
    sessionStorage.clear();
}
$.mockjaxSettings.log = $.noop;

// Asserts that there is a visible error with the given text for the specified element
QUnit.assert.hasError = function (element, text, message) {
    var errors = $(element).closest('form').validate().errorsFor(element[ 0 ]),
        actual = (errors.length === 1 && errors.is(':visible')) ? errors.text() : '';
    QUnit.push(actual, actual, text, message);
};

// Asserts that there is no visible error for the given element
QUnit.assert.noErrorFor = function (element, message) {
    var errors = $(element).closest('form').validate().errorsFor(element[ 0 ]),
        hidden = (errors.length === 0) || (errors.is(':hidden') && (errors.text() === ''));
    QUnit.push(hidden, hidden, true, message);
};

module('postcapture');

asyncTest('normal text data', function () {

    $('#testForm1').capture();
    $('#testForm1 input:submit').click();

    var intv = setInterval(function () {
        if (completed[0]) {
            clearInterval(intv);

            var target = document.getElementById('targetFrame1');
            var apple = target.contentWindow.$.captures('input1');
            var banana = target.contentWindow.$.captures('input2');

            start();
            equal(apple, 'apple');
            equal(banana, 'banana');
        }
    }, 50);
});

asyncTest('single selectable radio input', function () {

    $('#testForm3').capture();
    $('#testForm3 input:submit').click();

    var intv = setInterval(function () {
        if (completed[2]) {
            clearInterval(intv);

            var target = document.getElementById('targetFrame3');
            var radio = target.contentWindow.$.captures('radio');

            start();
            equal(radio, 'dog');
        }
    }, 50);
});

asyncTest('multi selectable checkbox input', function () {

    $('#testForm4').capture();
    $('#testForm4 input:submit').click();

    var intv = setInterval(function () {
        if (completed[3]) {
            clearInterval(intv);

            var target = document.getElementById('targetFrame4');
            var check = target.contentWindow.$.captures('checkbox[]');

            start();
            equal(typeof check, 'object');
            equal(check.length, 2);
            equal(check[0], 'banana');
            equal(check[1], 'dog');
        }
    }, 50);
});
