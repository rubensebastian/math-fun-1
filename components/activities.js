import React from "react";
import styles from "./layout.module.css";
import Infocard from "./infocard";

export default class Activities extends React.Component {
    render() {
        return (
            <div className={styles.vertical}>
                <h1>Interactive Math</h1>
                <div className={styles.infoCardHolder}>
                    <Infocard title="Caesar Cipher" call="Encode your message" description="The Caesar Cipher, invented by Roman Emperor Julius Caesar, is a method to send coded messages. Put in your secret message, encode it, and share it with your friends!" linkDestination="/activities/caesar-cipher" />
                    <Infocard title="Target Number"  call="Find the target number" description="In this activity, you'll be given a set of numbers, try to add, subtract, or multiply them to reach the target number!" linkDestination="/activities/target" />
                    <Infocard title="Numbers in Art" call="Learn about numbers in art" description="You've probably learned about the primary colors in your classes, but did  you know that all color on the internet is made of numbers? Lean how numbers create color!" linkDestination="/activities/colors" />
                    <Infocard title="Tessellation" call="Learn how to tessellate" description="Some shapes can be fitted together with no gaps is overlaps, while other shapes cannot. Why is this? Visualize tessellation and find out!" linkDestination="/activities/tessellation" />
                    <Infocard title="How Much is One Billion?" call="Learn how much one billion is" description="You  may know how much one hundred is, or even one thousand. But what about one million or one billion? Once the numbers start to get that large, we need to use other ways to visualize it!" linkDestination="/activities/billion" />
                </div>
                <h2>Math Games</h2>
                <div className={styles.infoCardHolder}>
                    <Infocard title="Nim" call="Play Nim" description="Nim is a game where the objective is to take candy, but not the last one. There's a way to always win this game—try to figure it out!" linkDestination="/activities/nim" />
                    <Infocard title="Nim 2" call="Play Nim 2" description="In this variation on Nim, you want to take the last candy instead. The logic is different from regular Nim, so try to figure it out!" linkDestination="/activities/nim2" />
                    <Infocard title="Water Cups" call="Play Water Cups" description="In this game, you have two buckets and unlimited water. Fill and empty the buckets to get the target amount of water!" linkDestination="/activities/water" />
                    <Infocard title="Minesweeper" call="Play Minesweeper" description="Minesweeper is a game of luck and strategy. You can figure out parts of it and may need to guess for other parts. Take the challenge if you're up for it!" linkDestination="/activities/mines" />
                    <Infocard title="Card Switching" call="Play Card Switching" description="A game of probability, this will test your knowledge and your luck. Simply decide whether to trade your card for the hidden one, and find out if you win!" linkDestination="/activities/cards" />
                </div>
            </div>
        );
    }
}