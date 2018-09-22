var fs = require('fs');
var path = require('path');

var server = require('diet');

var app = server();
fs.stat(app.path+'/dev',function(err,stat){
	if (err === null){
		app.listen('localhost:8000');

	} else {
		app.listen('banubot.com');
		app.error(function($){
			$.end('ERROR500');
		});
	}
});
// allows you to use $.html(app.path + '/path/to/file')
// to render pages using ect templating
var ect = require('diet-ect-fix')({ path: app.path+'/views/' });
app.header(ect);

// serves static files like css, javascript and images
// though they're in a folder called static, from the client's point
// of view, they reside in the top level, so /static/foo.js would be
// <script type="javascript" src="/foo.js"></script> in the client

// this is what powers the entire kgb website, as the files are accessible at
// /kgb/myfile.html
var stat = require('diet-ecstatic')({path: app.path+'/static'});
app.footer(stat);

app.get('/flashcards/cards/:deck', function($){
	fs.readFile(path.join(app.path, 'flashcards/cards/', $.params.deck),'utf8',function(err,data){
		if (err) {
			throw err;
		}
		var rusArray = data.split('\n');
		rusArray.pop(); 

		fs.readFile(path.join(app.path, 'flashcards/cards/', $.params.deck + "k"),'utf8',function(err2,data){
			if (err2) {
				throw err2;
			}
			var engArray = data.split('\n');
			engArray.pop();
			var array = [];
			for (var i = 0; i < 10; i++) {
				array[i] = {
					front: rusArray[i], 
					back: engArray[i]
				};	
			}
			$.data = array;
			$.json();
			$.end();
		});
	});
});

app.get('/flashcards/cards/', function($){
	fs.readdir(path.join(app.path, 'flashcards/cards/'),function(err,files){
		if (err) {
			throw err;
		}
		$.data = files.filter(function(filename) {
			return !filename.endsWith('k');
		});
		//console.log(files);
		$.json();
		$.end();

	});
});

module.exports = app;
