import React from "react";
import styles from "./PlayerCard.module.css";

export default function PlayerCard({ player, isSelected, onToggle }) {
    return (
        <div onClick={onToggle} className={`${styles.card} ${isSelected ? styles.selected : ""}`}>
            <span className={styles.playerName}>{player.name}</span>
        </div>
    );
}
