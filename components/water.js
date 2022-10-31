import React from "react";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

let bucket1 = 0;//11 gallon bucket current gallons
let bucket2 = 0;//3 gallon bucket current gallons
let source = null;//can be either bucket, faucet or null

const Fact = dynamic(
    () => import('./facts'),
    { ssr: false }
)

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

const fillBucket = (p5) => {//change these values once final design
    if(700 <= p5.mouseX && p5.mouseX <= 800 && 50 <= p5.mouseY && p5.mouseY <= 100){
        if(source == "faucet"){
            source = null;
            return;
        }
        if(source == null){
            source = "faucet";
            return;
        }
    }

    if(700 <= p5.mouseX && p5.mouseX <= 800 && 150 <= p5.mouseY && p5.mouseY <= 200){
        if(source == "bucket1"){
            bucket1 = 0;
            p5.fill(255);
            p5.rect(180, 100, 100, 330);//clear the background
            p5.rect(180, 50, 150, 35);//clear the text

            p5.fill(0);//new text value
            p5.text(bucket1 + " Gallons Full", 180, 75);
        }
        if(source == "bucket2"){
            bucket2 = 0;
            p5.fill(255);
            p5.rect(450, 340, 100, 90);//clear the background
            p5.rect(450, 290, 150, 35);

            p5.fill(0);
            p5.text(bucket2 + " Gallons Full", 450, 315);
        }
        source = null;
    }

    if (180 <= p5.mouseX && p5.mouseX <= 280 && 100 <= p5.mouseY && p5.mouseY <= 430) {
        if (source == null) {
            source = "bucket1";
            return;
        }
        if (source == "bucket1") {
            source = null;
            return;
        }

        if(bucket1 == 11) return;

        if (source == "bucket2") {
            p5.noStroke();

            let bucket1Copy = bucket1;
            bucket1 = bucket1 + bucket2 <= 11 ? bucket1 + bucket2 : 11;
            bucket2 = bucket1Copy + bucket2 <= 11 ? 0 : 3- (11 - bucket1Copy);

            p5.fill(255);//white rectangle to cover old text value
            p5.rect(180, 50, 150, 35);
            p5.rect(450, 290, 150, 35);

            p5.rect(180, 100, 100, 330);//clear the background
            p5.rect(450, 340, 100, 90);

            p5.fill(0);//new text value
            p5.text(bucket1 + " Gallons Full", 180, 75);
            p5.text(bucket2 + " Gallons Full", 450, 315);

            if (bucket1 > 0) {
                p5.fill(0, 80, 255);
                p5.rect(180, 430 - (bucket1 * 30), 100, bucket1 * 30);
            }

            if (bucket2 > 0) {
                p5.fill(0, 80, 255);
                p5.rect(450, 430 - (bucket2 * 30), 100, bucket2 * 30);
            }

            source = null;
            return;
        }

        if (source == "faucet") {
            p5.fill(0, 80, 255);
            p5.noStroke();

            bucket1 = 11;
            p5.rect(180, 430 - (bucket1 * 30), 100, bucket1 * 30);

            p5.fill(255);//white rectangle to cover old text value
            p5.rect(180, 50, 150, 35);

            p5.fill(0);//new text value
            p5.text(bucket1 + " Gallons Full", 180, 75);
            source = null;
            return;
        }
    }
    if (450 <= p5.mouseX && p5.mouseX <= 550 && 340 <= p5.mouseY && p5.mouseY <= 430) {
        if (source == null) {
            source = "bucket2";
            return;
        }
        if (source == "bucket2") {
            source = null;
            return;
        }

        if(bucket2 == 3) return;

        if (source == "bucket1") {
            p5.noStroke();

            let bucket2Copy = bucket2;
            bucket2 = bucket1 + bucket2 <= 3 ? bucket1 + bucket2 : 3;
            bucket1 = bucket1 + bucket2Copy <= 3 ? 0 : 11 - (3 - bucket2Copy);

            p5.fill(255);
            p5.rect(450, 290, 150, 35);
            p5.rect(180, 50, 150, 35);

            p5.rect(180, 100, 100, 330);//clear the background
            p5.rect(450, 340, 100, 90);

            p5.fill(0);
            p5.text(bucket2 + " Gallons Full", 450, 315);
            p5.text(bucket1 + " Gallons Full", 180, 75);

            if (bucket1 > 0) {
                p5.fill(0, 80, 255);
                p5.rect(180, 430 - (bucket1 * 30), 100, bucket1 * 30);
            }

            if (bucket2 > 0) {
                p5.fill(0, 80, 255);
                p5.rect(450, 430 - (bucket2 * 30), 100, bucket2 * 30);
            }

            source = null;
            return;
        }

        if (source == "faucet") {
            p5.fill(0, 80, 255);
            p5.noStroke();

            bucket2 = 3;
            p5.rect(450, 430 - (bucket2 * 30), 100, bucket2 * 30);

            p5.fill(255);
            p5.rect(450, 290, 150, 35);

            p5.fill(0);
            p5.text(bucket2 + " Gallons Full", 450, 315);
            source = null;
            return;
        }
    }
}

const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(900, 500).parent(canvasParentRef);
    p5.background(255);

    p5.rect(180, 100, 100, 330);//11 gallon bucket
    p5.rect(450, 340, 100, 90);//3 gallon bucket
    p5.rect(700, 50, 100, 50);//faucet

    p5.textSize(20);
    p5.text("11 Gallon Bucket", 180, 455);//bucket size titles
    p5.text("3 Gallon Bucket", 450, 455);

    p5.text(bucket1 + " Gallons Full", 180, 75);//current bucket amounts
    p5.text(bucket2 + " Gallons Full", 450, 315);

    p5.fill(255,255,0);
    p5.rect(700, 150, 100, 50);
};

const draw = (p5) => {
    if(source == null){
        p5.noStroke();
        p5.fill(255,0,0);
        p5.rect(700, 50, 100, 50);
    }

    if(source == "faucet"){
        p5.noStroke();
        p5.fill(0,0,255);
        p5.rect(700, 50, 100, 50);
    }
};

export default class Water extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={styles.vertical}>
                <h1><i>Move the Water</i></h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>How to Play</h2>
                        <p>Explanation goes here</p>
                    </div>
                    <Sketch className={styles.canvas} setup={setup} draw={draw} mouseClicked={fillBucket} />
                </div>
                {/* <Fact textContent={Math.floor(Math.random() * 10)} /> */}
            </div>
        );
    }
}