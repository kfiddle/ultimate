import React, { useState } from 'react';
import styles from './PlayerStats.module.css';

const initialPlayers = [
  { name: "Alice", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "Bob", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "Charlie", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "David", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "Eve", active: true, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "Frank", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  { name: "Grace", active: false, stats: { hasDisc: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
];

export default function PlayerStats() {
  const [players, setPlayers] = useState(initialPlayers);

  const togglePlayerActive = (playerName) => {
    setPlayers(players.map(p =>
      p.name === playerName ? { ...p, active: !p.active } : p
    ));
  };

  const updateStat = (playerName, stat, increment) => {
    setPlayers(players.map(p =>
      p.name === playerName ? { ...p, stats: { ...p.stats, [stat]: Math.max(0, p.stats[stat] + (increment ? 1 : -1)) } } : p
    ));
  };

  return (
    <div className={styles.chartContainer}>
      <table className={styles.statsTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Player</th>
            {Object.keys(players[0].stats).map(stat => (
              <th key={stat} className={styles.headerCell}>{stat.replace(/([A-Z])/g, ' $1').trim()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <React.Fragment key={player.name}>
              {index === players.filter(p => p.active).length && (
                <tr>
                  <td colSpan={6} className={styles.separator}></td>
                </tr>
              )}
              <tr className={player.active ? styles.activePlayer : styles.inactivePlayer}>
                <td className={styles.playerNameCell}>
                  <button 
                    className={styles.playerNameButton}
                    onClick={() => togglePlayerActive(player.name)}
                  >
                    {player.name}
                  </button>
                </td>
                {Object.entries(player.stats).map(([stat, value]) => (
                  <td key={stat} className={styles.statCell}>
                    <button 
                      className={styles.statButton}
                      onClick={() => updateStat(player.name, stat, true)}
                    >
                      <span className={styles.statLabel}>{stat}</span>
                      <span className={styles.statValue}>{value}</span>
                    </button>
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