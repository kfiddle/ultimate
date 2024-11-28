import React, { createContext, useReducer, useEffect } from 'react';

export const GameContext = createContext();

const initialState = {
  activePlayers: [],
  benchedPlayers: [], // This will initially contain all present players
  gameStarted: false,
  fieldInstances: {}, //[playerId]: { startTime: timestamp }
  teamName: '',
  opponentName: 'Rival',
  teamScore: 0,
  opponentScore: 0,
  time: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEAM': {
      return { ...state, teamName: action.teamName };
    }
    // this for starting game only
    case 'SET_BENCHED_PLAYERS': {
      return { ...state, benchedPlayers: [...action.players] };
    }
    case 'SELECT_PLAYER':
      return {
        ...state,
        presentPlayers: [...state.presentPlayers, action.player],
      };
    case 'DESELECT_PLAYER':
      return {
        ...state,
        presentPlayers: state.presentPlayers.filter((player) => player.id !== action.playerId),
      };

    case 'TOGGLE_PLAYER': {
      const { player } = action;
      const isCurrentlyActive = state.activePlayers.some((p) => p._id === player._id);
      const currentTime = Date.now();
      return {
        ...state,
        activePlayers: isCurrentlyActive ? state.activePlayers.filter((p) => p._id !== player._id) : [...state.activePlayers, player],
        benchedPlayers: isCurrentlyActive ? [...state.benchedPlayers, player] : state.benchedPlayers.filter((p) => p._id !== player._id),
        fieldInstances: isCurrentlyActive
          ? {
              ...state.fieldInstances,
              [player._id]: undefined, // Remove the instance when benched
            }
          : {
              ...state.fieldInstances,
              [player._id]: { startTime: currentTime }, // Start new instance
            },
      };
    }
    case 'ADD_ACTIVE_PLAYER':
      const { activePlayers, benchedPlayers } = state;
      const { player } = action;
      return {
        ...state,
        activePlayers: [...activePlayers, player],
        benchedPlayers: benchedPlayers.filter((p) => p._id !== player._id),
      };

    case 'BENCH_PLAYER':
      return {
        ...state,
        activePlayers: state.activePlayers.filter((p) => p._id !== action.player._id),
        benchedPlayers: [...benchedPlayers, player],
      };

    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
      };
    case 'END_GAME':
      return {
        ...state,
        gameStarted: false,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: {
          ...state.score,
          [action.team]: state.score[action.team] + 1,
        },
      };
    case 'TIME': {
      return { ...state, time: action.time };
    }
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // You can add any side effects here, such as saving the game state to local storage
    // console.log('Game state updated:', gameState);
  }, [gameState]);

  return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
};
