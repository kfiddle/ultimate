import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './components/welcome/Welcome.jsx';
import GameTracker from './components/gameTracker/GameTracker.jsx';

// const AppProviders = ({ children }) => {
//   return (
//     <DashboardProvider>
//       <LibraryProvider>
//         <RosterProvider>
//           <GigFormProvider>{children}</GigFormProvider>
//         </RosterProvider>
//       </LibraryProvider>
//     </DashboardProvider>
//   );
// };

const App = () => {
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
      {/* <GameTracker /> */}
      <Welcome />
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
