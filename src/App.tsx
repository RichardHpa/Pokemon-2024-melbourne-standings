import { Routes, Route, Outlet, Link } from 'react-router-dom';

import { Home, Player } from './pages';
import { Error404 } from './errors';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-12 px-4">
        <div className="pb-10">
          <Link to="/">
            <h1 className="text-5xl font-extrabold dark:text-white text-center">
              Pokemon TCG Melbourne Regionals Standings
            </h1>
          </Link>
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
