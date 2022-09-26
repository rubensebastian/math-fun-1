import React from "react";
import styles from "./layout.module.css";

let deck = [
    -12, -12,
    -11, -11,
    -10, -10,
    -9, -9,
    -8, -9,
    -7, -7,
    -6, -6,
    -5, -5,
    -4, -4,
    -3, -3,
    -2, -2,
    -1, -1,
    0, 0, 0, 0,
    1, 1,
    2, 2,
    3, 3,
    4, 4,
    5, 5,
    6, 6,
    7, 7,
    8, 8,
    9, 9,
    10, 10,
    11, 11,
    12, 12
];

let deckCopy = [
    -12, -12,
    -11, -11,
    -10, -10,
    -9, -9,
    -8, -9,
    -7, -7,
    -6, -6,
    -5, -5,
    -4, -4,
    -3, -3,
    -2, -2,
    -1, -1,
    0, 0, 0, 0,
    1, 1,
    2, 2,
    3, 3,
    4, 4,
    5, 5,
    6, 6,
    7, 7,
    8, 8,
    9, 9,
    10, 10,
    11, 11,
    12, 12
];

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={this.props.hide ? styles.cardHidden : styles.card}>{this.props.value}</div>
        );
    }
}

class Holder extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.cardHolderBlue}>
                    <Card value={this.props.valueOne} />
                    <p>X</p>
                    <Card value={this.props.valueTwo} hide={this.props.hideCard} />
                    <p>Other value is {this.props.hideCard ? "?" : this.props.valueOne * this.props.valueTwo}</p>
                </div>
                <div>
                    <div className={styles.cardHolderRed}>
                        <Card value={this.props.valueThree} />
                        <p>X</p>
                        <Card value={this.props.valueFour} />
                        <p>Your value is {this.props.valueThree * this.props.valueFour}</p>
                    </div>
                    <div className={styles.horizontal}>
                        <button onClick={() => this.props.swap("Left")} className={styles.btn}>Swap left card for hidden</button>
                        <button onClick={() => this.props.swap("Right")} className={styles.btn}>Swap right card for hidden</button>
                        <button onClick={() => this.props.swap("Null")} className={styles.btn}>Keep current cards</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTurn: true,
            cardValues: [null, null, null, null],
            taken: true,
            winner: null,
            hideCard: false,
            playerPoints: 0,
            computerPoints: 0,
        }
    }

    swapCards = (id) => {//the hidden card is carValue[1]
        let playerAdd = 0;
        let computerAdd = 0;
        if (this.state.taken) return;
        let arrayCopy = [...this.state.cardValues];
        let hiddenCopy = arrayCopy[1];
        if (id == "Left") {
            arrayCopy[1] = arrayCopy[2]
            arrayCopy[2] = hiddenCopy;
        }
        if (id == "Right") {
            arrayCopy[1] = arrayCopy[3]
            arrayCopy[3] = hiddenCopy;
        }
        if (arrayCopy[0] * arrayCopy[1] > arrayCopy[2] * arrayCopy[3]) {
            computerAdd++;
        }
        if (arrayCopy[0] * arrayCopy[1] < arrayCopy[2] * arrayCopy[3]) {
            playerAdd++;
        }
        this.setState(state => ({
            taken: true,
            hideCard: false,
            cardValues: arrayCopy,
            playerPoints: state.playerPoints + playerAdd,
            computerPoints: state.computerPoints + computerAdd,
        }));
        if(deck.length == 52){//deck gets reset before this function runs, so this is when the deck is "empty"
            if(this.state.playerPoints > this.state.computerPoints){
                this.setState({winner: "You win!"})
            }
            if(this.state.playerPoints < this.state.computerPoints){
                this.setState({winner: "Computer wins..."})
            }
            if(this.state.playerPoints == this.state.computerPoints){
                this.setState({winner: "Tie Game"})
            }
        }
    }

    getValue = () => {
        let selection = Math.floor(Math.random() * deck.length);
        let tempValue = deck[selection];
        deck.splice(selection, 1);
        return tempValue;
    }

    fillCards = () => {
        let values = [this.getValue(), this.getValue(), this.getValue(), this.getValue()];

        if(this.state.winner){
            this.setState({
                winner: null,
                playerPoints: 0,
                computerPoints: 0,
            })
        }

        this.setState({
            cardValues: values,
            firstTurn: false,
            taken: false,
            hideCard: true,
        });
        if (deck.length <= 0) {
            deck = [...deckCopy];
            this.setState({ firstTurn: true });
        }

    }

    render() {
        return (
            <div className={styles.vertical}>
                <h1>The Casino Always Wins</h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>How to Play</h2>
                        <p>To get started, select the <strong>Start a new game</strong> button below. The cards in the blue box on top are the computer's, and the cards in the red box on the bottom are yours. To figure out your score, multiply your two cards togther (values range from -12 to 12). Whoever has the higher score wins that round.</p>
                        <p>But wait! There's a twist. Each turn, before scores are calculated, you can swap one of your cards with the computer's hidden card. But should you? Try starting a new game. Your current score is calculated, but what could is oponent's score? Figure out what values of the hidden card would cause you to win or lose. Hint: one range of values makes you win, while one range makes you lose. Then, imagine swapping each of your cards for the hidden card in turn—the computer now has a set value, while yours is unknown. Figure out what ranges of values makes you win or lose. To give yourself the best chance of winning, pick the option with the biggest range of winning numbers.</p>
                        <h3>Card Counting</h3>
                        <p>Want to be even better at this game? You'll need to count cards (<em>NEVER</em> do this in a real casino). For example, what if you figure out that a positive number hidden card makes you win, while a negative number makes you lose, but most of the cards that have already been used are positive? Then a negative number is more likely to be remaining, so your chances are not 50% like you thought. For reference, the deck has 2 of each number (except 4 0s), and the game lasts 13 rounds.</p>
                        <button disabled={!this.state.taken} className={styles.btn} onClick={this.fillCards}>{this.state.firstTurn ? "Start a new game" : "Go to next turn"}</button>
                        <p>Your Score: {this.state.playerPoints} || Computer Score: {this.state.computerPoints}</p>
                        <p>{this.state.winner}</p>
                    </div>
                    <div>
                        <Holder valueOne={this.state.cardValues[0]} valueTwo={this.state.cardValues[1]} valueThree={this.state.cardValues[2]} valueFour={this.state.cardValues[3]} swap={this.swapCards} hideCard={this.state.hideCard} />
                    </div>
                </div>
            </div>
        );
    }
}