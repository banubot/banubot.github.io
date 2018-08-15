// the width and height of the game viewport
const WIDTH = 800;
const HEIGHT = 590;
const canny = document.getElementById("canny");
let ctx = canny.getContext('2d');
const grasses = [];
const foxes = [];

function Bun() {
	this.x = 0;
	this.y = 0;
	this.sprite = document.getElementById("bun");
	document.addEventListener('mousemove', evt => {
		this.x = evt.clientX;
		this.y = evt.clientY;
		draw(this);
	});
	document.addEventListener('touchmove', evt => {
		this.x = evt.clientX;
		this.y = evt.clientY; /*UH this might not exist*/
		draw(this);
	});
}

function draw(elem) {
	ctx.drawImage(elem.sprite, elem.x, elem.y);
}

const Fox = {

}


function GameState() {
	let lives = 3;
	let score = 0;

	const button = document.getElementById('restart');

	const startScreen = document.getElementById('start');
	const endScreen = document.getElementById('over');

	const scoreBoard = document.getElementById('score');

	const scoreJumbo = document.getElementById('jumbo-score');

	// game starts
	button.onclick = startGame;

	function startGame () {
		lives = 3;
		score = 0;
		scoreBoard.innerHTML = 'Score: '+ score;
		foxes.start();
		grasses.start();
		bun.Ready();
		startScreen.className = 'hide';
		endScreen.className = 'hide';
	}

	function endGame () {
		endScreen.className = '';
		scoreJumbo.innerHTML = score;
		scoreBoard.innerHTML = '';
	}

	const Life = Cute ({
		draw: function (ctx) {
			let sprite = document.getElementById('bunnunu');
			ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height,
						  0, 0, this.w, this.h);
		}
	});

	const lifeSprites = [
		Life({
			x: WIDTH - 95,
			y: HEIGHT - 45,
			w: 30, 
			h: 39
		}),

		Life({
			x: WIDTH - 65,
			y: HEIGHT - 45,
			w: 30, 
			h: 39
		}),
		
		Life({
			x: WIDTH - 35,
			y: HEIGHT - 45,
			w: 30, 
			h: 39
		})
	];

	this.drawlives = function () {
		for (const life of lifeSprites) {
			// erase the lives
			life.erase();
		}
		// draw however many lives remain
		for (let i = 0; i < lives; i++){
			lifeSprites[i].draw();
		}
	};

	this.addPoints = function() {
		if (!bun.eaten) {
			score++;
			scoreBoard.innerHTML = 'Score: '+ score;
		}
	};
	this.dead = function() {
		lives -= 1;
		foxes.stop();
		grasses.stop();
		// game ends
		if (lives === 0) {
			endGame();
		}
		return lives;
	};

	this.start = startGame;
}

const gameState = new GameState();

const foxes = new Foxes();

const grasses = new Grasses();

const bun = Bunny({
	x: 400,
	y: 400,
	w: 70,
	h: 91 
});

let high_scores; 

$.get( '/buns/highscore/', function( data ) {
	high_scores = data;
});

function postScore (name, score) {
	$.post('/buns/highscore/', {name: name, score: score}, function (data) {
		console.log(data);
	});
}

function buildTable (scores) {
	let html = '<table id="scores">';
	for (const score of scores) {
		html += '<tr><td>' + score.name + '</td><td>' + score.score + '</td></tr>';
	}
	html += '</table>';
}

// before the start the program there is no "last time"
let last_time = null;

/*
 * Params: time: system time
 * 	time comes from requestAnimationFrame and is a unique value which represents execution time,
 * Returns: None
 * The function which fires every frame, updating all the components of the game
 * every 1/60th of a second.
 *
 * Updates and draws the bun, foxes, and gameState
 */
function step(time) {
	// requestAnimationFrame asks the window to call the function 'step' later
	window.requestAnimationFrame(step);
	const elapsed = time - last_time;
	last_time = time;
	// checks to see if we've dropped significantly below 60 frames per second
	if (elapsed > 25) {
		console.log('slowed down! ' + elapsed);
	}

	grasses.update(elapsed);
	foxes.update(elapsed);
	bun.update(elapsed);
	bun.erase();
	bun.draw();

	gameState.drawlives();
}
// start the program
window.requestAnimationFrame(step);
