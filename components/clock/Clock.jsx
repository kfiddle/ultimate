import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import styles from "./Clock.module.css";

const Clock = ({ initialTime = 0, onTimeUpdate }) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;
                    onTimeUpdate(newTime);
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, onTimeUpdate]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        onTimeUpdate(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // aria-live="polite"

    return (
        <div className={styles.clockContainer}>
            <div className={styles.timeDisplay}>{formatTime(time)}</div>
            <button className={`${styles.button} ${styles.playPauseButton}`} onClick={toggleTimer} aria-label={isRunning ? "Pause game timer" : "Start game timer"}>
                {isRunning ? <Pause className={styles.icon} /> : <Play className={styles.icon} />}
            </button>
            <button className={`${styles.button} ${styles.resetButton}`} onClick={resetTimer} aria-label="Reset game timer">
                <RotateCcw className={styles.icon} />
            </button>
        </div>
    );
};

export default Clock;
