import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';
import styles from './TopBanner.module.css';
import Clock from '../clock/Clock.jsx';
import { Plus, Minus, X } from 'lucide-react';

const TopBanner = ({ onTimeUpdate }) => {
  const { gameState, dispatch } = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimer = useRef(null);
  const menuRef = useRef(null);
  const longPressThreshold = 300;

  const handleScoreUpdate = useCallback(
    (team, increment) => {
      dispatch({
        type: team === 'team' ? 'UPDATE_TEAM_SCORE' : 'UPDATE_RIVAL_SCORE',
        payload: increment ? 1 : -1,
      });
    },
    [dispatch]
  );

  const handleTouchStart = (team) => {
    setIsLongPress(false);
    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      setMenuOpen(team);
    }, longPressThreshold);
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchEnd = (team) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!isLongPress) {
      dispatch({
        type: team === 'team' ? 'UPDATE_TEAM_SCORE' : 'UPDATE_RIVAL_SCORE',
        payload: 1,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderScoreMenu = (team) => (
    <div className={styles.scoreMenu} ref={menuRef}>
      <button className={styles.closeButton} onClick={() => setMenuOpen(null)}>
        <X size={24} />
      </button>
      <div className={styles.scoreDisplay}>
        {team === 'team' ? gameState.teamScore : gameState.rivalScore}
      </div>
      <div className={styles.scoreButtons}>
        <button onClick={() => handleScoreUpdate(team, true)}>
          <Plus size={24} />
        </button>
        <button onClick={() => handleScoreUpdate(team, false)}>
          <Minus size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.topBanner}>
      <div className={styles.gameInfo}>
        <div className={styles.scoreContainer}>
          <span className={styles.teamName}>{gameState.team}</span>
          <span
            className={styles.score}
            onTouchStart={() => handleTouchStart('team')}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd('team')}
          >
            {gameState.teamScore}
          </span>
          <span className={styles.scoreDivider}>-</span>
          <span
            className={styles.score}
            onTouchStart={() => handleTouchStart('rival')}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd('rival')}
          >
            {gameState.rivalScore}
          </span>
          <span className={styles.teamName}>{gameState.rival}</span>
        </div>
        {menuOpen && renderScoreMenu(menuOpen)}
        <Clock initialTime={gameState.time} onTimeUpdate={onTimeUpdate} />
      </div>
    </div>
  );
};

export default TopBanner;