import React from 'react';
import styles from './TopBanner.module.css';
import Clock from '../clock/Clock.jsx';

const TopBanner = ({ 
  stats = {
    hasDisk: 0,
    assists: 0,
    goals: 0,
    errors: 0,
    def: 0
  },
  gameState = {
    teamName: 'Our Team',
    opponentName: 'Opponent',
    teamScore: 0,
    opponentScore: 0,
    time: 0,
  },
  onTimeUpdate
}) => {
  return (
    <div className={styles.topBanner}>
      <div className={styles.gameInfo}>
        <div className={styles.scoreContainer}>
          <span className={styles.teamName}>{gameState.teamName}</span>
          <span className={styles.score}>{gameState.teamScore}</span>
          <span className={styles.scoreDivider}>-</span>
          <span className={styles.score}>{gameState.opponentScore}</span>
          <span className={styles.teamName}>{gameState.opponentName}</span>
        </div>
        <Clock initialTime={gameState.time} onTimeUpdate={onTimeUpdate} />
      </div>
      <div className={styles.statsContainer}>
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className={styles.statItem}>
            <div className={styles.statLabel}>{stat}</div>
            <div className={styles.statValue}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBanner;