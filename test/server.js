var express = require('express');
var app = express();

app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.use('/', express.static(__dirname + '/..'));
app.get('/test/index', function (req, res) {
    res.render('index.html', {
        path: __dirname.replace(/\\/g, '/') + '/..'
    });
});
app.post('/test/action.html', function (req, res) {
    res.sendfile(__dirname + '/action.html');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
