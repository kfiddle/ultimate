import React from "react";
import styles from "./PlayerName.module.css";

const PlayerName = ({ player, onToggleActive, isActive }) => {
    return (
        <button className={`${styles.playerNameButton} ${isActive ? styles.activePlayer : styles.inactivePlayer}`} onTouchEnd={() => onToggleActive(player)}>
            {player.name}
        </button>
    );
};

export default PlayerName;
