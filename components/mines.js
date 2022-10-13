import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)

class MineSquare extends React.Component {
    render() {//run checkbomb every time button is clicked
        return (
            <button id={this.props.row * 16 + this.props.col} onClick={() => this.props.checkCell(this.props.row, this.props.col, window.event)} onContextMenu={() => this.props.flagCell(this.props.row, this.props.col, window.event)} contextMenu={false} className={styles.mineCovered}>{this.props.showValue === true ? this.props.value[this.props.row * 16 + this.props.col] === 0 ? null : this.props.value[this.props.row * 16 + this.props.col] == -1 ? "B" : this.props.value[this.props.row * 16 + this.props.col] : this.props.showValue === false ? "F" : null}</button>
        )//replace the words "F" and "B" above with images
    }
}

class Board extends React.Component {
    render() {
        let mines = [];
        for (let i = 0; i < 16; i++) {
            let tempRow = [];
            for (let j = 0; j < 16; j++) {
                tempRow.push(<MineSquare row={i} col={j} checkCell={this.props.chooseCell} flagCell={this.props.flagCell} value={this.props.values} showValue={this.props.shown[i * 16 + j]} />)
            }
            mines.push(<div className={styles.mineRows}>{tempRow}</div>)
        }
        return (
            <div>{mines}</div>
        )
    }
}

export default class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bombPositions: Array(256).fill(null),//array of true/false where bombs are
            cellValues: Array(256).fill(null),
            shown: Array(256).fill(null),
            firstMove: true,
        }
    }

    flagCell = (row, column, event) => {
        let shownCopy = [...this.state.shown];
        if (shownCopy[row * 16 + column] == null) {
            shownCopy[row * 16 + column] = false;
            document.getElementById(row * 16 + column).className = styles.mineFlag;
        } else if (shownCopy[row * 16 + column] == false) {
            shownCopy[row * 16 + column] = null;
            document.getElementById(row * 16 + column).className = styles.mineCovered;
        }
        this.setState({
            shown: [...shownCopy],
        });
        event.preventDefault();
    }

    checkCell = (row, column, event) => {
        if (this.state.shown[row * 16 + column] === false) {
            event.preventDefault();
            return;
        }

        if (this.state.shown[row * 16 + column] === true) {
            return;//add in logic for chaining adjacent cells based on flags MAYBE
        }

        if (this.state.shown[row * 16 + column] === null) {
            let bombPositionsValue = row * 16 + column;
            let showCell = [...this.state.shown];
            let values = [...this.state.cellValues];
            if (this.state.firstMove === true) {
                let bombP = Array(256).fill("Clear");//array that will be copied into this.state.bombPositions
                let placed = 0;//tracks how many bombs have been placed
                let bombPlacement;//random number to insert into the this.state.bombPositions array
                while (placed < 40) {
                    bombPlacement = Math.floor(Math.random() * 256);
                    if (bombPlacement != bombPositionsValue && bombPlacement != bombPositionsValue - 1 && bombPlacement != bombPositionsValue + 1 && bombPlacement != bombPositionsValue - 16 && bombPlacement != bombPositionsValue + 16 & bombPlacement != bombPositionsValue - 15 && bombPlacement != bombPositionsValue + 15 && bombPlacement != bombPositionsValue - 17 && bombPlacement != bombPositionsValue + 17) {
                        bombP[bombPlacement] = "Bomb";
                        placed++;
                    }
                }

                for (let i = 0; i < 256; i++) {
                    if (bombP[i] == "Bomb") {
                        values[i] = -1;
                    } else {
                        let nearbyBombs = 0;
                        if (Math.floor(i / 16) > 0) {//check previous upper row
                            if (bombP[i - 16] == "Bomb") {//directly up
                                nearbyBombs++;
                            }
                            if (i % 16 > 0) {
                                if (bombP[i - 17] == "Bomb") {//up and left
                                    nearbyBombs++;
                                }
                            }
                            if (i % 16 < 15) {
                                if (bombP[i - 15] == "Bomb") {//up and right
                                    nearbyBombs++;
                                }
                            }
                        }
                        if (Math.floor(i / 16) < 15) {//check previous upper row
                            if (bombP[i + 16] == "Bomb") {//directly down
                                nearbyBombs++;
                            }
                            if (i % 16 < 15) {
                                if (bombP[i + 17] == "Bomb") {//down and right
                                    nearbyBombs++;
                                }
                            }
                            if (i % 16 > 0) {
                                if (bombP[i + 15] == "Bomb") {//down and left
                                    nearbyBombs++;
                                }
                            }
                        }
                        if (i % 16 > 0) {
                            if (bombP[i - 1] == "Bomb") {
                                nearbyBombs++;
                            }
                        }
                        if (i % 16 < 15) {
                            if (bombP[i + 1] == "Bomb") {
                                nearbyBombs++;
                            }
                        }
                        values[i] = nearbyBombs;
                    }
                }
                showCell[bombPositionsValue] = true;
                this.setState({
                    bombPositions: [...bombP],
                    shown: [...showCell],
                    firstMove: false,
                    cellValues: [...values],
                });
            }//end of first turn bomb distribution
            showCell[bombPositionsValue] = true;
            document.getElementById(row * 16 + column).className = styles.mineExposed;

            // if (this.state.cellValues[row * 16 + column] == 0) {
            //     this.checkCell(row - 1, column);
            //     this.checkCell(row - 1, column - 1);
            //     this.checkCell(row - 1, column + 1);
            //     this.checkCell(row + 1, column);
            //     this.checkCell(row + 1, column - 1);
            //     this.checkCell(row + 1, column + 1);
            //     this.checkCell(row, column - 1);
            //     this.checkCell(row, column + 1);
            // } // figure out more efficient way to check touching cells, account for out of bounds, and don't check cells that are already opened
            this.setState({
                shown: [...showCell],
            });
        }
    }

    render() {
        return (
            <div className={styles.vertical}>
                <h1>Minesweeper</h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2><i>How to Play</i></h2>
                        <p>This is how to play</p>
                    </div>
                    <Board chooseCell={this.checkCell} values={this.state.cellValues} shown={this.state.shown} flagCell={this.flagCell} />
                </div>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}