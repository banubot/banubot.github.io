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
		var array = data.split('\n').map(function(line){
			line = line.split('|');
			return {
				front: line[1], 
				back: line[0]
			};				
		});
		array.pop(); //That's janky! The last card comes in as undef
		//bc of \n in last row
		$.data = array;
		$.json();
		$.end();
	});
});

app.get('/flashcards/cards/', function($){
	fs.readdir(path.join(app.path, 'flashcards/cards/'),function(err,files){
		if (err) {
			throw err;
		}
		$.data = files;
		$.json();
		$.end();

	});
});

module.exports = app;
