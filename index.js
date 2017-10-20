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
var ect = require('diet-ect')({ path: app.path+'/views/' });
app.header(ect);

// serves static files like css, javascript and images
// though they're in a folder called static, from the client's point
// of view, they reside in the top level, so /static/foo.js would be
// <script type="javascript" src="/foo.js"></script> in the client

// this is what powers the entire kgb website, as the files are accessible at
// /kgb/myfile.html
var stat = require('diet-static')({path: app.path+'/static/'});
app.footer(stat);

// extremely low level way to serve a web page
app.get('/buns/', function($){
	$.header('content-type', 'text/html'); // tells client to render sent page as HTML
	fs.readFile(app.path+'/static/buns/index.html', 'utf8', function (err,data) {
		if (err) throw err;
		$.end(data);
	});
});

// reads in scores "database" and sends it to the client
app.get('/buns/highscore/', function($){
	fs.readFile(app.path+'/buns/scores.json','utf8',function(err,data){
		if (err) {
			throw err;
		}
		$.data = JSON.parse(data);
		$.json();
		$.end();
	});
});

app.get('/kgb/flashcards/:deck', function($){
	fs.readFile(path.join(app.path, 'flashcards', $.params.deck),'utf8',function(err,data){
		if (err) {
			throw err;
		}
		var array = data.split('\n').map(function(line){
			line = line.split(',');
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

app.get('/kgb/flashcards/', function($){
	fs.readdir(path.join(app.path, 'flashcards'),function(err,files){
		if (err) {
			throw err;
		}
		$.data = files;
		$.json();
		$.end();

	});
});

app.get('/math/flashcards/', function($){
	fs.readdir(path.join(app.path, 'static/math/cards'),function(err,files){
		if (err) {
			throw err;
		}
		$.data = files;
		$.json();
		$.end();

	});
});

app.get('/math/flashcards/:deck', function($){
	fs.readFile(path.join(app.path, 'static/math/cards', $.params.deck),'utf8',function(err,data){
		if (err) {
			throw err;
		}
		var array = data.split('\n').map(function(line){
			line = line.split(',');
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

// reads in scores database, attempts to insert a new score and rewrites scores database
app.post('/buns/highscore/', function($){
	fs.readFile(app.path+'/buns/scores.json','utf8',function(err,data){
		if (err) throw err;
		var scores = JSON.parse(data);
		var new_score = $.body.score;
		var name = $.body.name;
		scores.push({
			name: name,
			score: new_score 
		});
		scores.sort(function (a, b) {
			return a.score - b.score;
		});
		var new_scores = scores.slice(5);
		fs.writeFile(app.path+'/buns/scores.json', JSON.stringify(new_scores), 'utf8', function(err) {
			if (err) throw err;
			$.success();
			$.end();
		});
	});
});

module.exports = app;
