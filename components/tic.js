import React from "react";
import styles from "./layout.module.css";

let possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

class Square extends React.Component {
  render() {
    return (
      <div onClick={this.props.selectSquare} className={styles.ticSquare}>
        {this.props.selection ? this.props.selection == "X" ? "X" : "O" : null}
      </div>
    );
  }
}

export default class TicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      playerTurn: true,
      win: null,
    }
  }

  checkWin = (currentSquare) => {//add draw game as well to win: false
    let stateCopy = [...this.state.squares];
    stateCopy[currentSquare] = this.state.playerTurn ? "X" : "O";
    console.log(stateCopy);
    for (let win of possibleWins) {
      if (stateCopy[win[0]] != null && stateCopy[win[0]] == stateCopy[win[1]] && stateCopy[win[1]] == stateCopy[win[2]]) {
        this.setState(state => ({
          win: true,
          playerTurn: !state.playerTurn
        }));
      }
    }

    for (let position of this.state.squares) {
      if (position == null) {
        return;
      }
    }
    this.setState({ win: false });
  }

  chooseSquare = (position) => {
    let squaresCopy = this.state.squares;
    if (squaresCopy[position] == null && this.state.win == null) {
      squaresCopy[position] = this.state.playerTurn ? "X" : "O";
      this.setState(state => ({
        squares: squaresCopy,
        playerTurn: !state.playerTurn,
      }));
      this.checkWin(position);
    }
  }

  resetGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      playerTurn: true,
      win: null,
    });
  }

  render() {
    return (
      <div className={styles.vertical}>
        <h1><i>Tic Tac Toe</i></h1>
        <div className={styles.horizontal}>
          <div className={styles.info}>
            <h2>How to Play</h2>
            <p>Explanation goes here</p>
            <div><button className={styles.btn} onClick={this.resetGame}>Start New Game</button></div>
            {this.state.win === null ? null : this.state.win === false ? <p>Draw Game</p> : this.state.playerTurn ? <p>Player wins!</p> : <p>Computer wins!</p>}
          </div>
          <div>
            <div className={styles.ticRow}>
              <Square position={0} selection={this.state.squares[0]} selectSquare={() => this.chooseSquare(0)} />
              <Square position={1} selection={this.state.squares[1]} selectSquare={() => this.chooseSquare(1)} />
              <Square position={2} selection={this.state.squares[2]} selectSquare={() => this.chooseSquare(2)} />
            </div>
            <div className={styles.ticRow}>
              <Square position={3} selection={this.state.squares[3]} selectSquare={() => this.chooseSquare(3)} />
              <Square position={4} selection={this.state.squares[4]} selectSquare={() => this.chooseSquare(4)} />
              <Square position={5} selection={this.state.squares[5]} selectSquare={() => this.chooseSquare(5)} />
            </div>
            <div className={styles.ticRow}>
              <Square position={6} selection={this.state.squares[6]} selectSquare={() => this.chooseSquare(6)} />
              <Square position={7} selection={this.state.squares[7]} selectSquare={() => this.chooseSquare(7)} />
              <Square position={8} selection={this.state.squares[8]} selectSquare={() => this.chooseSquare(8)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}