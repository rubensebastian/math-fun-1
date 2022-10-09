import React from "react";
import styles from "./layout.module.css";
import Link from 'next/link';
import Infocard from "./infocard";

export default class Activities extends React.Component {
    render() {
        return (
            <div className={styles.vertical}>
                <h1>Interactive Math</h1>
                <div className={styles.infoCardHolder}>
                    <Infocard title="Caesar Cipher" description="This is about Caesar Cipher" linkDestination="/activities/caesar-cipher" />
                    <Infocard title="Target Number" description="This is about Target Number" linkDestination="/activities/target" />
                    <Infocard title="Numbers in Art" description="This is about Numbers in Art" linkDestination="/activities/colors" />
                    <Infocard title="Tessellation" description="This is about Tessellation" linkDestination="/activities/tessellation" />
                </div>
            </div>
        );
    }
}