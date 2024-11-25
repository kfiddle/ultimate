import React, { createContext, useReducer, useEffect } from "react";

export const GameContext = createContext();

const initialState = {
    presentPlayers: [],
    activePlayer: null,
    gameStarted: false,
    score: {
        team1: 0,
        team2: 0,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRESENT_PLAYERS": {
            return { ...state, presentPlayers: [...action.presentPlayers] };
        }
        case "SELECT_PLAYER":
            return {
                ...state,
                presentPlayers: [...state.presentPlayers, action.player],
            };
        case "DESELECT_PLAYER":
            return {
                ...state,
                presentPlayers: state.presentPlayers.filter((player) => player.id !== action.playerId),
            };
        case "SET_ACTIVE_PLAYER":
            return {
                ...state,
                activePlayer: action.player,
            };
        case "START_GAME":
            return {
                ...state,
                gameStarted: true,
            };
        case "END_GAME":
            return {
                ...state,
                gameStarted: false,
            };
        case "UPDATE_SCORE":
            return {
                ...state,
                score: {
                    ...state.score,
                    [action.team]: state.score[action.team] + 1,
                },
            };
        case "RESET_GAME":
            return initialState;
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {
    const [gameState, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // You can add any side effects here, such as saving the game state to local storage
        console.log("Game state updated:", gameState);
    }, [gameState]);

    return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
};
