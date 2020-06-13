import React, { Component} from "react"
import Helmet from 'react-helmet'
import styles from "../../components/flashcards-game-container.module.css"

let data = require('../../data/Test.json')

class Game extends Component {
    constructor(props) {
        super(props);
        this.words = [];
        let i;
        for (i=0; i < data.length; i++) {
            this.words.push(data[i]);
        }
        
        
        this.state = {
            count : -1,
            correct : 0,
            answerpos : 0,
            lastpos : 0,
            target : "",
            choices : ["1","2","3","4"],
            msg : "",
            isRus : true
        } 
        this.chose = this.chose.bind(this);
        this.switchLang = this.switchLang.bind(this);
    }

    switchLang() {
        console.log("meow")
        console.log(this.state.isRus)
        this.setState({ isRus : ! this.state.isRus})
        this.chose(-1);
    }

    render() {
        return (
            <center>
                <Helmet>
					<body className={styles.flashbod} />
				</Helmet>
                <p id={styles.score}>
                    Score: {this.state.correct} / {this.state.count}
                </p>
                <button type="button" className={styles.flip} onClick={this.switchLang}>
                    рус - анг
                </button>
                <p id={styles.msg}>
                    {this.state.msg}
                </p>
                <h2 id={styles.target}>
                    {this.state.target}
                </h2>
                <div id="choices">
                    <div className={styles.choice} onClick={() => this.chose(0)}>
                        {this.state.choices[0]}
                    </div>
                    <div className={styles.choice} onClick={() => this.chose(1)}>
                        {this.state.choices[1]}
                    </div>
                    <div className={styles.choice} onClick={() => this.chose(2)}>
                        {this.state.choices[2]}
                    </div>
                    <div className={styles.choice} onClick={() => this.chose(3)}>
                        {this.state.choices[3]}
                    </div>
                </div>
            </center>
        );
    }
    
    componentDidMount() {
        this.chose(-1);
    }

    chose(choice) {
        console.log("choice" + choice + "ans" + this.state.lastpos)
        if (choice === -1) {
            this.setState({
                msg : "выберите правильное определение"
            });
        } else if (choice === this.state.lastpos) {
            this.setState({
                msg : "ура правильно!", 
                correct : this.state.correct + 1
            });
        } else {
            this.setState({
                msg : "неправильно!"
            });
        }
        
        let card = this.words[rand(this.words.length)];
        console.log(card)
        let targ, ans;
        if (this.state.isRus) {
            targ = card.rus;
            ans = card.eng;
        } else {
            targ = card.eng;
            ans = card.rus;
        }
        console.log(targ);
        this.setState({
            count : this.state.count + 1,
            lastpos: this.state.answerpos,
            answerpos : rand(4),
            target : targ
        });

        let i;
        for (i = 0; i < 4; i++) {
            if (this.state.answerpos === i) {
                this.state.choices[i] = ans;
            } else {
                card = this.words[rand(this.words.length)];
                if (this.state.isRus) {
                    this.state.choices[i] = card.eng;
                } else {
                    this.state.choices[i] = card.rus;
                }
            }
        }
    }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Game;