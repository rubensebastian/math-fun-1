import React from "react";
import styles from "./layout.module.css";
import Image from 'next/image';
import mandelbrot from '../assets/mandelbrot.jpeg';

class Fractal extends React.Component {
    render() {
            return (
                <div className={styles.mandelbrot}>
                    <Image src={mandelbrot} alt="the mandelbrot set is a structure that repeats infinitely as you zoom in" />
                    <p><a href="https://commons.wikimedia.org/w/index.php?curid=321973">Mandelbrot Set</a> created by <a href="//commons.wikimedia.org/wiki/User:Wolfgangbeyer" title="User:Wolfgangbeyer"> Wolfgang Beyer</a>; with the program Ultra Fractal 3. - Own work, <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>.</p>
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