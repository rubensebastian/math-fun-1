import React from "react";
import styles from "./layout.module.css";

let operations = ["+", "-", "*"]

class Explanation extends React.Component {
    render () {
        return(
            <div className={styles.targetExplanation}>
                <h2 className={styles.targetHeading}>How to Play</h2>
                <p>Begin by selecting your difficulty level. Random numbers will be generated, along with a target value. Using basic operations (addtion, subtraction, multiplication), combine the numbers to reach the target value.</p>
                <p><strong>Important Note</strong>: Normal PEMDAS order of operations does not apply here. Instead, apply the operations in order from left to right. For example, if you have 3 + 5 * 7, it will <em>not</em> evaluate that to 38; it will evaluate it to (3 + 5) * 7 = 56.</p>
                <p><strong>Tip 1</strong>: Pay attention to how big the target number is (it will always be a positive number). If you only have three numbers and the target is in the hundreds, you should use multiplication. On the other hand, if you have five numbers and the target value is around 20, you may want to use more addition and subtraction.</p>
                <p><strong>Tip 2</strong>: Your immediate idea may be to play with the generated numbers, but this can actually be harder. Instead, it's often easier to start with the target value and work your way backwards. For example, if you have the numbers 3, 5, 6, and 8, and a target of 50, start by thinking about your final step. What two numbers could you multiply together to get to 50? Your options are 2 & 25 or 5 & 10. There is no 2 or 25, but there is a 5. Now we have simplified this problem: can you make 10 with 3, 6, and 8 (which you will then multiply by 5 to get to 50)?</p>
            </div>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: null,
        }
    }
    calculateCurrentTotal = () => {
        let value1 = parseInt(document.getElementById("value1").value);
        let value2 = parseInt(document.getElementById("value2").value);
        let value3 = parseInt(document.getElementById("value3").value);
        let value4;
        let value5;
        if (this.props.level == "hard" || this.props.level == "insane") {
            value4 = parseInt(document.getElementById("value4").value);
        }
        if (this.props.level == "insane") {
            value5 = parseInt(document.getElementById("value5").value);
        }

        let operator1 = document.getElementById("operator1").value;
        let operator2 = document.getElementById("operator2").value;
        let operator3;
        let operator4;
        if (this.props.level == "hard" || this.props.level == "insane") {
            operator3 = document.getElementById("operator3").value;
        }
        if (this.props.level == "insane") {
            operator4 = document.getElementById("operator4").value;
        }

        let currentNumber = 0;
        currentNumber = operator1 == "+" ? value1 + value2 : operator1 == "-" ? value1 - value2 : value1 * value2;
        currentNumber = operator2 == "+" ? currentNumber + value3 : operator2 == "-" ? currentNumber - value3 : currentNumber * value3;
        if (value4 != null) {
            currentNumber = operator3 == "+" ? currentNumber + value4 : operator3 == "-" ? currentNumber - value4 : currentNumber * value4;
        }
        if (value5 != null) {
            currentNumber = operator4 == "+" ? currentNumber + value5 : operator4 == "-" ? currentNumber - value5 : currentNumber * value5;
        }
        this.setState({ currentValue: currentNumber });
    }

    render() {
        if (!this.props.shown) {
            return;
        }
        return (
            <div>
                <p>Your values are:{this.props.values.map((value, index) => <span key={index} value={value}> {value}</span>)}</p>
                <select id="value1" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{this.props.values.map((value, index) => <option key={index} value={value}>{value}</option>)}</select>
                <select id="operator1" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{operations.map((operator, index) => <option key={index} value={operator}>{operator}</option>)}</select>
                <select id="value2" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{this.props.values.map((value, index) => <option key={index} value={value}>{value}</option>)}</select>
                <select id="operator2" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{operations.map((operator, index) => <option key={index} value={operator}>{operator}</option>)}</select>
                <select id="value3" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{this.props.values.map((value, index) => <option key={index} value={value}>{value}</option>)}</select>
                {this.props.level == "hard" || this.props.level == "insane" ? <select id="operator3" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{operations.map((operator, index) => <option key={index} value={operator}>{operator}</option>)}</select> : null}
                {this.props.level == "hard" || this.props.level == "insane" ? <select id="value4" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{this.props.values.map((value, index) => <option key={index} value={value}>{value}</option>)}</select> : null}
                {this.props.level == "insane" ? <select id="operator4" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{operations.map((operator, index) => <option key={index} value={operator}>{operator}</option>)}</select> : null}
                {this.props.level == "insane" ? <select id="value5" onChange={this.calculateCurrentTotal} className={styles.dropdown}>{this.props.values.map((value, index) => <option key={index} value={value}>{value}</option>)}</select> : null}
                <div>Your target value is: {this.props.target}</div>
                <div>Your current value is: {this.state.currentValue}</div>
                {this.state.currentValue == this.props.target ? <div>Congratulations!</div> : null}
            </div>
        );
    }
}

export default class Target extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],//target number comes first
            level: null,
            calculatorShown: false
        }
    }

    showCalculator = (difficulty) => {
        let targetNumber;
        let num1 = Math.floor(Math.random() * 8 + 2);
        let num2 = Math.floor(Math.random() * 8 + 2);
        let num3 = Math.floor(Math.random() * 8 + 2);
        let num4 = Math.floor(Math.random() * 8 + 2);
        let num5 = Math.floor(Math.random() * 8 + 2);
        let operator1 = operations[Math.floor(Math.random() * 3)];
        let operator2 = operations[Math.floor(Math.random() * 3)];
        let operator3 = operations[Math.floor(Math.random() * 3)];
        let operator4 = operations[Math.floor(Math.random() * 3)];

        targetNumber = operator1 == "+" ? num1 + num2 : operator1 == "-" ? num1 - num2 : num1 * num2;
        targetNumber = operator2 == "+" ? targetNumber + num3 : operator2 == "-" ? targetNumber - num3 : targetNumber * num3;
        let valuesArray = [num1, num2, num3];//this is the easy case

        if (difficulty == "hard") {
            targetNumber = operator3 == "+" ? targetNumber + num4 : operator3 == "-" ? targetNumber - num4 : targetNumber * num4;
            valuesArray.push(num4);
        }
        if (difficulty == "insane") {
            targetNumber = operator3 == "+" ? targetNumber + num4 : operator3 == "-" ? targetNumber - num4 : targetNumber * num4;
            targetNumber = operator4 == "+" ? targetNumber + num5 : operator4 == "-" ? targetNumber - num5 : targetNumber * num5;
            valuesArray.push(num4, num5);
        }

        targetNumber = Math.abs(targetNumber);

        valuesArray.sort(function (a, b) { return a - b });
        this.setState({
            targetValue: targetNumber,
            values: valuesArray,
            level: difficulty,
            calculatorShown: true,
        })
    }


    render() {
        return (
            <div className={styles.vertical}>
                <h1 className={styles.targetHeading}>Find the Target</h1>
                <p>Please select your difficulty level:</p>
                <div>
                    <button className={styles.btn} onClick={() => this.showCalculator("easy")}>Normal</button>
                    <button className={styles.btn} onClick={() => this.showCalculator("hard")}>Hard</button>
                    <button className={styles.btn} onClick={() => this.showCalculator("insane")}>Insane</button>
                </div>
                <Calculator shown={this.state.calculatorShown} values={this.state.values} target={this.state.targetValue} level={this.state.level} />
                <Explanation />
            </div>
        )
    }
}