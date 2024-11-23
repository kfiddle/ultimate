import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, disabled, children, variant = "primary", type = "button" }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${styles.button} ${styles[variant]}`} type={type}>
            {children}
        </button>
    );
};

export default Button;
