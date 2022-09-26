import React from "react";
import styles from "./layout.module.css";
import Link from 'next/link';
import Image from 'next/image'
import seal from "../assets/fsu-seal-black.png"

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
            <Image src={seal} width="100" height="100" alt="This website is associated with FSU." />
            <p className={styles.largerText}>Produced by <Link href='https://geoset.fsu.edu'><a className={styles.promoLink}>GEOSET</a></Link> in collaboration with <Link href='https://math.fsu.edu'><a  className={styles.promoLink} >FSU Mathematics</a></Link></p>
            <nav className={styles.menuContainer}>
                <MenuLink location='' />
                <MenuLink location='/games' locationName='Math Games' />
                <MenuLink location='/activities' locationName='Interactive Math' />
                <MenuLink location='/about' locationName='About' />
            </nav>
        </div>
    );
}