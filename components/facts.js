import React from "react";
import styles from "../components/layout.module.css";

export default class Fact extends React.Component {
hideFact = () => {
    document.getElementById("factContainer").hidden = true;
}

    render() {
        let textContent;
        if (this.props.textContent == 0) {
            textContent = "Hypatia is considered the first known female math teacher in history and was also known for teaching astronomy and how to use an astrolabe device to model astronomical events."
        }
        if (this.props.textContent == 1) {
            textContent = "Sophie Germain was born in Paris, France in 1776 and become infatuated with mathematics at a young age. As a teenager, she spent her time reading every mathematics books available in her library and taught herself Latin so she could study the works of Issac Newton and Euler."
        }
        if (this.props.textContent == 2) {
            textContent = "Ada Lovelace was an English Mathematician who is regarded as the world’s first computer programmer! In 1836, she wrote the world’s first computer program known as an algorithm for an Analytical Engine to compute Bernoulli numbers."
        }
        if (this.props.textContent == 3) {
            textContent = "Sofia Kovalevskaya's greatest contribution to the field of mathematics was in her studies of differential equations and elliptic integrals, namely in relation to understanding the workings of Saturn and its rings."
        }
        if (this.props.textContent == 4) {
            textContent = "Noether is best known for discovering Noether’s Theorem, which links mathematics and physics in an extremely important way. The theorem, which is named after her, relates the laws of nature and conservation to mathematical symmetry and how we understand the universe."
        }
        if (this.props.textContent == 5) {
            textContent = "Dorothy Vaughn worked on a racially segregated team of computer programmers assigned with using supercomputers to perform computations associated with NASA space launches, including sending astronaut John Glenn into orbit in 1962."
        }
        if (this.props.textContent == 6) {
            textContent = "Katherine Johnson spent 35 years working for NASA and developed a reputation for being a master at performing difficult and complex calculations. She went on to help pioneer the use of computer science and programming to do complex math calculations for NASA."
        }
        if (this.props.textContent == 7) {
            textContent = "Julia Robinson spent decades working on Hilbert’s tenth problem, which was widely considered unsolvable by the mathematics community, she and a small team found a solution in 1980—a groundbreaking achievement!"
        }
        if (this.props.textContent == 8) {
            textContent = "Valerie Thomas is a distinguished scientist and is best known for inventing the llusion Transmitter—a 3-Dimensional Imaging Technology that was the first of its kind when it debuted in 1980. In fact, this technology is the basis for modern 3D imaging tech that we see in modern televisions, video games, and movies!"
        }
        if (this.props.textContent == 9) {
            textContent = "Maryam Mirzakhani was an Iranian mathematician and math professor at Stanford University. In high school, Mirzakhani and her best friend became the first Iranian women to qualify for the Mathematical Olympiad."
        }
        return (
            <div id="factContainer" className={styles.factContainer}>
                <p hidden={false} className={styles.fact}><span className={styles.largerText}><strong>Math Fun Fact</strong></span><br></br>{textContent}</p>
                <button aria-label="Hide the math fun facts window" onClick={this.hideFact} className={styles.factClose}>&times;</button>
            </div>
        );
    }
}