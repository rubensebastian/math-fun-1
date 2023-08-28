import React from "react";
import styles from "../styles/layout.module.css";
import Image from 'next/image';
import fractal from '../../assets/fractal.jpg';

class Fractal extends React.Component {
    render() {
        return (
            <div className={styles.homeImage}>
                <a target="_blank" rel="noreferrer" title="Robert Sontheimer, CC BY 3.0 &lt;https://creativecommons.org/licenses/by/3.0&gt;, via Wikimedia Commons (opens in new window)" href="https://commons.wikimedia.org/wiki/File:Fractal_05.jpg">
                    <Image src={fractal} alt="" />
                </a>
            </div>
        );
    }
}

export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.vertical}>
                <h1>Math Fun</h1>
                <p className={styles.welcome}>Welcome to Math Fun! Learn perfect play, visualize one billion, or encode secret messages in the Interactive Math &amp; Games section. To learn more, visit the About section.</p>
                <Fractal />
            </div>
        );
    }
}