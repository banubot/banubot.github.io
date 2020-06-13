import React, { Component } from "react"
import { Link } from "gatsby"
import Deck from './Deck'
import styles from "../../components/flashcards-container.module.css"

let data = require('../../data/Test.json')

//The big white square with the words in it
class Card extends Component {
    //give properties to react component constructor
    constructor(props) {
        super(props);
        this.cards = [];
        let i;
        for (i=0; i < data.length; i++) {
            this.cards.push(data[i]);
        }
        
        //card text and position number text
        //goes in div
        this.state = {
            decks: []
        };
        this.goTo = null;
        this.cardDiv = null;
        this.posDiv = null
        //array of all possible cards
        //current card index
        this.i = 0;
        //are we on the russian side? 
        //either bc rus side up or bc flipped
        this.isRus = true;
        //card was flipped
        this.flipped = false;
        
        //don't sort more than once
        this.sorted = false;
        //storage for cards if decks
        this.all = [];

        this.update = this.update.bind(this);
        this.flip = this.flip.bind(this);
        this.next = this.next.bind(this);
        this.switchLang = this.switchLang.bind(this);
        this.deckify = this.deckify.bind(this);
        this.goToPos = this.goToPos.bind(this);

    }

    //pick the rus or eng side of the card at 
    //current index and update the text
    update() {
        if (this.cardDiv !== null) {
            this.cardDiv.innerHTML = this.isRus ? this.cards[this.i].rus : this.cards[this.i].eng;
            this.posDiv.innerHTML = (this.i + 1) + "/" + this.cards.length;
        }
    }

    //swap sides and update
    flip() {
        this.isRus = !this.isRus;
        this.flipped = !this.flipped;
        this.update();
    }

    //move the card index forward or back 
    next(amt) {
        this.i = (this.i + amt) % this.cards.length;
        //wrap around
        if (this.i < 0) {
            this.i = this.cards.length - 1;
        }
        //if you flipped over the card last time,
        //this one shouldn't be flipped too
        this.flipdate();
        
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
        this.setState({decks : links})
    }

    //change the card to be 10 cards from index - 10
    //to index
    changeDeck(index) {
        //empty current cards
        this.cards = [];
        var i;
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

    goToPos() {
        this.i = parseInt(this.goTo.value) - 1;
        this.update();
    }

    //if this react component was made successfully
    //then add click handlers to the card div and buttons
    componentDidMount() {
       this.cardDiv = document.getElementById("cardDiv");
       this.posDiv = document.getElementById("posText");
       this.decks = document.getElementById("decks");
       this.goTo = document.getElementById("goInput");
       this.update();
    }

    //this is what card and buttons should look like
    //StaticQuery is the query to get the json info
    render() {
        return (
            <div>
                <center>
                    <button type="button" className={styles.flip} onClick={this.switchLang}>рус - анг</button>
                    <br/>
                    <button type="button" onClick={() => this.next(-1)}>прошлая</button>
                    <p className={styles.pos} id="posText"></p>
                    <button type="button" onClick={() => this.next(1)}>следующая</button>
                    <div className={styles.cardText} id="cardDiv" onClick={this.flip}>
                    </div>
                    <div>
                        <input type="number" id="goInput" defaultValue="1" min="1" max={this.cards.length}/>
                        <button type="button" onClick={this.goToPos}>давай!</button>
                        <button type="button" onClick={this.deckify}>сортировать</button>
                        <Link to="/game/">
                            <button type="button">
                                игра
                            </button>
                        </Link>
                        <br/>
                    <div id="decks">
                        {this.state.decks}
                    </div>
                    </div>
                </center>
            </div>
        )
    }

    // render() {
    //     return this.state.content;
    // }
}

export default Card;