import React from "react";
import styles from "./styles/layout.module.css";
import Infocard from "./infocard";

export default class Games extends React.Component {
    render() {
        return (
            <div className={styles.vertical}>
                <h1>Math Games</h1>
                <div className={styles.infoCardHolder}>
                    <Infocard title="Nim" description="This is about Nim" linkDestination="/activities/nim" />
                    <Infocard title="Nim Variation" description="This is about Nim Variation" linkDestination="/activities/nim2" />
                    <Infocard title="Minesweeper" description="This is about Minesweeper" linkDestination="/activities/mines" />
                    <Infocard title="Card Switching" description="This is about Card Switching" linkDestination="/activities/cards" />
                </div>
            </div>
        );
    }
}