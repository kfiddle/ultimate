import React, { useState, useContext } from "react";

import { GameContext } from "../contextProviders/GameContext.jsx";

import Card from "../ui/card/Card.jsx";
import CardContent from "../ui/cardContent/CardContent.jsx";
import CardFooter from "../ui/cardFooter/CardFooter.jsx";
import ScrollArea from "../ui/scrollArea/ScrollArea.jsx";
import Banner from "./banner/Banner.jsx";
import PlayerCard from "./playerCard/PlayerCard.jsx";
import StartGameButton from "./startGameButton/StartGameButton.jsx";
import styles from "./Welcome.module.css";

const mockData = {
    teamName: "Cosmic Flyers",
    gameName: "Season Opener 2024",
    opposingTeam: "Gravity Defiers",
    players: [
        { id: 1, name: "Alice Johnson" },
        { id: 2, name: "Bob Smith" },
        { id: 3, name: "Charlie Brown" },
        { id: 4, name: "Diana Prince" },
        { id: 5, name: "Ethan Hunt" },
        { id: 6, name: "Fiona Gallagher" },
        { id: 7, name: "George Michael" },
        { id: 8, name: "Hannah Montana" },
        { id: 9, name: "Ian Malcolm" },
        { id: 10, name: "Julia Child" },
    ],
};

export default function Welcome({ startGame }) {
    const { dispatch } = useContext(GameContext);
    const [presentPlayers, setPresentPlayers] = useState([]);

    const togglePlayerPresence = (playerId) => {
        setPresentPlayers((current) => (current.includes(playerId) ? current.filter((id) => id !== playerId) : [...current, playerId]));
    };

    const handleStartGame = () => {
        console.log("Starting game with players:", presentPlayers);
        if (presentPlayers.length > 0) {
            dispatch({ type: "SET_PRESENT_PLAYERS", presentPlayers });
            startGame();
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Banner teamName={mockData.teamName} gameName={mockData.gameName} opposingTeam={mockData.opposingTeam} />
                <CardContent className={styles.content}>
                    <h2 className={styles.title}>Select Present Players</h2>
                    <ScrollArea className={styles.scrollArea}>
                        <div className={styles.playerGrid}>
                            {mockData.players.map((player) => (
                                <PlayerCard key={player.id} player={player} isSelected={presentPlayers.includes(player.id)} onToggle={() => togglePlayerPresence(player.id)} />
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className={styles.footer}>
                    <p className={styles.playerCount}>{presentPlayers.length} players selected</p>
                    <StartGameButton onClick={handleStartGame} disabled={presentPlayers.length === 0} />
                </CardFooter>
            </Card>
        </div>
    );
}
