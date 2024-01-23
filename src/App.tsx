import { Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import { Error404 } from './errors';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-12 px-4">
        <Routes>
          <Route index element={<Home />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
