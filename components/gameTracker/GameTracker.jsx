import React, { useState } from 'react';
import TopBanner from '../topBanner/TopBanner.jsx';

const GameTracker = () => {
  const [gameState, setGameState] = useState({
    teamName: 'Our Team',
    opponentName: 'Opponent',
    teamScore: 0,
    opponentScore: 0,
    time: 0,
  });

  const [stats, setStats] = useState({
    hasDisk: 0,
    assists: 0,
    goals: 0,
    errors: 0,
    def: 0
  });

  const onTimeUpdate = (newTime) => {
    setGameState(prevState => ({
      ...prevState,
      time: newTime
    }));
  };

  return (
    <div className="game-tracker">
      <TopBanner 
        stats={stats}
        gameState={gameState}
        onTimeUpdate={onTimeUpdate}
      />
      {/* Other game tracking components would go here */}
    </div>
  );
};

export default GameTracker;