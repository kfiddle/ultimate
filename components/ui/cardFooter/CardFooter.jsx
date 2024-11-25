import React from "react";
import styles from "./CardFooter.module.css";

const CardFooter = ({ children, className }) => {
    return <div className={`${styles.cardFooter} ${className || ""}`}>{children}</div>;
};

export default CardFooter;
