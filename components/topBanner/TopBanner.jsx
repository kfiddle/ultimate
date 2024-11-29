import React, { useContext } from 'react';

import { GameContext } from '../contextProviders/GameContext.jsx';
import styles from './TopBanner.module.css';
import Clock from '../clock/Clock.jsx';

const TopBanner = ({ onTimeUpdate }) => {
  const { gameState, dispatch } = useContext(GameContext);

  const rivalScoreClicker = () => dispatch({ type: 'UPDATE_RIVAL_SCORE' });

  return (
    <div className={styles.topBanner}>
      <div className={styles.gameInfo}>
        <div className={styles.scoreContainer}>
          <span className={styles.teamName}>{gameState.team}</span>
          <span className={styles.score}>{gameState.teamScore}</span>
          <span className={styles.scoreDivider}>-</span>
          <span className={styles.score}>{gameState.rivalScore}</span>
          <span className={styles.teamName} onClick={rivalScoreClicker}>
            {gameState.rival}
          </span>
        </div>
        <Clock initialTime={gameState.time} onTimeUpdate={onTimeUpdate} />
      </div>
    </div>
  );
};

export default TopBanner;
