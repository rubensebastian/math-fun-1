import React from "react";
import styles from "./layout.module.css";

export default class Fractal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return(
            <div>Hello, World</div>
        );
    }
}