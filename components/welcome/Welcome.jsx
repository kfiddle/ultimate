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
        { id: 1, name: "Alice", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 2, name: "Bob", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 3, name: "Charlie", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 4, name: "David", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 5, name: "Eve", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 6, name: "Frank", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 7, name: "Grace", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 8, name: "Pauly", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 9, name: "Dom", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
        { id: 10, name: "Vinnie", active: false, stats: { hasDisc: 0, goal: 0, D: 0, drop: 0, throw: 0, stall: 0 } },
    ],
};

export default function Welcome({ startGame }) {
    const { dispatch } = useContext(GameContext);
    const [presentPlayers, setPresentPlayers] = useState([]);

    const togglePlayerPresence = (player) => {
        setPresentPlayers((current) => (current.includes(player.id) ? current.filter((id) => id !== player.id) : [...current, player.id]));
    };

    const handleStartGame = () => {
        console.log("Starting game with players:", presentPlayers);
        if (presentPlayers.length > 0) {
            const selectedPlayers = mockData.players.filter((player) => presentPlayers.includes(player.id));
            dispatch({ type: "SET_PRESENT_PLAYERS", presentPlayers: selectedPlayers });
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
                                <PlayerCard key={player.id} player={player} isSelected={presentPlayers.includes(player.id)} onToggle={() => togglePlayerPresence(player)} />
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
