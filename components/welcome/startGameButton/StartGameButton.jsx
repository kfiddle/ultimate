import React from "react";
import Button from "../../ui/button/Button.jsx";
import styles from "./StartGameButton.module.css";

export default function StartGameButton({ onClick, disabled }) {
    return (
        <Button onClick={onClick} disabled={disabled} className={styles.button}>
            Start Game
        </Button>
    );
}
