import React, { createContext, useReducer, useEffect, useCallback } from 'react';

export const GameContext = createContext();

const initialState = {
  currentGameId: '',
  activePlayers: [],
  benchedPlayers: [], // This will initially contain all present players
  gameStarted: false,
  fieldInstances: {}, //[playerId]: { startTime: timestamp }
  team: 'Us',
  rival: 'Them',
  teamScore: 0,
  rivalScore: 0,
  time: 0,
  isClockRunning: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEAM': {
      return { ...state, team: action.team };
    }
    case 'SET_RIVAL': {
      return { ...state, rival: action.rival };
    }
    case 'SET_CURRENT_GAME_ID': {
      return { ...state, currentGameId: action.gameId };
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
      const currentTime = state.time;
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
    case 'INCREMENT_TEAM_SCORE':
      return {
        ...state,
        teamScore: state.teamScore + 1,
      };
    case 'INCREMENT_RIVAL_SCORE':
      return {
        ...state,
        rivalScore: state.rivalScore + 1,
      };
    case 'DECREMENT_RIVAL_SCORE':
      return {
        ...state,
        rivalScore: state.rivalScore - 1,
      };

    case 'UPDATE_TIME':
      return { ...state, time: action.payload };
    case 'SET_CLOCK_RUNNING':
      return { ...state, isClockRunning: action.payload };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  const updateTime = useCallback(() => {
    dispatch({ type: 'UPDATE_TIME', payload: gameState.time + 1 });
  }, [gameState.time]);

  useEffect(() => {
    let interval;
    if (gameState.isClockRunning) {
      interval = setInterval(updateTime, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isClockRunning, updateTime]);

  const startClock = () => dispatch({ type: 'SET_CLOCK_RUNNING', payload: true });
  const stopClock = () => dispatch({ type: 'SET_CLOCK_RUNNING', payload: false });
  const resetClock = () => {
    dispatch({ type: 'SET_CLOCK_RUNNING', payload: false });
    dispatch({ type: 'UPDATE_TIME', payload: 0 });
  };

  return <GameContext.Provider value={{ gameState, dispatch, startClock, stopClock, resetClock }}>{children}</GameContext.Provider>;
};
