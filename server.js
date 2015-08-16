var express = require('express');
var jade = require('jade');

var app = express();
app.set('view engine', 'jade');
app.set('views', './views');


app.get('/', function(req, res) {
	res.render('index');
	//res.send('Hello World!');
});

var server = app.listen(1234, function() {
	console.log('Server listening at port 1234');
});
