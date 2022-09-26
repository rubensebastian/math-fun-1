import React from "react";
import styles from "./layout.module.css";
import Image from 'next/image';
import mandelbrot from '../assets/Mandelbrot_zoom_1.gif';
import sierpinski from '../assets/Sierpinski_zoom_2.gif';
import koch from '../assets/KochSnow.gif'

class Fractal extends React.Component {//cycle through instead
    render() {
        if(this.props.version === 0){
            return (
                <div className={styles.mandelbrot}>
                    <Image src={mandelbrot} alt="the mandelbrot set is a structure that repeats infinitely as you zoom in" />
                    <p>The Mandelbrot Set, courtesy of <a href="https://commons.wikimedia.org/w/index.php?curid=9277589">Riktu</a> via Wikimedia Commons.</p>
                </div>
            );
        }

        if(this.props.version === 1){
            return (
                <div className={styles.mandelbrot}>
                    <Image src={sierpinski} alt="the mandelbrot set is a structure that repeats infinitely as you zoom in" />
                    <p>Sierpinski Triangles, courtesy of <a href="https://commons.wikimedia.org/wiki/File:Sierpinski_zoom_2.gif">Simpsons contributor</a> via Wikimedia Commons.</p>
                </div>
            );
        }

        return (
            <div className={styles.mandelbrot}>
                <Image src={koch} alt="the mandelbrot set is a structure that repeats infinitely as you zoom in" />
                <p>Koch Snow, courtesy of <a href="https://upload.wikimedia.org/wikipedia/commons/5/58/KochSnowGif16_800x500.gif">Leofun01</a> via Wikimedia Commons.</p>
            </div>
        );
    }
}

export default class Base extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            version: 0,
        }
    }
    render() {
        setTimeout(() => {
            if(this.state.version === 2){
                this.setState({version: 0});
            }
            else {
                this.setState(state => ({
                    version: state.version + 1,
                }))
            }
        }, 15000);
        return (
            <div className={styles.vertical}>
                <h1>Math Fun Day</h1>
                <p className={styles.welcome}>Welcome to Math Fun Day Online! Learn perfect play in the Math Games section, or check out activities in the Interactive Math section. To learn more, visit the About section.</p>
                <Fractal version={this.state.version} />
            </div>
        );
    }
}