import React, { useContext } from 'react';
import { GameContext } from '../../contextProviders/GameContext.jsx';
import Disc from '../../disc/Disc.jsx';

import styles from './StatCell.module.css';

const StatCell = ({ stat, value, isActive, hasDisc, onTouchStart, onTouchEnd, menuOpen, onMenuAction, onCloseMenu }) => {
  const { gameState } = useContext(GameContext);
  const { isClockRunning } = gameState;

  const isErrorStat = ['drop', 'throw', 'stall'].includes(stat);
  const isDisabled = !isClockRunning || !hasDisc || (isErrorStat && !hasDisc);

  return (
    <td
      className={`${styles.statCell} 
                ${stat === 'hasDisc' ? styles.hasDiscCell : ''}
                ${stat === 'D' ? styles.dCell : ''} 
                ${isErrorStat ? styles.errorCell : ''}`}
    >
      <button
        className={`
                    ${styles.statButton}
                    ${!isClockRunning ? styles.clockStoppedButton : ''}
                    ${!hasDisc ? styles.inactiveStatButton : ''}
                    ${stat === 'hasDisc' && isClockRunning && hasDisc ? styles.hasDiscButton : ''}
                    ${stat === 'D' ? styles.dButton : ''}
                    ${isErrorStat ? styles.errorButton : ''}
                    ${isDisabled ? styles.disabledErrorButton : ''}
                `}
        onTouchStart={(e) => isClockRunning && onTouchStart(stat, e)}
        onTouchEnd={(e) => isClockRunning && onTouchEnd(stat, e)}
        disabled={isDisabled}
      >
        {stat === 'hasDisc' && hasDisc && isClockRunning ? (
          <Disc className={styles.discIcon} />
        ) : (
          <span className={styles.statLabel}>{stat === 'hasDisc' ? '' : stat}</span>
        )}
      </button>
      {menuOpen && isClockRunning && (
        <div className={styles.longPressMenu}>
          <button onTouchEnd={() => onMenuAction(stat, false)}>Decrement</button>
          <button onTouchEnd={() => onMenuAction(stat, true)}>Increment</button>
          <button onTouchEnd={onCloseMenu}>Cancel</button>
        </div>
      )}
    </td>
  );
};

export default StatCell;
