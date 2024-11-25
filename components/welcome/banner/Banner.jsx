import React from "react";

import CardHeader from "../../ui/cardHeader/CardHeader.jsx";
import CardTitle from "../../ui/cardTitle/CardTitle.jsx";
import CardDescription from "../../ui/cardDescription/CardDescription.jsx";

import Disc from "../../disc/Disc.jsx";
import styles from "./Banner.module.css";

export default function Banner({ teamName, gameName, opposingTeam }) {
    return (
        <CardHeader className={styles.banner}>
            <div className={styles.teamInfo}>
                <Disc className={styles.discIcon} />
                <CardTitle className={styles.teamName}>{teamName}</CardTitle>
            </div>
            <CardDescription className={styles.gameInfo}>
                {gameName} vs {opposingTeam}
            </CardDescription>
        </CardHeader>
    );
}
