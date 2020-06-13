import React, { Component } from "react"
import styles from "../../components/flashcards-container.module.css"

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
                <img src="../cards.png" alt="deck" className={styles.cardPic}/>
                <div className={styles.deckName}>{this.name}</div>
            </div>
        )
    }
}

export default Deck; 