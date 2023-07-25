import React from "react";
import styles from "../styles/layout.module.css";

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={styles.vertical}>
                <h1>About</h1>
                <p>Here's some content.</p>
            </div>
        );
    }
}