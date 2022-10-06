import React from "react";
import styles from "./layout.module.css";
import Image from 'next/image'
import candy from '../assets/candy.png'

class Explanation extends React.Component {
    render() {
        if (this.props.show) {
            return (
                <div>
                    <h2><i>How to Win</i></h2>
                    <p>Annoyed that the computer beat you? Think it must have cheated? Nope! It was using
                        something known as <strong>Perfect Play</strong>, which makes you always win.</p>
                    <p>Then how do you win this game? Let&apos;s start from the end and work our way back to the beginning. You lost because you took the last candy—we can rephrase that as &quot;there was 1 candy remaining on your turn.&quot; So what would have happened if there had been <strong>2</strong> candies remaining on your turn? You would have taken 1 candy, leaving the computer with 1 candy, winning the game! What if there had been 3 candies left? You would have taken 2, and if there had been 4 candies, you would have taken 3. So 2, 3, and 4 are all winning numbers on your turn.</p>
                    <p>But what if you end up with 5 candies on your turn? It doesn&apos;t matter if you take 1, 2, or 3 candies: the computer always gets a winning number. So just like 1, you don&apos;t want to end up with 5 candies on your turn.</p>
                    <p>We can now work backwards, since we want to give the computer 5 candies. If you have 6 candies, you would take 1. If you have 7 candies, you would take 2. If you have 8 candies, you would take 3. So 6, 7, and 8 are all winning numbers, which makes 9 a losing number (try to get the computer down to 5 without giving it 6, 7, or 8.</p>
                    <p>The pattern is now becoming more clear: 1, 5, and 9 are all numbers you want to avoid to win. 10, 11, and 12, will all be winning numbers, while 13 will be a losing number. Starting with 1, every 4 numbers is a losing number.</p>
                    <p>Now, let&apos;s go the other direction: how many candies should you take each turn? To start, take candies so that the computer ends up with a losing number. Then, each turn, make sure it does down by a total of 4. If the computer takes 1, you take 3. If the computer takes 2, you take 2. And if the computer takes 3, you take 1. If you follow these steps, the computer can&apos;t win!</p>
                </div>
            );
        }
        return (
            <div>
                <h2><i>How to Play</i></h2>
                <p>The game of Nim starts with 20 stones on the table (candies on the computer). Each turn, a player takes 1, 2, or 3 items, and they <strong><em>must</em></strong> take at least 1. Whoever is forced to take the last candy loses the game, so try to make the computer take the last candy!</p>
            </div>
        );
    }
}


class Stone extends React.Component {
    render() {
        return (
            <div className={styles.stoneWrapper}>
                <Image src={candy} alt="" />
            </div>
        );

    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingStones: 20,
            playerTurn: true,
            lastTaken: null,
            firstTurn: true,
        };
    }

    removeStones = (count) => {
        this.setState(state => ({
            remainingStones: state.remainingStones - count,
            playerTurn: !state.playerTurn,
            lastTaken: count
        }));
    }

    resetGame = () => {
        this.setState({
            remainingStones: 20,
            playerTurn: true,
            lastTaken: null,
            firstTurn: false,
        });
    }

    perfectPlayChoice = (remStones) => {
        let remove;
        if (remStones % 4 == 1) {
            remove = Math.floor(Math.random() * 3 + 1);
        } else {
            remove = (remStones + 3) % 4;
        }
        this.removeStones(remove);
    }

    render() {
        if (this.state.remainingStones < 1) {
            return (
                <div>
                    <p>{this.state.playerTurn ? "You win!! Now go play this in person with your friends (and show them Perfect Play after you win a few times)." : "The computer wins :("}</p>
                    <button className={styles.nimButton} onClick={this.resetGame}>Start a New Game</button>
                </div>
            );
        }

        if (!this.state.playerTurn) {
            setTimeout(() => {
                this.perfectPlayChoice(this.state.remainingStones);
            }, 1000);
        }

        let stones = [];
        for (let i = 0; i < this.state.remainingStones; i++) {
            stones.push(<Stone />);
        }

        return (
            <div>
                <h1 className={styles.heading1}>Nim</h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <Explanation show={!this.state.firstTurn} />
                        <div className={styles.nimButtonHolder}>
                            <button className={styles.nimButton} disabled={!this.state.playerTurn} onClick={() => this.removeStones(1)}>Choose 1 candy this turn</button>
                            <button className={styles.nimButton} disabled={!this.state.playerTurn} onClick={() => this.removeStones(2)}>Choose 2 candies this turn</button>
                            <button className={styles.nimButton} disabled={!this.state.playerTurn} onClick={() => this.removeStones(3)}>Choose 3 candies this turn</button>
                        </div>
                        <p>There are currently {this.state.remainingStones} candies left.</p>
                        <p>{this.state.playerTurn ? "It's your turn" : "The computer is thinking..."}</p>
                        {this.state.lastTaken ? <p>{this.state.lastTaken} {this.state.lastTaken == 1 ? 'candy was' : 'candies were'} taken</p> : null}
                    </div>
                    <div className={styles.stoneBorder} >{stones}</div>
                </div>
            </div>
        );
    }
}

export default class Nim extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}