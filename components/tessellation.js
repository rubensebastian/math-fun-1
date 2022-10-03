import React from "react";
import styles from "./layout.module.css";
import dynamic from 'next/dynamic'
import Image from "next/image";
import triangle from '../assets/triangle.png'
import square from '../assets/square.png'
import pentagon from '../assets/pentagon.png'
import hexagon from '../assets/hexagon.png'
import heptagon from '../assets/heptagon.png'

let showTessellation = false;

//maybe create arrays for rgb values with array.fill/from

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})


const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(728, 540).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(5);
};

const draw = (p5) => {
    if (showTessellation == "triangle") {
        let top = [0, 0];
        let left = [-52, 90];
        let right = [52, 90];

        for (let i = 0; i < 6; i++) {//rows
            for (let j = 0; j < 15; j++) {//order in row
                p5.fill(10, 255 - i * 20 - j * 2, 195 + 1 * 10 + j * 2)
                p5.triangle(top[0], top[1], left[0], left[1], right[0], right[1]);

                if (j % 3 == 0) {
                    left[0] = left[0] + 156;
                    left[1] = i % 2 == 0 ? j % 6 == 0 ? left[1] - 90 : left[1] + 90 : j % 6 == 0 ? left[1] + 90 : left[1] - 90;
                }
                if (j % 3 == 1) {
                    top[0] = top[0] + 156;
                    top[1] = i % 2 == 0 ? j % 6 == 1 ? top[1] + 90 : top[1] - 90 : j % 6 == 1 ? top[1] - 90 : top[1] + 90;
                }
                if (j % 3 == 2) {
                    right[0] = right[0] + 156;
                    right[1] = i % 2 == 0 ? j % 6 == 2 ? right[1] - 90 : right[1] + 90 : j % 6 == 2 ? right[1] + 90 : right[1] - 90;
                }
            }
            top[0] = 0;
            top[1] = top[1] + 90;

            left[0] = -52;
            left[1] = left[1] + 90;

            right[0] = 52;
            right[1] = right[1] + 90;
        }
    }

    if (showTessellation == "square") {
        let x = 0;
        let y = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 15; j++) {
                p5.rect(x, y, 104, 90);
                x += 104;
            }
            y += 90;
            x = 0;
        }

    }
};

class Explanation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tessellate: false,
        }
    }

    tessellate = (shape) => {
        showTessellation = shape;
    }

    render() {
        return (
            <div className={styles.info}>
                <h2 className={styles.targetHeading}>How to Tessellate</h2>
                <h3>Shapes that <em>will</em> tessellate</h3>
                <div className={styles.shapeHolder} ><Image onClick={() => this.tessellate("triangle")} src={triangle} alt="" width="231px" height="200px" /><Image src={square} onClick={() => this.tessellate("square")} alt="" width="200" height="200" /><Image src={hexagon} alt="" width="231" height="200" /></div>
                <h3>Shapes that <em>will not</em> tessellate</h3>
                <div className={styles.shapeHolder} ><Image src={pentagon} alt="" width="210px" height="200px" /><Image src={heptagon} alt="" width="205px" height="200px" /></div>
            </div>
        );
    }
}

export default class Tessellation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={styles.fsuHolder}>
                <h1>Tessellation</h1>
                <div className={styles.colors}>
                    <Explanation />
                    <Sketch className={styles.canvas} setup={setup} draw={draw} red={255} />
                </div>
            </div>
        );
    }
}