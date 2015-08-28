var express = require('express');
var jade = require('jade');
var multer = require('multer');
var qr = require('qr-image');
var fs = require('fs');

var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, './images/');
		},
		filename: function(req, file, cb) {
			cb(null, Date.now() + '.jpg');
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
	console.log('File uploaded:');
	console.log(file);
	var imageUrl = 'http://' + req.get('host') + '/' + file.filename;
	
	var qrCodeName = 'qr_'+file.filename;
	var qrCode = qr.image(imageUrl, {type: 'png'});
	qrCode.pipe(fs.createWriteStream('./images/'+qrCodeName));
	
	var removeImages = function() {
		console.log('Deleting files for image: ' + file.filename);
		fs.unlink(file.path, function(err) {
			if (err) throw err;
			console.log('Successfully deleted: ' + file.filename);
		});
		fs.unlink('images/'+qrCodeName, function(err) {
			if (err) throw err;
			console.log('Successfully deleted: ' + qrCodeName);
		});
	};
	var fiveMinutesInMilliseconds = 300000;
	setTimeout(removeImages, fiveMinutesInMilliseconds);

	res.render('link', {image: file.filename, qr: qrCodeName})
});

//404
app.use(function(req, res, next) {
	res.status(404).render('error',
		{message: 'Error 404 - Page not found >_<'});
});

//Handle other errors
app.use(function(err, req, res, next) {
	console.log("Error:");
	console.error(err.stack);
	res.status(500).render('error',
		{message: 'Error 500 - Something went wrong on the server >_<'});
});

var server = app.listen(1234, function() {
	console.log('Server listening at port 1234');
});
