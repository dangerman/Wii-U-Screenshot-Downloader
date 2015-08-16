var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello World!');
});

var server = app.listen(1234, function() {
	console.log('Server listening at port 1234');
});
