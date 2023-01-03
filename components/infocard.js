import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from 'next/image'

export default class Infocard extends React.Component {
    render() {
        return (
            <div className={styles.infoCard}>
                <h2 className={styles.infoH}>{this.props.title}</h2>
                <p className={styles.infoP}>{this.props.description}</p>
                <Link href={this.props.linkDestination}><a>{this.props.call} &rarr;</a></Link>
            </div>
        );
    }
}