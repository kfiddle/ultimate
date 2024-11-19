import React from "react";

const Disc = ({ size = 40, color = "currentColor", ...props }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(-20 12 12)" />
            <path d="M3.5 9.5c1.5-3.5 5-6 8.5-6s7 2.5 8.5 6" transform="rotate(-20 12 12)" />
            <path d="M20.5 14.5c-1.5 3.5-5 6-8.5 6s-7-2.5-8.5-6" transform="rotate(-20 12 12)" />
            <ellipse cx="12" cy="12" rx="4" ry="2.5" transform="rotate(-20 12 12)" />
        </svg>
    );
};

export default Disc;
