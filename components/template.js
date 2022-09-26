import React from "react";
import styles from "./layout.module.css";

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return(
            <div className={styles.vertical}>
                <h1>Title</h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>How to Play</h2>
                        <p>Explanation goes here</p>
                    </div>
                    <div>
                        Content goes here.
                    </div>
                </div>
            </div>
        );
    }
}