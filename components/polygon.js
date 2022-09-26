import React from "react";
import styles from "./layout.module.css";

export default class Polygon extends React.Component {
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