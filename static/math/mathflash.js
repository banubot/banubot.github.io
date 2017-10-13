function Card(front, back){
	/*A card is just a container that holds a front and back value! 
		- You can get either back or front by displaying it*/
	this.frontVal = front;
	this.backVal = back;
}
Card.prototype.display = function(side){
	if( side === 1 ){
		return this.frontVal;
	}else{
		return this.backVal;
	}
};

var cardsHandle = {
	cards: [],
	cardInd: 0,
	cardButton: document.getElementById("cardButton"),
	cardText: document.getElementById("cardText"),
	cardTPosition: document.getElementById("positionIndex"),
	cardSide: 1,

	cardAdd: function(back, front){
		this.cards.push( new Card(back, front) );
	},
	cardUpdate: function(){
		var curCard = this.cards[ this.cardInd ];
		this.cardText.innerHTML = curCard.display( this.cardSide );
		this.cardTPosition.innerHTML = (this.cardInd+1)+"/"+this.cards.length;
	},
	cardFlip: function(){
		this.cardSide = (this.cardSide + 1) % 2;
	},
	cardMove: function(moveBy){
		this.cardInd += moveBy;
		if( this. cardInd < 1 ){
			this.cardInd += this.cards.length;
		}
		this.cardInd = this.cardInd % this.cards.length;

		this.cardSide = 1;// Set back to front
		this.cardUpdate();
	},
	cardTap: function(){
		this.cardFlip();
		this.cardUpdate();// Display card
	},
	changeDeck: function(deck){
		this.cards = [];
		var self = this;
		deck.forEach(function(newCard){
			self.cardAdd(newCard.back,newCard.front);	
		});
		this.cardUpdate();
		this.cardInd = 0;
		this.cardSide = 1;
	}
};
cardsHandle.cardAdd("Click a deck name below to start! Click card to flip.","This is the back.");
cardsHandle.cardUpdate();

var userEnter = function(){
	var nFront = document.getElementById("newFront"),
		nBack = document.getElementById("newBack");

	if( nFront.value.isEmpty() || nBack.value.isEmpty() )
		return;

	cardsHandle.cardAdd(nFront.value,nBack.value);
	nFront.value="";
	nBack.value="";
	cardsHandle.cardUpdate();
};

cardsHandle.cardButton.addEventListener('click', function(){ cardsHandle.cardTap();} );

function getDecks() {
	$.getJSON('/math/flashcards/',function(data){
		renderDecks(data);
	});
}

function renderDecks(decks) {
	var htmlString = '';
	decks.forEach(function(deckName){
		htmlString += '<div id="cardname"><a href="#" onclick="getDeck(\''+ deckName +'\')"><img class="deck-icon" width="30" height="30" src="cards.png"/>'+ deckName +'</a></div>';
		var div = document.getElementById("getDeck");
		div.innerHTML = htmlString;
	});
	return htmlString;
}
function getDeck(deckName){
	$.getJSON('/math/flashcards/'+deckName,function(deck){	
		cardsHandle.changeDeck(deck);
	});
}

getDecks();
