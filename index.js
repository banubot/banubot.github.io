var fs = require('fs')
const server = require('diet');
function main () {
	var app = server();
	fs.stat(app.path+'/dev',function(err,stat){
		if (err === null){
			app.listen('localhost:8000');

		} else {
			app.listen('banubot.com')
			app.error(function($){
				$.end('ERROR500')
			})
		}
	})
	console.log(app.path)
	// allows you to use $.html(app.path + '/path/to/file')
	// to render pages using ect templating
	const ect = require('diet-ect')({ path: app.path+'/views/' });
	app.header(ect);

	// serves static files like css, javascript and images
	// though they're in a folder called static, from the client's point
	// of view, they reside in the top level, so /static/foo.js would be
	// <script type="javascript" src="/foo.js"></script> in the client
	var stat = require('diet-static')({path: app.path+'/static/'});
	app.footer(stat);

	// extremely low level way to serve a web page
	app.get('/buns/', function($){
		$.header('content-type', 'text/html') // tells client to render sent page as HTML
		fs.readFile(app.path+'/static/buns/index.html', 'utf8', function (err,data) {
			if (err) throw err;
			$.end(data)
		});
	})

	// reads in scores "database" and sends it to the client
	app.get('/buns/highscore/', function($){
		fs.readFile(app.path+'/buns/scores.json','utf8',function(err,data){
			if (err) {
				throw err;
			}
			$.data = JSON.parse(data);
			$.json();
			$.end();
		})
	});

	// reads in scores database, attempts to insert a new score and rewrites scores database
	app.post('/buns/highscore/', function($){
		fs.readFile(app.path+'/buns/scores.json','utf8',function(err,data){
			if (err) throw err;
			const scores = JSON.parse(data);
			const new_score = $.body.score;
			const name = $.body.name;
			scores.push({
				name: name,
				score: new_score 
			});
			scores.sort(function (a, b) {
				return a.score - b.score;
			});
			const new_scores = scores.slice(5);
			fs.writeFile(app.path+'/buns/scores.json', JSON.stringify(new_scores), 'utf8', function(err) {
				if (err) throw err;
				$.success();
				$.end();
			})
		});
	});
}
module.exports = main;

if (require.main === module) {
	main()
}


