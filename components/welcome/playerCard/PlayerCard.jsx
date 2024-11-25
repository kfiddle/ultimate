import React from "react";
import styles from "./PlayerCard.module.css";

const PlayerCard = ({ player, isSelected, onToggle }) => {
    return (
        <div onClick={onToggle} className={`${styles.card} ${isSelected ? styles.selected : styles.unselected}`}>
            <span className={styles.playerName}>{player.name}</span>
        </div>
    );
};

export default PlayerCard;
