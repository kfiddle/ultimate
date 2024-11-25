import React from "react";
import styles from "./CardDescription.module.css";

const CardDescription = ({ children, className }) => {
    return <p className={`${styles.cardDescription} ${className || ""}`}>{children}</p>;
};

export default CardDescription;
