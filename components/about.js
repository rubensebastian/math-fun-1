import React from "react";
import styles from "./layout.module.css";
import Link from 'next/link';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return(
            <div>Nothing here yet :)</div>
        )
    }
}