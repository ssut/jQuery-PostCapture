var express = require('express');
var app = express();

app.disable('etag');
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.use('/', express.static(__dirname + '/..'));
app.get('/test/index', function (req, res) {
    res.render('index.html', {
        path: __dirname.replace(/\\/g, '/') + '/..'
    });
});
app.all('/test/action/:num', function (req, res) {
    res.render('action.html', {
        num: req.param('num'),
        post: req.method === 'POST' ? true : false
    });
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
