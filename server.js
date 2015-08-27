var express = require('express');
var jade = require('jade');
var multer = require('multer');
var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, './images/');
		},
		filename: function(req, file, cb) {
			cb(null, Date.now() + '.png');
		}
})
var upload = multer({storage: storage});

var app = express();
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('images'));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/', upload.single('image'), function(req, res) {
	var file = req.file;
	console.log(file);
	res.render('link', {file: file.filename})
});

var server = app.listen(1234, function() {
	console.log('Server listening at port 1234');
});
