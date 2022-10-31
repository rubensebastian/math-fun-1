import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)

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
                <h1><i>Title</i></h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>How to Play</h2>
                        <p>Explanation goes here</p>
                    </div>
                    <div>
                        Content goes here.
                    </div>
                </div>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}