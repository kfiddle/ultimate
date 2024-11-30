import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contextProviders/GameContext.jsx';
import usePush from '../../hooks/usePush';
import styles from './TeamSetup.module.css';

const TeamSetup = ({ startGame }) => {
  const { dispatch } = useContext(GameContext);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(['', '', '', '']);
  const [isFormValid, setIsFormValid] = useState(false);

  const createGameWithTeamAndPlayers = usePush('games/create-game-with-team-and-players');

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
        const formattedPlayers = players
          .filter((player) => player.trim() !== '')
          .map((player) => {
            const [first, ...lastParts] = player.trim().split(' ');
            return { first, last: lastParts.join(' ') };
          });

        const result = await createGameWithTeamAndPlayers({
          teamName,
          players: formattedPlayers,
        });

        if (result.success) {
          const { game } = result;
          console.log(game);
          // const presentPlayers = game.players.map(({ player }) => ({
          //   id: player._id,
          //   name: `${player.first} ${player.last}`,
          //   isActive: true,
          //   hasDisc: false,
          // }));

          dispatch({ type: 'SET_BENCHED_PLAYERS', players: game.players });
          dispatch({ type: 'SET_TEAM', team: game.teams[0].team.name, teamId: game.teams[0].team._id });
          dispatch({ type: 'SET_CURRENT_GAME_ID', gameId: game._id });

          startGame();
        } else {
          console.error('Failed to create game:', result.message);
          alert('Failed to create game. Please try again.');
        }
      } catch (error) {
        console.error('Error creating game:', error);
        alert('An error occurred while creating the game. Please try again.');
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
              placeholder={`Player ${index + 1} (e.g., John Smith)`}
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
          onClick={handleStartGame}
          disabled={!isFormValid}
          className={`${styles.startButton} ${!isFormValid ? styles.disabled : ''}`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default TeamSetup;
