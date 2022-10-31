import React from "react";
import styles from "./layout.module.css";
import Image from 'next/image';
import fun from '../assets/math fun.png';

class Fractal extends React.Component {
    render() {
            return (
                <div className={styles.mandelbrot}>
                    <Image src={fun} alt="the mandelbrot set is a structure that repeats infinitely as you zoom in" />
                </div>
            );
    }
}

export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.vertical}>
                <h1>Math Fun Day</h1>
                <p className={styles.welcome}>Welcome to Math Fun Day Online! Learn perfect play in the Math Games section, or check out activities in the Interactive Math section. To learn more, visit the About section.</p>
                <Fractal />
            </div>
        );
    }
}