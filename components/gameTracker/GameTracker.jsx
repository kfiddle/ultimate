import React, { useState, useContext } from 'react';

import { GameContext } from '../contextProviders/GameContext.jsx';

import TopBanner from '../topBanner/TopBanner.jsx';
import PlayerStats from '../playerStats/PlayerStats.jsx';

const GameTracker = () => {
  const { gameState, dispatch } = useContext(GameContext);

  // const { teamName, presentPlayers, opponentName, teamScore, opponentScore } = gameState;

  const onTimeUpdate = (newTime) => {
    dispatch({ type: 'TIME', time: newTime });
  };

  return (
    <div className="game-tracker">
      <TopBanner onTimeUpdate={onTimeUpdate} />
      <PlayerStats />
    </div>
  );
};

export default GameTracker;
