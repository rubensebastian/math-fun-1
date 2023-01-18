import React from "react";
import styles from "../components/layout.module.css";

export default class Fact extends React.Component {
hideFact = () => {
    document.getElementById("factContainer").hidden = true;
}

    render() {
        let textContent;
        if (this.props.textContent == 0) {
            textContent = "In Ancient Egypt, Hypatia was the first known female teacher of mathematics. She made grounbreaking strides in math and astronomy, and recorded extensive notes on other mathematicians' works."
        }
        if (this.props.textContent == 1) {
            textContent = "In the midst of the French Revolution, Sophie Germain began educating herself on classical works of mathematics. She would go on to collaborate with Lagrange and win an award from the French Academy of Sciences for her theory of elasticity."
        }
        if (this.props.textContent == 2) {
            textContent = "Widely condisered the first computer programmer (from the 1800s), Ada Lovelace worked with Charles Babbage on his analytic engine, a very basic calculator. She took it a step farther, developing an algorithm to findi Bernoulli Numbers."
        }//here
        if (this.props.textContent == 3) {
            textContent = "At a time when Russian women could not attend college, Sofia Kovalevskaya moved to Germany and earned a doctorate in mathematics. Her work ranged from differential equations to the rings of Saturn. She became a professor at the university of Stockholm and earned awards from the Academy of Sciences in France and in Sweden."
        }
        if (this.props.textContent == 4) {
            textContent = "Fleeing from Nazi Germany, Emmy Noether came to work at Princeton's Institute for Advanced Study. In her two years there, she laid the foundations for Einstein's Theory of Relativity, as well as making contributions to the field of Abstract Algebra."
        }
        if (this.props.textContent == 5) {
            textContent = "A humble math teacher in Virginia, Dorothy Vaughn joined NACA (NASA's predecessor) during wartime efforts in the 1940s. In an era of racial segregation, she went on to lead a team of all-black, female mathematicians who helped put satellites into orbit around earth."
        }
        if (this.props.textContent == 6) {
            textContent = "In Ancient Egypt, Hypatia was the first known female teacher of mathematics. She made grounbreaking strides in math and astronomy, and recorded extensive notes on other mathematicians' works."
        }
        if (this.props.textContent == 7) {
            textContent = "Widely condisered the first computer programmer (from the 1800s), Ada Lovelace worked with Charles Babbage on his analytic engine, a very basic calculator. She took it a step farther, developing an algorithm to findi Bernoulli Numbers."
        }
        if (this.props.textContent == 8) {
            textContent = "Valerie Thomas was working at NASA when she invented the Illusion Transmitter. This device is still used by NASA, as well as in video games and movies. She also helped pioneer a network that would help shape the current Internet."
        }
        if (this.props.textContent == 9) {
            textContent = "Maryam Mirzakhani was an Iranian mathematician and math professor at Stanford University. She was the first (and only) woman to win a Fields Medal, the highest honor a mathematician can receive."
        }
        return (
            <div id="factContainer" className={styles.factContainer}>
                <p hidden={false} className={styles.fact}><span className={styles.largerText}><strong>Women in Math</strong></span><br></br>{textContent}</p>
                <button aria-label="Hide the math fun facts window" onClick={this.hideFact} className={styles.factClose}>&times;</button>
            </div>
        );
    }
}