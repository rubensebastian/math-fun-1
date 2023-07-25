import React from "react";
import styles from "./styles/layout.module.css";
import Image from 'next/image'
import candy from '../assets/candy.png'

const Million = () => {
    return (
        <div>
            <p>Now that you&apos;ve reached 1,000, you might be wondering how much one million is. As a number, it looks like 1,000,000. That&apos;s only a few more 0s, so it must not be that much larger than 1,000, right? You&apos;ll need to scroll down or zoom out to see just how big one million is (actual scale). The blue line is one thousand, and the yellow line is one million.</p>
            <div className={styles.moneyChart}>
                <p>One Thousand__</p>
                <p>One Million</p>
            </div>
            <div className={styles.moneyChart}>
                <div className={styles.thousandHeight}></div>
                <div className={styles.millionHeight}></div>
            </div>
        </div>
    );
}

const MilMillion = () => {
    return (
        <div>
            <p>So you decided to see what one billion looks like. It&apos;s probably meaningless to you—just one endless bar, so here are some facts to put it into perspective:</p>
            <ul>
                <li>One thousand seconds is about <strong>17 minutes</strong>. One million seconds is about <strong>11 days</strong>. One billion seconds is about <strong>32 years</strong>.</li>
                <li>One thousand yards is about half a mile. One million yards is about 570 miles. One billion yards is about 570,000 miles, enough to travel to the moon and back.</li>
                <li>If you spent 1,000 dollars every single day on clothes, games, food, etc., it would take you over 2,700 years to spend it all. In other words, if you had earned 1,000 dollars a day since the start of the Roman Republic in 509 BCE, you still wouldn&apos;t have one billion dollars.</li>
            </ul>
            <p>Basically, the difference between one million and one billion is, roughly, one billion.</p>
            <div className={styles.moneyChart}>
                <p>One Thousand__</p>
                <p>One Million__</p>
                <p>One Billion</p>
            </div>
            <div className={styles.moneyChart}>
                <div className={styles.thousandHeight}></div>
                <div className={styles.millionHeight}></div>
                <div className={styles.billionHeight}></div>
            </div>
        </div>
    );
}

export default class Billion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            showMillion: false,
            showBillion: false,
        }
    }

    increaseCount = () => {
        if (this.state.counter < 100) {
            this.setState(state => ({
                counter: state.counter + 1,
            }));
            return;
        }
        if (this.state.counter >= 990) {
            this.setState({ showMillion: true });
        }
        if (this.state.counter < 1000) {
            this.setState(state => ({
                counter: state.counter + 10,
            }));
            return;
        }
    }

    showBillion = () => {
        this.setState({showBillion: true})
    }

    skipAhead = () => {
        this.setState({
            counter: 1000,
            showMillion: true
        })
    }

    render() {
        return (
            <div className={styles.vertical}>
                <h1><i>How Much is a Billion?</i></h1>
                <div className={styles.horizontal}>
                    <div className={styles.info}>
                        <h2>Candy Counter</h2>
                        {this.state.showMillion ? null : <p>Increase your candy amount to 1,000 to win!</p>}
                        {this.state.counter >= 100 && !this.state.showMillion ? <p>Now your candy will increase by 10 each time!</p> : null}
                        {this.state.showMillion ? null : <div className={styles.horizontal}><Image src={candy}></Image><p className={styles.extraLarge}>{this.state.counter}</p></div>}
                        {this.state.showMillion ? null : <button className={styles.btn} onClick={this.increaseCount}>Increase Counter</button>}
                        {this.state.showMillion ? null : <button className={styles.btn} onClick={this.skipAhead}>Just Show Me One Million</button>}
                        {this.state.showMillion && !this.state.showBillion ? <button onClick={this.showBillion} className={styles.btn}>Click to see how much one billion is</button>: null}
                        {this.state.showMillion && !this.state.showBillion ? <Million></Million> : null}
                        {this.state.showBillion ? <MilMillion></MilMillion> : null}
                    </div>
                </div>
            </div>
        );
    }
}