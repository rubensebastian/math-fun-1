import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)

class MineSquare extends React.Component {
    render() {
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
            <div className={styles.minesBorder}>{mines}</div>
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
            remainingBombs: 40,
            win: null,
        }
    }

    showOtherCells = (currentMoveValue, cellValueArray) => {
        let newFound = true;
        let shownCellsCopy = [...this.state.shown];
        shownCellsCopy[currentMoveValue] = true;


        while (newFound) {
            newFound = false;

            for (let i = 0; i < 256; i++) {
                let rowNumber = Math.floor(i / 16);
                let colNumber = i % 16;

                if (rowNumber > 0 && shownCellsCopy[i] !== true) {//check above
                    if (shownCellsCopy[i - 16] === true && cellValueArray[i - 16] === 0) {
                        shownCellsCopy[i] = true;
                        document.getElementById(i).className = styles.mineExposed;
                        newFound = true;
                    }
                    if (colNumber > 0) {//above and left
                        if (shownCellsCopy[i - 17] === true && cellValueArray[i - 17] === 0) {
                            shownCellsCopy[i] = true;
                            document.getElementById(i).className = styles.mineExposed;
                            newFound = true;
                        }
                    }
                    if (colNumber < 15) {//above and right
                        if (shownCellsCopy[i - 15] === true && cellValueArray[i - 15] === 0) {
                            shownCellsCopy[i] = true;
                            document.getElementById(i).className = styles.mineExposed;
                            newFound = true;
                        }
                    }
                }
                if (rowNumber < 15 && shownCellsCopy[i] !== true) {//check below
                    if (shownCellsCopy[i + 16] === true && cellValueArray[i + 16] === 0) {
                        shownCellsCopy[i] = true;
                        document.getElementById(i).className = styles.mineExposed;
                        newFound = true;
                    }
                    if (colNumber > 0) {//below and left
                        if (shownCellsCopy[i + 15] === true && cellValueArray[i + 15] === 0) {
                            shownCellsCopy[i] = true;
                            document.getElementById(i).className = styles.mineExposed;
                            newFound = true;
                        }
                    }
                    if (colNumber < 15) {//below and right
                        if (shownCellsCopy[i + 17] === true && cellValueArray[i + 17] === 0) {
                            shownCellsCopy[i] = true;
                            document.getElementById(i).className = styles.mineExposed;
                            newFound = true;
                        }
                    }
                }
                if (colNumber > 0 && shownCellsCopy[i] !== true) {//check left
                    if (shownCellsCopy[i - 1] === true && cellValueArray[i - 1] === 0) {
                        shownCellsCopy[i] = true;
                        document.getElementById(i).className = styles.mineExposed;
                        newFound = true;
                    }
                }
                if (colNumber < 15 && shownCellsCopy[i] !== true) {//check right
                    if (shownCellsCopy[i + 1] === true && cellValueArray[i + 1] === 0) {
                        shownCellsCopy[i] = true;
                        document.getElementById(i).className = styles.mineExposed;
                        newFound = true;
                    }
                }
            }
        }
        this.setState({
            shown: [...shownCellsCopy],
        });
    }//add in the diagonals

    flagCell = (row, column, event) => {
        if (this.state.win !== null) {
            event.preventDefault();
            return;
        }
        let shownCopy = [...this.state.shown];
        if (shownCopy[row * 16 + column] == null) {
            shownCopy[row * 16 + column] = false;
            document.getElementById(row * 16 + column).className = styles.mineFlag;
            this.setState(state => ({
                shown: [...shownCopy],
                remainingBombs: state.remainingBombs - 1,
            }));
        } else if (shownCopy[row * 16 + column] == false) {
            shownCopy[row * 16 + column] = null;
            document.getElementById(row * 16 + column).className = styles.mineCovered;
            this.setState(state => ({
                shown: [...shownCopy],
                remainingBombs: state.remainingBombs + 1,
            }));
        }//add in logic for chaining adjacent cells based on flags MAYBE
        this.setState({
            shown: [...shownCopy],
        });
        event.preventDefault();
    }

    checkCell = (row, column, event) => {
        if (this.state.shown[row * 16 + column] === false || this.state.win !== null) {
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
                    if (bombPlacement != bombPositionsValue && bombPlacement != bombPositionsValue - 1 && bombPlacement != bombPositionsValue + 1 && bombPlacement != bombPositionsValue - 16 && bombPlacement != bombPositionsValue + 16 & bombPlacement != bombPositionsValue - 15 && bombPlacement != bombPositionsValue + 15 && bombPlacement != bombPositionsValue - 17 && bombPlacement != bombPositionsValue + 17 && bombP[bombPlacement] !== "Bomb") {
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
                document.getElementById(row * 16 + column).className = styles.mineExposed;

                this.setState({
                    bombPositions: [...bombP],
                    shown: [...showCell],
                    firstMove: false,
                    cellValues: [...values],
                });

                this.showOtherCells(bombPositionsValue, [...values]);
            }//end of first turn bomb distribution
            else {
                if (values[bombPositionsValue] == -1) {
                    this.setState({
                        win: false,
                    });
                }//selecting a bomb ends the game

                showCell[bombPositionsValue] = true;
                document.getElementById(row * 16 + column).className = styles.mineExposed;

                this.setState({
                    shown: [...showCell],
                });

                if (values[bombPositionsValue] == 0) {
                    this.showOtherCells(bombPositionsValue, [...values]);
                }

                let checkWin = [...this.state.shown];
                for (let i = 0; i < checkWin.length; i++) {
                    if (checkWin[i] === null && this.state.cellValues[i] !== -1 && i !== row * 16 + column) {
                        return;
                    }
                }//returns if the game hasn't been won
                this.setState({
                    win: true,
                })//if not returned already, sets game to win
            }
        }
    }

    newGame = () => {
        this.setState({
            bombPositions: Array(256).fill(null),//array of true/false where bombs are
            cellValues: Array(256).fill(null),
            shown: Array(256).fill(null),
            firstMove: true,
            remainingBombs: 40,
            win: null,
        })

        for (let i = 0; i < 256; i++) {
            document.getElementById(i).className = styles.mineCovered;
        }
    }

    render() {
        return (
            <div className={styles.vertical}>
                <h1>Minesweeper</h1>
                <div>
                    <p>Remaining Bombs: {this.state.remainingBombs}</p>
                    <p hidden={this.state.win === null}>{this.state.win === true ? "You win!" : "You lose..."}</p>
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2><i>How to Play</i></h2>
                        <p>This game of Minesweeper is played on a 16x16 grid. Each of those dark grey squares is called a cell. Some cells are covering bombs, and if you left-click one of those cells, you lose the game! To win, you must identify all the bombs by right-clicking them (they will turn red) and opening the other cells (they will turn light grey).</p>
                        <p>So how can you tell which cells are bombs? Start by left-clicking one of the cells. This will &quot;open&quot; the surrounding cells. What do the numbers on the cells mean? If a cell is blank (no number), that means it is touching zero bombs in the surrounding eight cells. A cell has its number of bombs in the surrounding eight cells. Start playing to see if you can figure it out, or read below for the logic approach.</p>
                        <button onClick={this.newGame} className={styles.btn}>Start New Game</button>
                    </div>
                    <Board chooseCell={this.checkCell} values={this.state.cellValues} shown={this.state.shown} flagCell={this.flagCell} />
                </div>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}