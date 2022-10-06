import React from "react";
import styles from "./layout.module.css";
import Link from 'next/link';


export default class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Link href="/games/nim">
                        <a>Nim Game</a>
                    </Link>
                </div>

                {/* <div>
                    <Link href="/games/tictactoe">
                        <a>Tic Tac Toe (Computer Play needed)</a>
                    </Link>
                </div>

                <div>
                    <Link href="/games/connect">
                        <a>Connect 4 (Computer Play needed)</a>
                    </Link>
                </div>

                <div>
                    <Link href="/games/dotbox">
                        <a>Dots and Boxes (Computer Play needed)</a>
                    </Link>
                </div> */}

                <div>
                    <Link href="/games/mines">
                        <a>Minesweeper (In Progress)</a>
                    </Link>
                </div>

                <div>
                    <Link href="/games/cards">
                        <a>Card Switching</a>
                    </Link>
                </div>

                <div>
                    <Link href="/games/nim2">
                        <a>Nim Variation</a>
                    </Link>
                </div>
            </div>
        )
    }
}