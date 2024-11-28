import React, { useState, useContext } from 'react';

import { GameContext } from '../contextProviders/GameContext.jsx';

import TopBanner from '../topBanner/TopBanner.jsx';
import PlayerStats from '../playerStats/PlayerStats.jsx';

const GameTracker = () => {
  const { gameState, dispatch } = useContext(GameContext);

  const { teamName, presentPlayers, opponentName, teamScore, opponentScore } = gameState;

//   const [stats, setStats] = useState({
//     hasDisk: 0,
//     assists: 0,
//     goals: 0,
//     errors: 0,
//     def: 0,
//   });

  const onTimeUpdate = (newTime) => {
    dispatch({ type: 'TIME', time: newTime });
  };

  const updateStat = (playerName, stat, increment) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) =>
        player.name === playerName ? { ...player, stats: { ...player.stats, [stat]: player.stats[stat] + (increment ? 1 : -1) } } : player
      );

      // Update overall stats
      const newStats = updatedPlayers.reduce((acc, player) => {
        Object.keys(player.stats).forEach((key) => {
          acc[key] = (acc[key] || 0) + player.stats[key];
        });
        return acc;
      }, {});
      setStats(newStats);

      // Update team score if the stat is 'goals'
      if (stat === 'goals') {
        setGameState((prevState) => ({
          ...prevState,
          teamScore: prevState.teamScore + (increment ? 1 : -1),
        }));
      }

      return updatedPlayers;
    });
  };

  const togglePlayerActive = (playerName) => {
    setPlayers((prevPlayers) => prevPlayers.map((player) => (player.name === playerName ? { ...player, active: !player.active } : player)));
  };

  return (
    <div className="game-tracker">
      <TopBanner onTimeUpdate={onTimeUpdate} />
      <PlayerStats />
    </div>
  );
};

export default GameTracker;
