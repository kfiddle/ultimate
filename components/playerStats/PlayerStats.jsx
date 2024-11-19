import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./PlayerStats.module.css";

const initialPlayers = [
    { name: "Alice", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Bob", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Charlie", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "David", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Eve", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Frank", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Grace", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Pauly", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Dom", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: "Vinnie", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
];

export default function PlayerStats() {
    const [players, setPlayers] = useState(initialPlayers);
    const [menuOpen, setMenuOpen] = useState(null);
    const timerRef = useRef(null);
    const longPressRef = useRef(null);
    const containerRef = useRef(null);
    const lastUpdateRef = useRef(null);

    const togglePlayerActive = (playerName) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.map((p) => (p.name === playerName ? { ...p, active: !p.active } : p));
            return [...updatedPlayers.filter((p) => p.active), ...updatedPlayers.filter((p) => !p.active)];
        });
    };

    const updateStat = useCallback((playerName, stat, increment) => {
        const now = Date.now();
        if (lastUpdateRef.current && now - lastUpdateRef.current < 100) {
            return; // Prevent rapid consecutive updates
        }
        lastUpdateRef.current = now;

        setPlayers((prevPlayers) => prevPlayers.map((p) => (p.name === playerName ? { ...p, stats: { ...p.stats, [stat]: Math.max(0, p.stats[stat] + (increment ? 1 : -1)) } } : p)));
    }, []);

    const handleTouchStart = useCallback((playerName, stat, event) => {
        event.preventDefault(); // Prevent default touch behavior
        longPressRef.current = null;
        timerRef.current = setTimeout(() => {
            longPressRef.current = true;
            setMenuOpen({ playerName, stat });
        }, 500);
    }, []);

    const handleTouchEnd = useCallback(
        (playerName, stat, event) => {
            event.preventDefault(); // Prevent default touch behavior
            clearTimeout(timerRef.current);
            if (longPressRef.current === null) {
                updateStat(playerName, stat, true);
            }
            longPressRef.current = null;
        },
        [updateStat]
    );

    const handleMenuAction = (playerName, stat, increment) => {
        updateStat(playerName, stat, increment);
        setMenuOpen(null);
    };

    const closeMenu = () => {
        setMenuOpen(null);
    };

    useEffect(() => {
        const handleTouchOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("touchstart", handleTouchOutside);
        return () => {
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, []);

    return (
        <div className={styles.chartContainer} ref={containerRef}>
            <table className={styles.statsTable}>
                <thead>
                    <tr>
                        <th className={styles.headerCell}>Player</th>
                        {Object.keys(players[0].stats).map((stat) => (
                            <th key={stat} className={styles.headerCell}>
                                {stat.replace(/([A-Z])/g, " $1").trim()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <React.Fragment key={player.name}>
                            {index === players.filter((p) => p.active).length && (
                                <tr>
                                    <td colSpan={6} className={styles.separator}></td>
                                </tr>
                            )}
                            <tr className={player.active ? styles.activePlayer : styles.inactivePlayer}>
                                <td className={styles.playerNameCell}>
                                    <button className={styles.playerNameButton} onTouchEnd={() => togglePlayerActive(player.name)}>
                                        {player.name}
                                    </button>
                                </td>
                                {Object.entries(player.stats).map(([stat, value]) => (
                                    <td key={stat} className={styles.statCell}>
                                        <button
                                            className={`${styles.statButton} ${!player.active ? styles.inactiveStatButton : ""}`}
                                            onTouchStart={(e) => handleTouchStart(player.name, stat, e)}
                                            onTouchEnd={(e) => handleTouchEnd(player.name, stat, e)}
                                            disabled={!player.active}
                                        >
                                            <span className={styles.statLabel}>{stat}</span>
                                            <span className={styles.statValue}>{value}</span>
                                        </button>
                                        {menuOpen && menuOpen.playerName === player.name && menuOpen.stat === stat && (
                                            <div className={styles.longPressMenu}>
                                                <button onTouchEnd={() => handleMenuAction(player.name, stat, false)}>Decrement</button>
                                                <button onTouchEnd={() => handleMenuAction(player.name, stat, true)}>Increment</button>
                                                <button onTouchEnd={closeMenu}>Cancel</button>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
