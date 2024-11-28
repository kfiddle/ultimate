import React, { createContext, useReducer, useEffect } from 'react';

export const GameContext = createContext();

const initialState = {
  activePlayers: [],
  benchedPlayers: [], // This will initially contain all present players
  gameStarted: false,
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

    case 'ADD_ACTIVE_PLAYER':
      const { activePlayers } = state;
      const { player } = action;
      return {
        ...state,
        activePlayers: [...activePlayers, player],
      };

    case 'BENCH_PLAYER':
      return {
        ...state,
        activePlayers: state.activePlayers.filter((p) => p._id !== action.player._id),
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
    console.log('Game state updated:', gameState);
  }, [gameState]);

  return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
};
