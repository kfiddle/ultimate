import React, { useContext } from 'react';
import { GameContext } from '../../contextProviders/GameContext.jsx';
import Disc from '../../disc/Disc.jsx';

import styles from './StatCell.module.css';

const StatCell = ({ stat, hasDisc, onTouchStart, onTouchEnd, menuOpen, onMenuAction, onCloseMenu, anyoneHasDisc }) => {
  const { gameState } = useContext(GameContext);
  const { isClockRunning } = gameState;

  const isErrorStat = ['drop', 'throw', 'stall'].includes(stat);
  const isGoalOrDef = ['goal', 'def'].includes(stat);
  const isDisabled =
    !isClockRunning ||
    (stat !== 'hasDisc' &&
      ((hasDisc && stat === 'goal') ||
        (!hasDisc && !isGoalOrDef) ||
        (isErrorStat && !hasDisc) ||
        (stat === 'goal' && !anyoneHasDisc) ||
        (stat === 'def' && anyoneHasDisc)));

  const buttonClassName = `
    ${styles.statButton}
    ${!isClockRunning ? styles.clockStoppedButton : ''}
    ${!hasDisc && !isGoalOrDef && stat !== 'hasDisc' ? styles.inactiveStatButton : ''}
    ${stat === 'hasDisc' ? styles.hasDiscButton : ''}
    ${stat === 'D' ? styles.dButton : ''}
    ${isErrorStat ? styles.errorButton : ''}
    ${isDisabled ? styles.disabledErrorButton : ''}
    ${stat === 'goal' && anyoneHasDisc && !hasDisc ? styles.highlightedGoalButton : ''}
    ${stat === 'goal' && !anyoneHasDisc ? styles.disabledGoalButton : ''}
    ${stat === 'def' && anyoneHasDisc ? styles.disabledDefButton : ''}
  `;

  const handleTouchStart = (e) => {
    if (isClockRunning && (stat === 'hasDisc' || !isDisabled)) {
      onTouchStart(stat, e);
    }
  };

  const handleTouchEnd = (e) => {
    if (isClockRunning && (stat === 'hasDisc' || !isDisabled)) {
      onTouchEnd(stat, e);
    }
  };

  return (
    <td
      className={`${styles.statCell} 
                ${stat === 'hasDisc' ? styles.hasDiscCell : ''}
                ${stat === 'D' ? styles.dCell : ''} 
                ${isErrorStat ? styles.errorCell : ''}`}
    >
      <button className={buttonClassName} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} disabled={isDisabled}>
        {stat === 'hasDisc' && hasDisc ? (
          <Disc className={styles.discIcon} />
        ) : (
          <span className={styles.statLabel}>{stat === 'hasDisc' ? '' : stat}</span>
        )}
      </button>
      {menuOpen && isClockRunning && (stat === 'hasDisc' || !isDisabled) && (
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
