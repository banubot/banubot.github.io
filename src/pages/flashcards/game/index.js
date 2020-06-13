import React, { Component} from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet'
import styles from "../../../components/flashcards-container.module.css"

class Game extends Component {
    constructor(props) {
        super(props);
        this.words = props.words; 
        console.log(this.words);
        this.state = {
            count : 0,
            correct : 0,
            answerpos : 0,
            target : "",
            choices : [],
            msg : "",
            isRus : true
        } 
        this.chose(-1);
    }

    render() {
        return (
            <div>
                <button type="button" onClick={() => {this.setState({ isRus : ! this.state.isRus})}}>
                    рус - анг
                </button>
                <p id="score">
                    Score: {this.state.correct} / {this.state.count}
                </p>
                <h2 id="target">
                    {this.state.target}
                </h2>
                <div id="choices">
                    <div onClick={this.chose(0)}>
                        {this.state.choices[0]}
                    </div>
                    <div onClick={this.chose(1)}>
                        {this.state.choices[1]}
                    </div>
                    <div onClick={this.chose(2)}>
                        {this.state.choices[2]}
                    </div>
                    <div onClick={this.chose(3)}>
                        {this.state.choices[3]}
                    </div>
                </div>
            </div>
        );
    }
    
    chose(choice) {
        if (choice === -1) {
            this.setState({
                msg : "Choose the correct definition."
            });
        } else if (choice === this.state.answerpos) {
            this.setState({
                msg : "Hooray! You got it!", 
                correct : this.state.correct + 1
            });
        } else {
            this.setState({
                msg : "Wrong!"
            });
        }

        let card = this.words[rand(this.words.length)];
        let targ, ans;
        if (this.state.isRus) {
            targ = card.rus;
            ans = card.eng;
        } else {
            targ = card.eng;
            ans = card.rus;
        }

        this.setState({
            count : this.state.count + 1,
            answerpos : rand(4),
            target : targ
        });

        let i;
        for (i = 0; i < 4; i++) {
            if (this.state.answerpos === i) {
                this.choices[i] = ans;
            } else {
                card = this.words[rand(this.words.length)];
                if (this.state.isRus) {
                    this.choices[i] = card.eng;
                } else {
                    this.choices[i] = card.rus;
                }
            }
        }
    }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Game;