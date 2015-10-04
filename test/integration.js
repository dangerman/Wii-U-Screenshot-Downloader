var request = require('supertest');
var app = require('../server.js');
var expect = require('chai').expect;


describe('Upload page', function() {
  it('returns 400 error if not requested from Wii U', function(done) {
    request(app)
	  .get('/')
	  .set(userAgentForChrome)
	  .expect(400, done);
  });

  it('returns 200 if requested from Wii U', function(done) {
    request(app)
	  .get('/')
	  .set(userAgentForWiiU)
	  .expect(200, done);
  });

  it('has an upload button if requested from Wii U', function(done) {
    request(app)
	  .get('/')
	  .set(userAgentForWiiU)
	  .end(function(err, res) {
          	expect(res.text).to.have.string('file_upload');
		done();
	  });
  });

  it('doesn\'t have an upload button if not requested from Wii U', function(done) {
    request(app)
	  .get('/')
	  .set('userAgentForChrome')
	  .end(function(err, res) {
		  expect(res.text).to.not.have.string('file_upload');
		  done();
	  });
  });

})

var userAgentForWiiU = {'user-agent': 'Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.30 (KHTML, like Gecko) NX/3.0.4.2.11 NintendoBrowser/4.3.0.11224.EU'};
var userAgentForChrome = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'}; 
