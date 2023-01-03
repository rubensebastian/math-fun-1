import React from "react";
import styles from "./layout.module.css";

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true,
        }
    }
    render() {
        return (
            <div className={styles.vertical}>
                <h1>About</h1>
                <p>Each year, the Department of Mathematics hosts FSU Math Fun Day, which is a free event for the community. Over 60 faculty, staff, and student volunteers engage with the community to demonstrate that <strong>math is fun</strong>! There are presentations, workshops, hands-on activities, and exhibits for the general public. The event is aimed toward upper-elementary, middle, and high school students, educators and parents.</p>
                <p>Math Fun Day was cancelled for the past two years for the safety of all participants of the event. It will be returning in February 2023! In the meantime, Math Fun Day Online will give a sampling of the events to come at the event, though the only way to know is to attend the event. We hope to see you there!</p>
                <section className={styles.vertical}>
                    <h2>About the FSU Math Department</h2>
                    <p>The Department of Mathematics at Florida State University is home to researchers, educators, students and a supporting staff that strive for excellence in mathematics. The cutting-edge research of our faculty and students covers a broad spectrum of pure and applied mathematics, creating a vibrant scientific atmosphere in the department.</p>
                </section>
                <section className={styles.vertical}>
                    <h2>About GEOSET</h2>
                    <p>GEOSET (Global Educational Outreach for Science Engineering and Technology) is an initiative founded by Sir Harry Kroto in 2006 to provide free video resources to educators and students. Today FSU Libraries carries the GEOSET torch by offering media production and training to the FSU community as one among many freely accessible library resources.</p>
                </section>
            </div>
        );
    }
}