import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Fact = dynamic(
  () => import('./facts'),
  { ssr: false }
)



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

  checkWin = () => {//add draw game as well to win: false
    for (let win of possibleWins) {
      if (this.state.squares[win[0]] != null && this.state.squares[win[0]] == this.state.squares[win[1]] && this.state.squares[win[1]] == this.state.squares[win[2]]) {
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
      this.checkWin();
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
        <h1>Tic Tac Toe</h1>
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
        <div><button onClick={this.resetGame}>Reset Game</button></div>
        {this.state.win === null ? null : this.state.win === false ? <p>Draw Game</p> : this.state.playerTurn ? <p>Player wins!</p> : <p>Computer wins!</p>}
        <Fact textContent={Math.floor(Math.random() * 10)} />
      </div>
    );
  }
}























// function Square(props) {
//   return (
//     <button className={styles.ticButton} onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className={styles.ticRow}>
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className={styles.ticRow}>
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className={styles.ticRow}>
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// // class TicBoard extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       gameStatus: Array(9).fill(null),
// //       turnNumber: 1,
// //       xTurn: true,
// //     }
// //   }

// //   perfectPlay = () => {
// //     if (this.state.turnNumber == 2) {
// //       if (this.gameStatus[4] == 'X') {
// //         let randomCorner = Math.random() < .5 ? Math.random() < .5 ? 0 : 2 : Math.random() < .5 ? 6 : 8;
// //       }
// //     }
// //   }

// //   chooseSquare = (square) => {
// //     if (this.state.gameStatus[square] === null) {
// //       let gameStatusCopy = this.state.gameStatus;
// //       gameStatusCopy[square] = this.state.xTurn ? 'X' : 'O';
// //       this.setState(state => ({
// //         gameStatus: gameStatusCopy,
// //         xTurn: !state.xTurn,
// //         turnNumber: state.turnNumber + 1,
// //       }))
// //     }
// //   }

// //   render() {
// //     this.perfectPlay();
// //     return (
// //       <div>Hello</div>
// //     );
// //   }
// // }

// export default class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [
//         {
//           squares: Array(9).fill(null)
//         }
//       ],
//       stepNumber: 0,
//       xIsNext: true
//     };
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares
//         }
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }

//     return (
//       <div className={styles.ticGame}>
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={i => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
