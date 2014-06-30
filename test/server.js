var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/..'));
app.post('/test/action.html', function (req, res) {
    res.sendfile(__dirname + '/action.html');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
