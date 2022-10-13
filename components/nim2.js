import React from "react";
import styles from "./layout.module.css";
import Image from 'next/image'
import candy from '../assets/candy.png'
import Link from "next/link";
import dynamic from "next/dynamic";

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)


class Explanation extends React.Component {
    render() {
        if (this.props.show) {
            return (
                <div>
                    <h2><i>How to Win</i></h2>
                    <p>Did you figure out how it works? In case you didn&apos;t, here&apos;s the answer: unlike the standard version, you win if you take the last candy. Another way to say that is that you lose if there are no candies left on your turn. What if there are 1, 2, or 3 candies on your turn? Obviously, you would take them all, winning the game.</p>
                    <p>But what if there are 4 candies on your turn? If you take 1, the computer takes 3 and wins. If you take 2, the computer also takes 2 and wins. And if you take 3, the computer takes just 1 and wins. You can&apos;t win! So you <em>must</em> avoid 4 to win. That means that 5, 6, or 7 are all good numbers, since you can always force the computer to have 4 (and lose). The next bad number is 8, since no matter what you pick, the computer will get 5, 6, or 7 and make you lose with 4. Bad numbers are 0, 4, 8... see the pattern? Start a new game and try to win!</p>
                </div>
            );
        }
        return (
            <div>
                <h2><i>How to Play</i></h2>
                <p>You should already know how to play the <Link href="/games/nim"><a>standard game of Nim</a></Link> (if not, play that first). In this variation, you <em>want</em> to take the last candy. Note: you can still take 1, 2, or 3 candies per turn, so if any those numbers are left, you can take the remaining and win the game. See if you can work backwards to figure out the solution for this one, too!</p>
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
            remainingStones: 25,
            playerTurn: true,
            lastTaken: null,
            firstTurn: false,
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
            remainingStones: 25,
            playerTurn: true,
            lastTaken: null,
            firstTurn: false,
        });
    }

    perfectPlayChoice = (remStones) => {//reset perfect logic
        let remove;
        if (remStones % 4 == 0) {
            remove = Math.floor(Math.random() * 3 + 1);
        } else {
            remove = (remStones) % 4;
        }
        this.removeStones(remove);
    }

    render() {
        if (this.state.remainingStones < 1) {
            return (
                <div>
                    <p>{!this.state.playerTurn ? "You win!! Now go play this in person with your friends (and show them Perfect Play after you win a few times)." : "The computer wins :("}</p>
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
            <div className={styles.vertical}>
                <h1>Nim</h1>
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
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}

export default class Nim2 extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}