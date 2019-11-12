// the width and height of the game viewport
const WIDTH = 800;
const HEIGHT = 590;
const canny = document.getElementById("canny");
let ctx = canny.getContext('2d');
const grasses = [];
let foxSpeed = 3;
let foxes = [];
let playing = true;
const bun = new Bun();
let lives = 3;
const score = document.getElementById("score");
let points = 0;

window.requestAnimationFrame = window.requestAnimationFrame
                               || window.mozRequestAnimationFrame
                               || window.webkitRequestAnimationFrame
                               || window.msRequestAnimationFrame
                               || function(f){return setTimeout(f, 1000/60)};

function populate() {
	for (let i = 0; i < 10; i++) {
		foxes.push(new Fox(i));
	} 
}

function Bun() {
	this.x = 0;
	this.y = 0;
	this.sprite = document.getElementById("bun");
	document.addEventListener('mousemove', evt => {
		this.x = evt.clientX;
		this.y = evt.clientY;
		ctx.clearRect(x, y, 40, 40);
		ctx.drawImage(this.sprite, this.x, this.y);
	});
/*	document.addEventListener('touchmove', evt => {
		this.x = evt.clientX;
		this.y = evt.clientY; UH this might not exist
		draw(this);
	});
*/
}


function Fox(columnNum) {
	this.y = HEIGHT;
	this.x = (WIDTH / (columnNum * 10)) + 5;
	this.speed = foxSpeed + Math.random(4);
	this.columnNum = columnNum;
	this.sprite = document.getElementById("fox");

	function update() {
		ctx.clearRect(this.x, this.y, 10, 10);
		this.y -= this.speed;
		if (this.y < 0) {
			foxes.splice(indexOf(this), 1);
			points++;
		} else {
			ctx.drawImage(this.sprite, this.x, this.y);
		}
	}
}

function start() {
	//get rid of opening text
	document.getElementById("start").setAttribute("class","hide");
	//draw three lives in corner
	ctx.drawImage(bun.sprite, 2, 5, 10, 10); 
	ctx.drawImage(bun.sprite, 14, 5, 10, 10); 	
	ctx.drawImage(bun.sprite, 26, 5, 10, 10); 
	populate();
	requestAnimationFrame(run);
}

function run() {
	if (playing) {
		for (let i = 0; i < foxes.length; i++) {
			foxes[i].update();
			if (collision(foxes[i])) {
				loseLife();
			}
		}
		score.innerHTML = points;
		requestAnimationFrame(run);
	}
}

function collision(fox) {
	//twiggity tweak
	if (fox.x - bun.x < 10 && fox.y - bun.y < 10) {
		return true;
	}
	return false;
}

/*redo for dead bun what not*/
function loseLife() {
	lives--;
	if (lives === 2) {
		ctx.clearRect(26, 5, 10, 10);
	} else if (lives === 1) {
		ctx.clearRect(14, 5, 10, 10);
	} else {
		ctx.clearRect(2, 5, 10, 10);
		gameOver();
		return;
	}
	for (let i = 0; i < foxes.length; i++) {
		ctx.clearRect(foxes[i].x, foxes[i].y, 10, 10);
	}
	foxes = [];
	populate();
	foxSpeed = 0;
}

function gameOver() {
	playing = false;
	delete bun;
	for (let i = 0; i < foxes.length; i++) {
		ctx.clearRect(foxes[i].x, foxes[i].y, 10, 10);
	}
	document.getElementById("jumboScore").innerHTML = score;
	score.setAttribute("class", "hide");
	document.getElementById("over").setAttribute("class", "");
}

function restart() {
	points = 0;
}
