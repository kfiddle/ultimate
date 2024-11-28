import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';

import StatCell from './statButton/StatCell.jsx';
import PlayerName from './playerName/PlayerName.jsx';

import styles from './PlayerStats.module.css';

const stats = ['hasDisc', 'goal', 'def', 'drop', 'throw', 'stall'];

export default function PlayerStats() {
  const { gameState, dispatch } = useContext(GameContext);
  const { presentPlayers } = gameState;

  const [players, setPlayers] = useState(presentPlayers);
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

    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((p) => {
        if (p.name === playerName) {
          const newValue = Math.max(0, p.stats[stat] + (increment ? 1 : -1));
          if (stat === 'hasDisc') {
            return {
              ...p,
              stats: { ...p.stats, [stat]: newValue > 0 ? 1 : 0 },
            };
          }
          return { ...p, stats: { ...p.stats, [stat]: newValue } };
        } else if (stat === 'hasDisc' && increment) {
          return { ...p, stats: { ...p.stats, hasDisc: 0 } };
        }
        return p;
      });
      return updatedPlayers;
    });
  }, []);

  const handleTouchStart = useCallback((playerName, stat, event) => {
    event.preventDefault();
    longPressRef.current = null;
    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      setMenuOpen({ playerName, stat });
    }, 500);
  }, []);

  const handleTouchEnd = useCallback(
    (playerName, stat, event) => {
      event.preventDefault();
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

    document.addEventListener('touchstart', handleTouchOutside);
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, []);

  const activePlayers = players.filter((player) => player.active);
  const inactivePlayers = players.filter((player) => !player.active);

  return (
    <div className={styles.chartContainer} ref={containerRef}>
      <table className={styles.statsTable}>
        <thead>
          <tr>
            <th className={`${styles.headerCell} ${styles.playerNameHeader}`}>Player</th>
            {stats.map((stat) => (
              <th
                key={stat}
                className={`${styles.headerCell} ${stat === 'hasDisc' ? styles.hasDiscHeader : ''}
                            ${['drop', 'throw', 'stall'].includes(stat) ? styles.errorHeader : ''}
                            `}
              >
                {stat === 'hasDisc' ? 'Disc' : stat.replace(/([A-Z])/g, ' $1').trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activePlayers.map((player, index) => (
            <React.Fragment key={player.name}>
              {index === players.filter((p) => p.active).length && (
                <tr>
                  <td colSpan={6} className={styles.separator}></td>
                </tr>
              )}
              <tr className={player.active ? styles.activePlayer : styles.inactivePlayer}>
                <td className={styles.playerNameCell}>
                  {/* <button className={styles.playerNameButton} onTouchEnd={() => togglePlayerActive(player.name)}>
                                        {player.name}
                                    </button> */}

                  <PlayerName player={player} onToggleActive={togglePlayerActive} isActive={true} />
                </td>
                {Object.entries(player.stats).map(([stat, value]) => (
                  <StatCell
                    key={stat}
                    stat={stat}
                    value={value}
                    isActive={player.active}
                    hasDisc={player.stats.hasDisc > 0}
                    onTouchStart={(stat, e) => handleTouchStart(player.name, stat, e)}
                    onTouchEnd={(stat, e) => handleTouchEnd(player.name, stat, e)}
                    menuOpen={menuOpen && menuOpen.playerName === player.name && menuOpen.stat === stat}
                    onMenuAction={(stat, increment) => handleMenuAction(player.name, stat, increment)}
                    onCloseMenu={closeMenu}
                  />
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className={styles.benchedPlayerList}>
        {inactivePlayers.map((player) => (
          <div key={player.name} className={styles.benchedPlayerDiv}>
            <PlayerName player={player} onToggleActive={togglePlayerActive} isActive={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
