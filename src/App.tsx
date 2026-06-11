import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TeamProfile from './pages/TeamProfile';
import BroadcastCenter from './pages/BroadcastCenter';
import { TimezoneProvider } from './contexts/TimezoneContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PwaProvider } from './contexts/PwaContext';

import MatchDetails from './pages/MatchDetails';
import Fixtures from './pages/Fixtures';
import GroupStandings from './pages/GroupStandings';
import HostCities from './pages/HostCities';

function App() {
  return (
    <TimezoneProvider>
      <PwaProvider>
        <NotificationProvider>
          <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="teams/:id" element={<TeamProfile />} />
              <Route path="broadcast" element={<BroadcastCenter />} />

              <Route path="matches/:id" element={<MatchDetails />} />
              <Route path="fixtures" element={<Fixtures />} />
              <Route path="group-stats" element={<GroupStandings />} />
              <Route path="host-cities" element={<HostCities />} />
              {/* Other routes will be added here */}
            </Route>
          </Routes>
          </HashRouter>
        </NotificationProvider>
      </PwaProvider>
    </TimezoneProvider>
  );
}

export default App;
