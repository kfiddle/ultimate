import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';
import styles from './TopBanner.module.css';
import Clock from '../clock/Clock.jsx';
import { Plus, Minus, X } from 'lucide-react';

const TopBanner = ({ onTimeUpdate }) => {
  const { gameState, dispatch } = useContext(GameContext);
  const { team, rival, teamScore, rivalScore } = gameState;
  const [menuOpen, setMenuOpen] = useState(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimer = useRef(null);
  const menuRef = useRef(null);
  const longPressThreshold = 300;

  const handleScoreUpdate = useCallback(
    (team, increment) => {
      if (team === 'rival') {
        if (increment === 'increment') dispatch({ type: 'INCREMENT_RIVAL_SCORE' });
        else dispatch({ type: 'DECREMENT_RIVAL_SCORE' });
      }
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
        type: team === 'team' ? 'INCREMENT_TEAM_SCORE' : 'INCREMENT_RIVAL_SCORE',
      });
    }
  };

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    if (menuOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 400);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const renderScoreMenu = (team) => (
    <div className={styles.scoreMenu} ref={menuRef}>
      <button className={styles.closeButton} onClick={() => setMenuOpen(null)}>
        <X size={24} />
      </button>
      <div className={styles.scoreDisplay}>{team === 'team' ? teamScore : rivalScore}</div>
      <div className={styles.scoreButtons}>
        <button onClick={() => handleScoreUpdate(team, 'increment')}>
          <Plus size={24} />
        </button>
        <button onClick={() => handleScoreUpdate(team, 'decrement')}>
          <Minus size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.topBanner}>
      <div className={styles.gameInfo}>
        <div className={styles.scoreContainer}>
          <span className={styles.teamName}>{team?.name || 'us'}</span>
          <span
            className={styles.score}
            onTouchStart={() => handleTouchStart('team')}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd('team')}
          >
            {teamScore}
          </span>
          <span className={styles.scoreDivider}>-</span>
          <span
            className={styles.score}
            onTouchStart={() => handleTouchStart('rival')}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd('rival')}
          >
            {rivalScore}
          </span>
          <span className={styles.teamName}>{rival?.name || 'them'}</span>
        </div>
        {menuOpen && renderScoreMenu(menuOpen)}
        <Clock initialTime={gameState.time} onTimeUpdate={onTimeUpdate} />
      </div>
    </div>
  );
};

export default TopBanner;
