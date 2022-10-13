import React from "react";
import styles from "./layout.module.css";
import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)


let red = 255;
let green = 255;
let blue = 255;
let fill = false;
const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(255);
};

const draw = (p5) => {
    if (p5.mouseIsPressed) {
        p5.fill(red, green, blue);
        p5.stroke(red, green, blue);
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
    }
    if (fill == true) {
        p5.background(red, green, blue);
    }
};

class Explanation extends React.Component {
    render() {
        return (
            <div className={styles.info}>
                <h2 className={styles.targetHeading}>What makes color on the Internet?</h2>
                <p>You&apos;ve probably mixed paint in your art class. Red and blue make purple. Yellow and blue make green. Mix everything together and you get a murky brown.</p>
                <p>Color on the Internet works differently. When all the colors are mixed together, you get white. When there are no colors at all, you get black. Notice on the right hand side how all the colors start at a value of 255 (there is a sciencey reason for this). The canvas is white, but if you drag the sliders to the left, you subtract that color from white. Then, click and draw on the canvas to see what color you have.</p>
                <p>If you want to see the colors change in real time, select &quot;Fill Canvas.&quot; This will change the background color of the canvas as you drag the sliders. Want to paint instead? Choose the button that now says &quot;Use Paint Brush,&quot; select a color, and start painting!</p>
                <p>Since we have 256 options (0-255) for each of red, blue, and green, we can make 256 * 256 * 256 different combinations. That&apos;s over 16 million colors! Humans can only see about 10 million colors, so that&apos;s more than enough!</p>
            </div>
        );
    }
}

class Sliders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            red: 255,
            green: 255,
            blue: 255,
            fill: false
        }
    }
    changeColor = (color) => {
        if (color == "red") {
            red = document.getElementById("red").value;
            this.setState({ red: red })
        }
        if (color == "green") {
            green = document.getElementById("green").value;
            this.setState({ green: green })
        }
        if (color == "blue") {
            blue = document.getElementById("blue").value;
            this.setState({ blue: blue })
        }
    }

    fillColor = () => {
        fill = !fill;
        this.setState(state => ({
            fill: !state.fill
        }))
    }

    render() {
        return (
            <div>
                <p>You are currently on the {this.state.fill ? "Paint Bucket" : "Paint Brush"}</p>
                <div>
                    <label htmlFor="red">Red: {this.state.red}</label><br></br>
                    <input type="range" id="red" name="red" min="0" max="255" defaultValue="255" onChange={() => this.changeColor("red")}></input>
                </div>
                <div>
                    <label htmlFor="green">Green: {this.state.green}</label><br></br>
                    <input type="range" id="green" name="green" min="0" max="255" defaultValue="255" onChange={() => this.changeColor("green")}></input>
                </div>
                <div>
                    <label htmlFor="blue">Blue: {this.state.blue}</label><br></br>
                    <input type="range" id="blue" name="blue" min="0" max="255" defaultValue="255" onChange={() => this.changeColor("blue")}></input>
                </div>
                <button onClick={this.fillColor} className={styles.btn}>{this.state.fill ? "Use Paint Brush" : "Fill Canvas"}</button>
            </div>
        );
    }
}

export default class Colors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={styles.fsuHolder}>
                <h1>Color by Number</h1>
                <div className={styles.colors}>
                    <Explanation />
                    <Sketch className={styles.canvas} setup={setup} draw={draw} />
                    <Sliders />
                </div>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}