import { Routes, Route, Outlet, Link } from 'react-router-dom';

import { Home, Player } from './pages';
import { Error404 } from './errors';

import { TournamentToggle } from 'components/TournamentToggle';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-12 px-4">
        <div className="pb-5">
          <Link to="/">
            <h1 className="text-5xl font-extrabold dark:text-white text-center">
              Pokemon TCG Melbourne 2024 Regionals Standings
            </h1>
          </Link>
        </div>

        <div className="flex justify-center pb-10">
          <TournamentToggle />
        </div>

        <Routes>
          <Route index element={<Home />} />
          <Route path="player" element={<Outlet />}>
            <Route path=":playerName" element={<Player />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
