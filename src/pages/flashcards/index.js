/* Hannah Parraga
 * Russian flashcards website with cards taken
 * from the 10000 most common words (I deleted ones I know)
 */
import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet'
import styles from "../../components/flashcards-container.module.css"

export default () => (
	<div>
		<Helmet>
    		<body className={styles.flashbod} />
		</Helmet>
		<Card />
	</div>
);

//2 sides for every card
function Sides(rus, eng) {
		this.eng = eng;
		this.rus = rus;
}

//The big white square with the words in it
class Card extends Component {
	//give properties to react component constructor
	constructor(props) {
		super(props);
	
		//references to the div where the
		//words are and the change card buttons
		//to change the text
		this.cardDiv = React.createRef();
		this.prev = React.createRef();
		this.nxt = React.createRef();
		this.lang = React.createRef();
		this.sort = React.createRef();

		//card text and position number text
		//goes in div
		this.state = {	
			cardTxt: "",
			posTxt: "0/0",
			decks: [],
		};
		
		//array of all possible cards
		this.cards = [];
		//current card index
		this.i = 0;
		//are we on the russian side? 
		//either bc rus side up or bc flipped
		this.rus = true;
		//card was flipped
		this.flipped = false;
		//already grabbed the cards from json?
		this.loaded = false;
		//don't sort more than once
		this.sorted = false;
		//storage for cards if decks
		this.all = [];
	}

	//put a new card in the master array
	add(rus, eng) {
		this.cards.push(new Sides(rus, eng));
	}

	//pick the rus or eng side of the card at 
	//current index and update the text
	update() {
		this.setState({
			cardTxt: this.rus ? this.cards[this.i].rus : this.cards[this.i].eng,
			posTxt: (this.i + 1) + "/" + this.cards.length
		});
	}

	//swap sides and update
	flip() {
		this.rus = !this.rus;
		this.flipped = !this.flipped;
		this.update();
	}

	//move the card index forward or back 
	next(amt) {
		if (this.cards.length > 0) {
			this.i = (this.i + amt) % this.cards.length;
			//wrap around
			if (this.i < 0) {
				this.i = this.cards.length - 1;
			}
			//if you flipped over the card last time,
			//this one shouldn't be flipped too
			this.flipdate();
		}
	}


	//flip sides before updating or no
	//for when deck or language changes
	flipdate() {
		if (this.flipped) {
			this.flip()
		} else {
			this.update();
		}
	}

	//take all the cars and split them into decks 
	//with 10 cards each
	deckify() {
		var i;
		//save all the cards so they can be grabbed when 
		//deck changes
		for (i = 0; i < this.cards.length; i++) {
			this.all.push(this.cards[i]);
		}
		//fill array with deck components
		var links = [];
		for (i = 10; i < this.all.length; i+=10) {
			links.push(<Deck name={i} key={i} cards={this}/>);
		}
		//go back to first deck
		this.changeDeck(10);
		this.setState({
			decks: links
		});
	}

	//change the card to be 10 cards from index - 10
	//to index
	changeDeck(index) {
		//empty current cards
		this.cards = [];
		var i;
		console.log("current deck: " + index);
		for (i = index - 10; i < index; i++) {
			this.cards.push(this.all[i]);
		}
		this.i = 0;
		this.flipdate();
	}
	
	//change all cards to be other language side up
	switchLang() {
		this.rus = !this.rus;
		this.update();
	}


	//load up all the cards from the json and add them 
	//to the array
	getCardInfo(data) {
		if (!this.loaded) {
			this.add("Нажмите карточку чтобы щелкать","Click card to flip");
			data.allTestJson.edges.forEach(item => {
				this.add(item.node.rus,item.node.eng);
			});
			this.loaded = true;
		}
	}

	//if this react component was made successfully
	//then add click handlers to the card div and buttons
	componentDidMount() {
		this.update();
		this.cardDiv.current.addEventListener('click', this) 
		//preserve who "this" is inside function
		var me = this;
		this.prev.current.onclick = function() {me.next(-1);};
		this.nxt.current.onclick = function() {me.next(1);};
		this.lang.current.onclick = function() {me.switchLang();};
		this.sort.current.onclick = function() {me.deckify();};
	}
	
	//card div was clicked
	handleEvent(e) {
	  this.flip()
	}

	//this is what card and buttons should look like
	//StaticQuery is the query to get the json info
	render() {
		return (
			<div>
				<center>
					<button type="button" className={styles.flip} ref={this.lang}>рус - анг</button>
					<br/>
					<button type="button" ref={this.prev}>прошлая</button>
					<p className={styles.pos}>{this.state.posTxt}</p>
					<button type="button" ref={this.nxt}>следующая</button>
					<div className={styles.cardText} ref={this.cardDiv}>
						{this.state.cardTxt}
					</div>
					<div>
						<button type="button" ref={this.sort}>сортировать</button>
						<br/>
						{this.state.decks}
					</div>
				</center>
				<StaticQuery
					query={
						graphql`
						  query CardQuery {
							allTestJson {
							  edges {
								node {
									rus
									eng
								}
							  }
							}
						  }
				`}
				render={data => (
					<div>
						{this.getCardInfo(data)}
					</div>
				)}
			  />
			</div>
		)
	}
}

//all the buttons that show up when you
//hit the sort button
//each deck will have 10 words in it just because 
//I think that's a pretty manageable amount of words
//to learn at once
class Deck extends Component {
	constructor(props) {
		super(props); 
		//each deck component has a reference to
		//the card component so it can tell the 
		//card comp. to change to its cards
		this.cards = props.cards;
		this.name = props.name;
		var me = this;
		//when this deck button is clicked,
		//change cards to cards of this deck
		this.func = function() {
			props.cards.changeDeck(me.name);
			window.scrollTo(0,0);
		};
	}
	
	//each has a deck pic and the number
	render() {
		return (
			<div className={styles.deck} onClick={this.func}>
				<img src="../cards.png" alt="deck"/>
				<div className={styles.deckName}>{this.name}</div>
			</div>
		)
	}
}
