import React, { useContext } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { GameContext } from '../contextProviders/GameContext.jsx';
import styles from "./Clock.module.css";

const Clock = () => {
    const { gameState, startClock, stopClock, resetClock } = useContext(GameContext);
    const { time, isClockRunning } = gameState;

    const toggleTimer = () => {
        if (isClockRunning) {
            stopClock();
        } else {
            startClock();
        }
    };

    const handleResetTimer = () => {
        resetClock();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className={styles.clockContainer}>
            <div className={styles.timeDisplay}>{formatTime(time)}</div>
            <button 
                className={`${styles.button} ${styles.playPauseButton}`} 
                onClick={toggleTimer} 
                aria-label={isClockRunning ? "Pause game timer" : "Start game timer"}
            >
                {isClockRunning ? <Pause className={styles.icon} /> : <Play className={styles.icon} />}
            </button>
            <button 
                className={`${styles.button} ${styles.resetButton}`} 
                onClick={handleResetTimer} 
                aria-label="Reset game timer"
            >
                <RotateCcw className={styles.icon} />
            </button>
        </div>
    );
};

export default Clock;