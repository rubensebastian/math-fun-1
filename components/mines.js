import React from "react";
import styles from "./styles/layout.module.css";
import Image from "next/image";
import only from '../assets/only.png'
import opening from '../assets/opening.png'
import pattern from '../assets/pattern.png'

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
    }

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

    showImage = (target) => {
        document.getElementById(target).hidden = !document.getElementById(target).hidden;
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
                        <p>So how can you tell which cells are bombs? Start by left-clicking one of the cells. This will &quot;open&quot; the surrounding cells. What do the numbers on the cells mean? If a cell is blank (no number), that means it is touching zero bombs in the surrounding eight cells. If a cell has a 1-8 on it, there are that many bombs in the surrounding 8 cells. A 1-cell has 1 bomb in the surruonding area, a 2-cell has 2 bombs in the surrounding area, and so on. Start playing to see if you can figure it out, or read below for the logic approach.</p>
                        <p><strong>Only N cells remaining</strong>: Let&apos;s say you&apos;re looking at a 3-cell. If 5 of the cells around it have been opened so that there are only 3 closed cells remaining, <em>all</em> 3 of those cells are bombs. The 3 bombs cannot repeat in a cell, so they must live in <em>exactly</em> 3 cells. <a className={styles.minePopup} onClick={() => this.showImage("only")}>Show <strong>Only N cells</strong> Example</a>.</p>
                        <p id="only" hidden={true} ><Image src={only} alt="" /></p>
                        <p><strong>Already found the bomb</strong>: For example, if a 2-cell is already touching exactly 2 bombs, you can clear the reamining cells. <a className={styles.minePopup} onClick={() => this.showImage("opening")}>Show <strong>Already found</strong> Example</a></p>
                        <p id="opening" hidden={true} ><Image src={opening} alt="" /></p>
                        <p><strong>1-2-1</strong>: If you have a row of numbers in order of 1-2-1, and the 2 has exactly 3 closed cells remaining, the center closed cell is never a bomb. Why does this work? Assume for contradiction that the middle cell is a bomb. Both of the 1-cells can be opened by &quot;Already found the bomb.&quot; There is is nowhere left to place the 2-cell&apos;s second bomb, so it&apos;s impossible. Thus, the middle cell cannot have a bomb. <a className={styles.minePopup} onClick={() => this.showImage("pattern")}>Show <strong>1-2-1</strong> Example</a></p>
                        <p id="pattern" hidden={true} ><Image src={pattern} alt="" /></p>
                        <p><strong>Reduction</strong>: Let&apos;s say you have 2-3-2 in a row, but they are already all touching one bomb. That means the 2s have 1 bomb remaining, while the 3 has 2 bombs remaining. This has been reduced into a 1-2-1 situation, and you can apply that principle to this situation.</p>
                        <button onClick={this.newGame} className={styles.btn}>Start New Game</button>
                    </div>
                    <Board chooseCell={this.checkCell} values={this.state.cellValues} shown={this.state.shown} flagCell={this.flagCell} />
                </div>
            </div>
        );
    }
}