import React from "react";
import styles from "../styles/layout.module.css";
import Link from 'next/link';

function MenuLink(props) {
    return props.location == '' ?
        <Link href='/'>
            <a className={styles.menuLink}><li className={styles.menuOption}>Home</li></a>
        </Link> :
        <Link href={props.location}>
            <a className={styles.menuLink}><li className={styles.menuOption}>{props.locationName}</li></a>
        </Link>;
}

export default function Menu() {
    return (
        <div className={styles.fsuHolder}>
            <nav className={styles.menuContainer}>
                <MenuLink location='' />
                <MenuLink location='/activities' locationName='Interactive Math & Games' />
            </nav>
        </div>
    );
}