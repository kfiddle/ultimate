import React, { useState } from 'react';
import TopBanner from '../topBanner/TopBanner.jsx';
import PlayerStatsChart from '../playerStatsChart/PlayerStatsChart.jsx';

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
    def: 0,
  });

  const [players, setPlayers] = useState([
    { name: 'Alice', active: true, stats: { hasDisk: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: 'Bob', active: true, stats: { hasDisk: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: 'Charlie', active: true, stats: { hasDisk: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: 'David', active: false, stats: { hasDisk: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
    { name: 'Eve', active: false, stats: { hasDisk: 0, assists: 0, goals: 0, errors: 0, def: 0 } },
  ]);

  const onTimeUpdate = (newTime) => {
    setGameState((prevState) => ({
      ...prevState,
      time: newTime,
    }));
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
      <TopBanner stats={stats} gameState={gameState} onTimeUpdate={onTimeUpdate} />
      <PlayerStatsChart players={players} updateStat={updateStat} togglePlayerActive={togglePlayerActive} />
    </div>
  );
};

export default GameTracker;
