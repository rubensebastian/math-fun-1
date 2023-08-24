import React from "react";
import styles from "../styles/layout.module.css";
import Image from 'next/image';
import fun from '../../assets/math fun.png';

class Snail extends React.Component {
    render() {
            return (
                <div className={styles.homeImage}>
                    <Image src={fun} alt="" />
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
                <Snail />
            </div>
        );
    }
}