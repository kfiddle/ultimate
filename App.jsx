import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Welcome from "./components/welcome/Welcome.jsx";
import GameTracker from "./components/gameTracker/GameTracker.jsx";
import { GameProvider } from "./components/contextProviders/GameContext.jsx";

const AppProviders = ({ children }) => {
    return <GameProvider>{children}</GameProvider>;
};

const App = () => {
    const [gameStarting, setgameStarting] = useState(false);

    const startGame = () => setgameStarting(true);

    // const getter = useGet('chairs');
    // const refresher = useRefresher();

    // useEffect(() => {
    //   refresher();

    //   const chairsGet = async () => {
    //     const chairs = await getter();
    //   };
    //   chairsGet();
    // }, [refresher]);

    return (
        <div>
            <AppProviders>
                {!gameStarting && <Welcome startGame={startGame} />}
                {gameStarting && <GameTracker />}
            </AppProviders>
        </div>
    );
    // <AppProviders>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<Dash />} />
    //       <Route path="/library" element={<Library />} />

    //       <Route path="/players" element={<Players />} />

    //       <Route path="/gig-entry" element={<GigEntry />} />
    //     </Routes>
    //   </Layout>
    // </AppProviders>
    // )
};

export default App;
