import React, { useContext } from 'react';

import { GameContext } from '../contextProviders/GameContext.jsx';
import styles from './TopBanner.module.css';
import Clock from '../clock/Clock.jsx';

const TopBanner = ({
  //   gameState = {
  //     teamName: 'Erie',
  //     opponentName: 'Some Other',
  //     teamScore: 0,
  //     opponentScore: 0,
  //     time: 0,
  //   },
  onTimeUpdate,
}) => {
  const { gameState } = useContext(GameContext);
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
    </div>
  );
};

export default TopBanner;
