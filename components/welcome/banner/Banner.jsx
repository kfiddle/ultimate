import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Disc } from "lucide-react";
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
