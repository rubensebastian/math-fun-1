import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";

export default class Infocard extends React.Component {
    render() {
        return(
            <div className={styles.infoCard}>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <Link href={this.props.linkDestination}><a>Go to {this.props.title} &rarr;</a></Link>
            </div>
        );
    }
}