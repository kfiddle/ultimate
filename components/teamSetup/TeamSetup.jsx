import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';

import usePush from '../../hooks/usePush';
import useGet from '../../hooks/useGet.js';

import styles from './TeamSetup.module.css';

const testHomeTeam = '67479c3b15308de9f27d17ce';
const rivalTestTeam = '674796d715308de9f27d17c2';

const TeamSetup = ({ startGame }) => {
  const { dispatch } = useContext(GameContext);

  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(['', '', '', '']);
  const [isFormValid, setIsFormValid] = useState(false);

  const createTeamAndPlayers = usePush('teams/create-team-and-players');

  // const { name, location, date, teamIds, playerIds } = req.body;

  const getter = useGet('players/team/67479c3b15308de9f27d17ce');
  const pusher = usePush('games');

  const gameTestStarter = async () => {
    const testPlayers = await getter();
    if (testPlayers) {
      dispatch({ type: 'SET_BENCHED_PLAYERS', players: testPlayers });
      dispatch({ type: 'SET_TEAM', team: 'teamName', teamId: testHomeTeam });
      const result = await pusher({ name: 'Game One', teamIds: [testHomeTeam, rivalTestTeam], playerIds: testPlayers.map((p) => p._id) });
      if (result) {
        dispatch({ type: 'SET_CURRENT_GAME_ID', gameId: '6748c23eea2416561994b165' });
        startGame();
      }
    }
  };

  useEffect(() => {
    const isValid = teamName.trim() !== '' && players.filter((player) => player.trim().includes(' ')).length >= 4;
    setIsFormValid(isValid);
  }, [teamName, players]);

  const addPlayer = () => {
    if (players.length < 10) {
      setPlayers([...players, '']);
    }
  };

  const removePlayer = () => {
    if (players.length > 4) {
      setPlayers(players.slice(0, -1));
    }
  };

  const updatePlayer = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleStartGame = async () => {
    if (isFormValid) {
      try {
        const result = await createTeamAndPlayers({
          teamName,
          players: players.filter((player) => player.trim() !== ''),
        });
        if (result.success) {
          const presentPlayers = result.playerIds.map((id, index) => ({
            id,
            name: players[index].trim(),
            isActive: true,
            hasDisc: false,
          }));

          // at start of game, all players are on bench
          dispatch({ type: 'SET_BENCHED_PLAYERS', presentPlayers });
          dispatch({ type: 'SET_TEAM', teamName: teamName, teamId: result.teamId });

          startGame();
        } else {
          console.error('Failed to create team and players:', result.message);
          // Handle error (e.g., show error message to user)
          alert('Failed to create team and players. Please try again.');
        }
      } catch (error) {
        console.error('Error creating team and players:', error);
        // Handle error (e.g., show error message to user)
        alert('An error occurred while creating the team and players. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Team Setup</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="teamName" className={styles.label}>
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Player Names (4-10 players)</label>
          {players.map((player, index) => (
            <input
              key={index}
              type="text"
              value={player}
              onChange={(e) => updatePlayer(index, e.target.value)}
              placeholder={`Player ${index + 1}`}
              className={styles.input}
            />
          ))}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={removePlayer}
              disabled={players.length <= 4}
              className={`${styles.iconButton} ${players.length <= 4 ? styles.disabled : ''}`}
            >
              -
            </button>
            <button
              type="button"
              onClick={addPlayer}
              disabled={players.length >= 10}
              className={`${styles.iconButton} ${players.length >= 10 ? styles.disabled : ''}`}
            >
              +
            </button>
          </div>
        </div>

        <button
          // onClick={handleStartGame}
          // disabled={!isFormValid}
          onClick={gameTestStarter}
          className={`${styles.startButton} ${!isFormValid ? styles.disabled : ''}`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default TeamSetup;
