import React from "react";
import styles from "./ScrollArea.module.css";

const ScrollArea = ({ children, className, style }) => {
    return (
        <div className={`${styles.scrollArea} ${className || ""}`} style={style}>
            <div className={styles.viewport}>{children}</div>
        </div>
    );
};

export default ScrollArea;
