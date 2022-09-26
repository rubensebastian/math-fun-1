import React from "react";
import styles from "./layout.module.css";

class Checker extends React.Component {
    render() {
        if (this.props.color === null) {
            return (
                <div className={styles.checkerEmpty}></div>
            );
        }

        if (this.props.color === 'red') {
            return (
                <div className={styles.checkerRed}></div>
            );
        }

        if (this.props.color === 'yellow') {
            return (
                <div className={styles.checkerYellow}></div>
            );
        }
    }
}

export default class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yellowTurn: true,
            gameStatus: [
                [null, null, null, null, null, null],//Column 0
                [null, null, null, null, null, null],//Columm 1
                [null, null, null, null, null, null],//Columm 2
                [null, null, null, null, null, null],//Columm 3
                [null, null, null, null, null, null],//Columm 4
                [null, null, null, null, null, null],//Columm 5
                [null, null, null, null, null, null],//Columm 6
            ],
            winner: null,
        }
    }

    renderChecker = (col, row) => {
        return (
            <Checker color={this.state.gameStatus[col][row]} />
        )
    }

    dropChecker = (column) => {
        if (this.state.gameStatus[column][5] !== null || this.state.winner != null) {
            return;
        }
        for (let i = 0; i < 6; i++) {
            if (this.state.gameStatus[column][i] === null) {
                let gameStatusCopy = this.state.gameStatus;
                gameStatusCopy[column][i] = this.state.yellowTurn ? 'yellow' : 'red';
                this.setState(state => ({
                    gameStatus: gameStatusCopy,
                    yellowTurn: !state.yellowTurn
                }));
                this.checkWin(column, i);
                return;
            }
        }
    }

    checkWin = (col, row) => {
        let winner = null;

        if (col + 3 < 7 && row + 3 < 6) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col + 1][row + 1] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 2][row + 2] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 3][row + 3]) {
                winner = this.state.gameStatus[col][row];//diagonally up and right
            }
        }
        if (col + 3 < 7) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col + 1][row] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 2][row] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 3][row]) {
                winner = this.state.gameStatus[col][row];//right
            }
        }
        if (col + 3 < 7 && row - 3 >= 0) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col + 1][row - 1] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 2][row - 2] && this.state.gameStatus[col][row] == this.state.gameStatus[col + 3][row - 3]) {
                winner = this.state.gameStatus[col][row];//diagonally down and right
            }
        }
        if (row - 3 >= 0) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col][row - 1] && this.state.gameStatus[col][row] == this.state.gameStatus[col][row - 2] && this.state.gameStatus[col][row] == this.state.gameStatus[col][row - 3]) {
                winner = this.state.gameStatus[col][row];//down
            }
        }
        if (col - 3 >= 0 && row - 3 >= 0) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col - 1][row - 1] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 2][row - 2] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 3][row - 3]) {
                winner = this.state.gameStatus[col][row];//diagonally down and left
            }
        }
        if (col - 3 >= 0) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col - 1][row] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 2][row] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 3][row]) {
                winner = this.state.gameStatus[col][row];//left
            }
        }
        if (col - 3 > 0 && row + 3 < 6) {
            if (this.state.gameStatus[col][row] == this.state.gameStatus[col - 1][row + 1] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 2][row + 2] && this.state.gameStatus[col][row] == this.state.gameStatus[col - 3][row + 3]) {
                winner = this.state.gameStatus[col][row];//diagonally up and left
            }
        }

        this.setState({ winner: winner })
    }

    reset = () => {
        this.setState({
            yellowTurn: true,
            gameStatus: [
                [null, null, null, null, null, null],//Column 0
                [null, null, null, null, null, null],//Columm 1
                [null, null, null, null, null, null],//Columm 2
                [null, null, null, null, null, null],//Columm 3
                [null, null, null, null, null, null],//Columm 4
                [null, null, null, null, null, null],//Columm 5
                [null, null, null, null, null, null],//Columm 6
            ],
            winner: null,
        })
    }

    render() {
        let dropRow = [];
        for (let i = 0; i < 7; i++) {
            let checkerDrop = <div className={styles.checkerDropContainer}><button className={styles.checkerDrop} onClick={click => this.dropChecker(i)}>
                {this.state.gameStatus[i][5] === null ? '↓' : 'X'}
            </button></div>;
            dropRow.push(checkerDrop);
        }
        return (
            <div className={styles.vertical}>
                <h1>4 Circles in a Row</h1>
                <div className={styles.horizontalSplit}>
                    <div>
                        <div className={styles.checkerDropRowContainer}>
                            <div className={styles.checkerDropRow}>
                                {dropRow}
                            </div>
                        </div>
                        <div className={styles.checkerGame}>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 5)}
                                {this.renderChecker(1, 5)}
                                {this.renderChecker(2, 5)}
                                {this.renderChecker(3, 5)}
                                {this.renderChecker(4, 5)}
                                {this.renderChecker(5, 5)}
                                {this.renderChecker(6, 5)}
                            </div>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 4)}
                                {this.renderChecker(1, 4)}
                                {this.renderChecker(2, 4)}
                                {this.renderChecker(3, 4)}
                                {this.renderChecker(4, 4)}
                                {this.renderChecker(5, 4)}
                                {this.renderChecker(6, 4)}
                            </div>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 3)}
                                {this.renderChecker(1, 3)}
                                {this.renderChecker(2, 3)}
                                {this.renderChecker(3, 3)}
                                {this.renderChecker(4, 3)}
                                {this.renderChecker(5, 3)}
                                {this.renderChecker(6, 3)}
                            </div>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 2)}
                                {this.renderChecker(1, 2)}
                                {this.renderChecker(2, 2)}
                                {this.renderChecker(3, 2)}
                                {this.renderChecker(4, 2)}
                                {this.renderChecker(5, 2)}
                                {this.renderChecker(6, 2)}
                            </div>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 1)}
                                {this.renderChecker(1, 1)}
                                {this.renderChecker(2, 1)}
                                {this.renderChecker(3, 1)}
                                {this.renderChecker(4, 1)}
                                {this.renderChecker(5, 1)}
                                {this.renderChecker(6, 1)}
                            </div>
                            <div className={styles.checkerRow}>
                                {this.renderChecker(0, 0)}
                                {this.renderChecker(1, 0)}
                                {this.renderChecker(2, 0)}
                                {this.renderChecker(3, 0)}
                                {this.renderChecker(4, 0)}
                                {this.renderChecker(5, 0)}
                                {this.renderChecker(6, 0)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p>You may have played a similar game to this one: Connect Four. For legal purposes, this is not that game. To play, hover you mouse over any column with a downward arrow above it (an "X" means you can't play in that column). Click the gold circle that appears to drop a circle into that column. The computer will take a turn before passing it back to you.</p>
                        <p>To win the game, you need to get four in a row in any direction: vertical, horizontal, or diagonal. make sure to plack the computer if its about to win! For more advanced strategies, continue reading (or you can just start playing).</p>
                        <p>Perfect Play</p>
                        <button className={styles.btn} onClick={click => this.reset()}>RESET THE GAME</button>
                        <div>{this.state.winner}{this.state.winner ? " wins!" : null}</div>
                    </div>
                </div>
            </div>
        );
    }
}