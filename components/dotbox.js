import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)



class Line extends React.Component {
    render() {
        if (this.props.vertical) {
            if (this.props.player == "human") {
                return (
                    <div className={styles.verticalLineHuman}>
                    </div>
                )
            }
            if (this.props.player == "computer") {
                return (
                    <div className={styles.verticalLineComputer}>
                    </div>
                )
            }
            return (
                <div onClick={this.props.changeTurn} className={styles.verticalLine}>
                </div>
            )
        } else {
            if (this.props.player == "human") {
                return (
                    <div className={styles.horizontalLineHuman}>
                    </div>
                )
            }
            if (this.props.player == "computer") {
                return (
                    <div className={styles.horizontalLineComputer}>
                    </div>
                )
            }
            return (
                <div onClick={this.props.changeTurn} className={styles.horizontalLine}>
                </div>
            )
        }
    }
}

class Dot extends React.Component {
    render() {
        return (
            <div className={styles.dot}>
            </div>
        )
    }
}

class Box extends React.Component {
    render() {
        return (
            <div>
                {this.props.winner}
            </div>
        )
    }
}

export default class DotBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: Array(9).fill(null),
            lines: Array(24).fill(null),
            humanTurn: true,
        }
    }

    checkBoxes = () => {
        for (let i = 0; i < 9; i++) {
            let firstLine = 7 * Math.floor(i / 3) + i % 3;
            if (this.state.boxes[i] == null) {
                let line1 = this.state.lines[firstLine];
                let line2 = this.state.lines[firstLine + 3];
                let line3 = this.state.lines[firstLine + 4];
                let line4 = this.state.lines[firstLine + 7];
                if (line1 !== null && line2 !== null && line3 !== null && line4 !== null) {
                    let boxesCopy = this.state.boxes;
                    boxesCopy[i] = this.state.humanTurn ? "human" : "computer"
                    this.setState(state => ({
                        boxes: boxesCopy,
                        humanTurn: !state.humanTurn
                        //switches the turn so player that completes a box will go again when takeTurn() switches the turn back
                    }));
                    break;
                }
            }
        }
    }

    checkWin = () => {
        let humanCount = 0;
        let computerCount = 0;
        for (let i = 0; i < 9; i++) {
            if (this.state.boxes[i] == null) {
                return;
            }
            this.state.boxes[i] == "human" ? humanCount++ : computerCount++;
        }
        document.getElementById("winner").textContent = humanCount > computerCount ? "You win!" : "Computer wins!"
        document.getElementById("winner").hidden = false;
    }

    takeTurn = (lineIndex) => {
        let linesCopy = this.state.lines;
        linesCopy[lineIndex] = this.state.humanTurn ? "human" : "computer";
        this.setState({ lines: linesCopy });
        this.checkBoxes();
        this.setState(state => ({
            humanTurn: !state.humanTurn
        }))
        this.checkWin();
    }

    computerTurn = () => {
        return;
    }

    renderGrid = () => {
        let gridItems = [];
        for (let i = 0; i < 49; i++) {
            if (i % 2 == 1) {
                let line = <Line vertical={i % 14 > 5} player={this.state.lines[(i - 1) / 2]} turn={this.state.humanTurn} changeTurn={() => this.takeTurn((i - 1) / 2)} />;
                gridItems.push(line);
            } else if (i <= 6 || (i >= 14 && i <= 20) || (i >= 28 && i <= 34) || i >= 42) {
                let dot = <Dot />;
                gridItems.push(dot);
            } else {
                let box = <Box winner={this.state.boxes[3 * Math.floor(i / 14) + (i % 14 - 8) / 2]} />;
                gridItems.push(box);
            }
        }
        return (<div className={styles.dotBoxGrid}>{gridItems}</div>)
    }

    render() {
        return (
            <div>
                {this.renderGrid()}
                <p className={styles.centerText} hidden={true} id="winner" ></p>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}