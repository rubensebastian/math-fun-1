import React from "react";
import styles from "./layout.module.css";
import Link from 'next/link';

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div>
                <div><Link href="/activities/caesar-cipher">
                    <a>Caesar Cipher</a>
                </Link></div>
                <div><Link href="/activities/target">
                    <a>Target Number</a>
                </Link></div>
                <div><Link href="/activities/colors">
                    <a>Numbers in Art</a>
                </Link></div>
                {/* <div><Link href="/activities/fractal">
                    <a>Fractals!</a>
                </Link></div>
                <div><Link href="/activities/polygon">
                    <a>Polygon Programming</a>
                </Link></div> */}
            </div>
        )
    }
}