import React from "react";
import styles from "./CardTitle.module.css";

const CardTitle = ({ children, className }) => {
    return <h2 className={`${styles.cardTitle} ${className || ""}`}>{children}</h2>;
};

export default CardTitle;
