import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';
import usePush from '../../hooks/usePush.js';
import usePut from '../../hooks/usePut.js';
import useCreateFieldInstance from '../../hooks/useCreateFieldInstance.js';
import useCreateTouch from '../../hooks/useCreateTouch.js';
import useCreateDefense from '../../hooks/useCreateDefense.js';
import StatCell from './statButton/StatCell.jsx';
import PlayerName from './playerName/PlayerName.jsx';
import styles from './PlayerStats1.module.css';

const stats = ['hasDisc', 'goal', 'def', 'turnover'];
const turnoverTypes = ['drop', 'throw', 'stall'];

export default function PlayerStats1() {
  const { gameState, dispatch } = useContext(GameContext);
  const { activePlayers, benchedPlayers, fieldInstances, currentGameId, time } = gameState;

  const [menuOpen, setMenuOpen] = useState(null);
  const [playerWithDisc, setPlayerWithDisc] = useState(null);

  const timerRef = useRef(null);
  const longPressRef = useRef(null);
  const containerRef = useRef(null);

  const touchEditor = usePut(`touches/${playerWithDisc?.touchId}`);

  const { saveFieldInstance } = useCreateFieldInstance(currentGameId, time);
  const { saveTouch } = useCreateTouch(currentGameId, time);
  const { saveDefense } = useCreateDefense(currentGameId, time);

  const togglePlayerActive = (player) => {
    const isCurrentlyActive = activePlayers.some((p) => p._id === player._id);
    const currentTime = time;

    if (isCurrentlyActive) {
      const startTime = fieldInstances[player._id].startTime;
      saveFieldInstance(player, startTime, currentTime);

      if (playerWithDisc && playerWithDisc._id === player._id) {
        setPlayerWithDisc(null);
      }
    }

    dispatch({ type: 'TOGGLE_PLAYER', player });
  };

  const handleTouchStart = useCallback((playerName, stat, event) => {
    longPressRef.current = null;
    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      setMenuOpen({ playerName, stat });
    }, 500);
  }, []);

  const handleTouchEnd = (player, stat, event) => {
    event.preventDefault();
    clearTimeout(timerRef.current);
    if (longPressRef.current === null) {
      if (stat === 'hasDisc') {
        saveTouch(player, playerWithDisc?.touchId).then((newlySavedTouch) => {
          setPlayerWithDisc({ ...player, touchId: newlySavedTouch._id });
        });
      } else if (stat === 'goal') {
        saveTouch(player, playerWithDisc?.touchId, 'goal').then(() => {
          setPlayerWithDisc(null);
          dispatch({ type: 'INCREMENT_TEAM_SCORE' });
        });
      } else if (stat === 'def') {
        saveDefense(player);
      }
    }
    longPressRef.current = null;
  };

  const handleTurnover = (type) => {
    if (playerWithDisc?.touchId) {
      touchEditor({ turnover: type });
      setPlayerWithDisc(null);
    }
  };

  const handleMenuAction = (playerName, stat, increment) => {
    // Implement stat update logic here
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
                            ${stat === 'turnover' ? styles.errorHeader : ''}
                            `}
              >
                {stat === 'hasDisc' ? 'Disc' : stat.charAt(0).toUpperCase() + stat.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activePlayers.map((player, index) => (
            <React.Fragment key={player._id}>
              {index === activePlayers.length && (
                <tr>
                  <td colSpan={stats.length + 1} className={styles.separator}></td>
                </tr>
              )}
              <tr className={player.active ? styles.activePlayer : styles.inactivePlayer}>
                <td className={styles.playerNameCell}>
                  <PlayerName player={player} onToggleActive={togglePlayerActive} isActive={true} />
                </td>
                {stats.slice(0, -1).map((stat) => (
                  <StatCell
                    stat={stat}
                    key={stat}
                    anyoneHasDisc={playerWithDisc}
                    hasDisc={playerWithDisc?._id === player._id}
                    onTouchStart={(stat, e) => handleTouchStart(player.name, stat, e)}
                    onTouchEnd={(stat, e) => handleTouchEnd(player, stat, e)}
                    menuOpen={menuOpen && menuOpen.playerName === player.name && menuOpen.stat === stat}
                    onMenuAction={(stat, increment) => handleMenuAction(player.name, stat, increment)}
                    onCloseMenu={closeMenu}
                  />
                ))}
                {index === 0 && (
                  <td rowSpan={activePlayers.length} className={styles.turnoverCell}>
                    <div className={styles.turnoverButtons}>
                      {turnoverTypes.map((turnoverType) => (
                        <button
                          key={turnoverType}
                          className={styles.turnoverButton}
                          onClick={() => handleTurnover(turnoverType)}
                          disabled={!playerWithDisc}
                        >
                          {turnoverType}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className={styles.benchedPlayerList}>
        {benchedPlayers.map((player) => (
          <div key={player._id} className={styles.benchedPlayerDiv}>
            <PlayerName player={player} onToggleActive={togglePlayerActive} isActive={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
