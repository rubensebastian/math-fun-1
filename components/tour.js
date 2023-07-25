import React from "react";
import styles from "./layout.module.css";
import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

let drawGraph = false;

const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(750, 500).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(5);
};

const draw = (p5) => {
    if (drawGraph != false) {
        p5.noStroke();
        p5.fill(0);
        p5.background(255)
        for (let point of drawGraph) {
            p5.circle(point["xValue"], point["yValue"], 20);
        }
    }
};

export default class Tour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGraph: false,
        }
    }

    createGraph = () => {
        let graph = [];//array of objects
        let numberOfVertices = Math.floor(Math.random() * 5 + 5);
        for (let i = 0; i < numberOfVertices; i++) {
            // let numberOfPaths = Math.floor((Math.random() * 4 + 1)) * 2;
            // let possiblePaths = Array.from({length: numberOfPaths}, (x, j) => j);
            // possiblePaths.splice(i,1);
            // let connectingPaths = [];

            // for(let j = 0; j < numberOfPaths; j++){
            //     let selectedPath = possiblePaths.splice(Math.floor(Math.random() * possiblePaths.length), 1);
            // }
            let vertex = {
                "xValue": Math.floor(Math.random() * 720 + 15),
                "yValue": Math.floor(Math.random() * 470 + 15),
            };
            graph.push(vertex);
        }
        drawGraph = [...graph];
        this.setState({
            currentGraph: [...graph]
        })
    }

    render() {
        return (
            <div className={styles.vertical}>
                <h1>Tour</h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>How to Play</h2>
                        <p>Explanation goes here</p>
                        <button onClick={this.createGraph} className={styles.btn}>Create new graph</button>
                    </div>
                    <div>
                        <Sketch setup={setup} draw={draw} />
                    </div>
                </div>
            </div>
        );
    }
}