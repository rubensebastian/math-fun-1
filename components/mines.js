import React from "react";
import styles from "./layout.module.css";

class MineSquare extends React.Component {
    render() {//run checkbomb every time button is clicked
        return (
            <button onClick={() => this.props.checkSquare(this.props.row, this.props.col)} className={styles.mineCovered}>{this.props.showValue === true ? this.props.mineNumber: null}</button>//if mineN = 0, blank; if mineN = -1, bomb
        )
    }
}

class Board extends React.Component {
    render() {
        let rowNumber = this.props.selection.length;
        let colNumber = this.props.selection[0].length;
        let mines = [];
        for (let i = 0; i < rowNumber; i++) {
            let tempRow = [];
            for (let j = 0; j < colNumber; j++) {
                tempRow.push(<MineSquare row={i} col={j} mineNumber={this.props.selection[i][j]} checkSquare={this.props.checkSquare} showValue={this.props.shown[i][j]} />)
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
            difficulty: null,
            cellValue: null,//if a cell has been selected, its value (or bomb = -1)
            valueShown: null,//whether to show cellValue
            bombNumber: null,
            firstMove: true,
            win: null,//add new variable that contains whether a bomb is shown
        }
    }

    checkBombs = (row, col, surrounding, bombs) => {//surrounding and bombs are arrays
        if (bombs[row][col] === true) {
            return -1;
        }
        let nearbyBombCount = 0;
        for (let k = 1; k < surrounding.length; k++) {
            if (bombs[surrounding[k][0]][surrounding[k][1]] === true) {//grabs the surrounding cells from chooseCell function
                nearbyBombCount++;//make sure this avoids out of bounds
            }
        }
        return nearbyBombCount;
    }

    distributeBombs = (surroundingArray) => {
        let bombPositions = [...this.state.cellValue];//this just needs to be the same dimensions of null values
        for (let i = 0; i < this.state.bombNumber; i++) {//generates positions of all the bombs
            let row = Math.floor(Math.random() * this.state.cellValue.length);//random row for bomb
            let column = Math.floor(Math.random() * this.state.cellValue[0].length);//random column for bomb
            for (let j = 0; j < surroundingArray.length; j++) {
                if (row == surroundingArray[j][0] && column == surroundingArray[j][1]) {
                    i--;//if it would put a bomb there, resets instead
                    break;
                }
                if (j == surroundingArray.length - 1) {//if it reaches the end with no matches, add to bomb array
                    bombPositions[row][column] = true;
                }
            }
        }
        let values = [...this.state.cellValue];
        for (let i = 0; i < values.length; i++) {//rows
            for (let j = 0; j < values[0].length; j++) {//columns
                values[i][j] = 0//this.checkBombs(i, j, surroundingArray, bombPositions);
            }
        }
        this.setState({
            cellValue: values,
            firstMove: false,
        });
    }

    chooseCell = (rowClicked, colClicked) => {
        let surroundingArray = [
            [rowClicked, colClicked],
            [rowClicked, colClicked + 1],
            [rowClicked, colClicked - 1],
            [rowClicked + 1, colClicked],
            [rowClicked - 1, colClicked],
            [rowClicked + 1, colClicked + 1],
            [rowClicked - 1, colClicked + 1],
            [rowClicked + 1, colClicked - 1],
            [rowClicked - 1, colClicked - 1],
        ];

        if (this.state.firstMove == true) {//distributes the bombs and ensures a chain to start
            this.distributeBombs(surroundingArray);
        }

        let shownCopy = [...this.state.valueShown];

        if (this.state.cellValue[rowClicked][colClicked] === -1) {
            shownCopy[rowClicked][colClicked] = true;
            this.setState({
                win: false,
                valueShown: shownCopy,
            });
            return;
        }

        if (this.state.cellValue[rowClicked][colClicked] > 0) {
            shownCopy[rowClicked][colClicked] = true;
            this.setState({
                valueShown: shownCopy,
            });
            return;
        }

        if(this.state.cellValue[rowClicked][colClicked] = 0){//this doesn't seem to be running
            shownCopy[rowClicked][colClicked] = true;
            this.setState({
                valueShown: shownCopy,
            });
            for(let i = 1; i < surroundingArray; i++){
                this.chooseCell(surroundingArray[0], surroundingArray[1]);
            }
        }
    }

    setDifficulty = (difficulty) => {
        let states;
        let shown;
        let bombNum;
        if (difficulty == "easy") {
            states = Array.from({length: 9}, e => Array(9).fill(null));
            shown = Array.from({length: 9}, e => Array(9).fill(null));
            bombNum = 10;
        }
        if (difficulty == "medium") {
            states = Array.from({length: 16}, e => Array(16).fill(null));
            shown = Array.from({length: 261}, e => Array(16).fill(null));
            bombNum = 40;
        }
        if (difficulty == "hard") {
            states = Array.from({length: 16}, e => Array(30).fill(null));
            shown = Array.from({length: 16}, e => Array(30).fill(null));
            bombNum = 99;
        }
        this.setState({//difficulty can be entered as easy, medium, or hard
            difficulty: difficulty,
            cellValue: states,
            valueShown: shown,
            bombNumber: bombNum,
            firstMove: true,
        });
    }

    render() {
        return (
            <div>
                <div className={styles.mineMenu}>
                    <div>
                        <span>Select your difficulty: </span>
                        <button className={styles.btn} onClick={() => this.setDifficulty("easy")}>Easy</button>
                        <button className={styles.btn} onClick={() => this.setDifficulty("medium")}>Medium</button>
                        <button className={styles.btn} onClick={() => this.setDifficulty("hard")}>Hard</button>
                    </div>
                    <p>Bombs: {this.state.bombNumber ? this.state.bombNumber : null}</p>
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        How to get started.
                    </div>
                    {this.state.difficulty ? <Board level={this.state.difficulty} selection={this.state.cellValue} checkSquare={this.chooseCell} shown={this.state.valueShown} /> : null}
                    {this.state.win === true ? <div>You win!</div> : this.state.win === false ? <div>You lose...</div> : null}
                </div>
            </div>
        );
    }
}