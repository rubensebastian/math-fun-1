import React from "react";
import styles from "./layout.module.css";
import dynamic from 'next/dynamic'
import Image from "next/image";
import triangle from '../assets/triangle.png'
import square from '../assets/square.png'
import pentagon from '../assets/pentagon.png'
import hexagon from '../assets/hexagon.png'
import heptagon from '../assets/heptagon.png'

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)

let showTessellation;

let loop = true;//this will get turned off each time to prevent reloading the page a million times per second

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})


const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(728, 540).parent(canvasParentRef);
    p5.background(255);
};

const draw = (p5) => {
    if (showTessellation == "triangle" && loop === true) {
        let top = [0, 0];
        let left = [-52, 90];
        let right = [52, 90];

        for (let i = 0; i < 6; i++) {//rows
            for (let j = 0; j < 15; j++) {//order in row
                p5.fill(Math.floor(Math.random() * 40), Math.floor(Math.random() * 70 + 186), Math.floor(Math.random() * 70 + 136));
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
        loop = false;
    }

    if (showTessellation == "square" && loop === true) {
        let x = 0;
        let y = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 15; j++) {
                p5.fill(Math.floor(Math.random() * 40), Math.floor(Math.random() * 70 + 186), Math.floor(Math.random() * 70 + 136));
                p5.rect(x, y, 104, 90);
                x += 104;
            }
            y += 90;
            x = 0;
        }
        loop = false;
    }
    if (showTessellation == "hexagon" && loop === true) {
        let width1;
        let width2;
        let width3;
        let width4;

        let height1 = -45;
        let height2 = 0;
        let height3 = 45;

        for (let i = 0; i < 13; i++) {
            width1 = i % 2 == 0 ? -78 : 0;//sets starting point depending on what level you're on
            width2 = i % 2 == 0 ? -52 : 26;
            width3 = i % 2 == 0 ? 0 : 78;
            width4 = i % 2 == 0 ? 26 : 104;

            for (let j = 0; j < 6; j++) {
                p5.fill(Math.floor(Math.random() * 40), Math.floor(Math.random() * 70 + 186), Math.floor(Math.random() * 70 + 136));

                p5.beginShape();
                p5.vertex(width1, height2);
                p5.vertex(width2, height1);
                p5.vertex(width3, height1);
                p5.vertex(width4, height2);
                p5.vertex(width3, height3);
                p5.vertex(width2, height3);
                p5.vertex(width1, height2);//repeats first point to close
                p5.endShape();

                width1 += 156;
                width2 += 156;
                width3 += 156;
                width4 += 156;
            }
            height1 += 45;
            height2 += 45;
            height3 += 45;
        }
        loop = false;
    }
};


class Explanation extends React.Component {
    render() {
        return (
            <div className={styles.info}>
                <p>You may be wondering what tessellation is. If so, you are on the right page. Tessellation is the arrangement of identical shapes without gaps or overlaps. But why do some shapes tessellate while others do not?</p>
                <h2>Why Tessellation Works</h2>
                <p>Content</p>
                <h2>Shapes that <em>will</em> tessellate</h2>
                <p>Content</p>
                <div className={styles.shapeHolder} ><Image onClick={() => this.props.tessellate("triangle")} src={triangle} alt="" width="115px" height="100px" /><Image src={square} onClick={() => this.props.tessellate("square")} alt="" width="100" height="100" /><Image src={hexagon} alt="" width="115" height="100" onClick={() => this.props.tessellate("hexagon")} /></div>
                <h2>Shapes that <em>will not</em> tessellate</h2>
                <div className={styles.shapeHolder} ><Image src={pentagon} alt="" width="105px" height="100px" /><Image src={heptagon} alt="" width="103px" height="100px" /></div>
            </div>
        );
    }
}

export default class Tessellation extends React.Component {
    tessellateBoard = (shape) => {
        showTessellation = shape;
        loop = true;
    }

    render() {
        return (
            <div className={styles.fsuHolder}>
                <h1>Tessellation</h1>
                <div className={styles.colors}>
                    <Explanation tessellate={this.tessellateBoard} />
                    <Sketch className={styles.canvas} setup={setup} draw={draw} />
                </div>
                <Fact textContent={Math.floor(Math.random() * 10)} />
            </div>
        );
    }
}