import React from 'react';
import Disc from '../../disc/Disc.jsx';

import styles from './StatCell.module.css';
const StatCell = ({ stat, value, isActive, hasDisc, onTouchStart, onTouchEnd, menuOpen, onMenuAction, onCloseMenu }) => {
  const isErrorStat = ['drop', 'throw', 'stall'].includes(stat);
  const isDisabled = !isActive || (isErrorStat && !hasDisc);

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
                    ${!isActive ? styles.inactiveStatButton : ''}
                    ${stat === 'hasDisc' ? styles.hasDiscButton : ''}
                    ${stat === 'D' ? styles.dButton : ''}
                    ${isErrorStat ? styles.errorButton : ''}
                    ${isDisabled ? styles.disabledErrorButton : ''}
                `}
        onTouchStart={(e) => onTouchStart(stat, e)}
        onTouchEnd={(e) => onTouchEnd(stat, e)}
        disabled={isDisabled}
      >
        {stat === 'hasDisc' && value > 0 ? (
          <Disc className={styles.discIcon} />
        ) : (
          <span className={styles.statLabel}>{stat === 'hasDisc' ? '' : stat}</span>
        )}
      </button>
      {menuOpen && (
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
