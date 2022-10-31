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
        return (
            <div className={styles.vertical}>
                <h1>About</h1>
                <p>Math Fun Day is an annual event for K-12 students and families in the greater Tallahassee area. Faculty, staff, and student volunteers from the Department of Mathematics engage with the community to showcase how <strong>Math is fun!</strong></p>
                <section>
                    <h2>About M</h2>
                </section>
            </div>
        );
    }
}