import React from "react";
import styles from "./CardHeader.module.css";

const CardHeader = ({ children, className }) => {
    return <div className={`${styles.cardHeader} ${className || ""}`}>{children}</div>;
};

export default CardHeader;
