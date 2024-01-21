import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-2">
        <Routes>
          <Route index element={<>Home</>} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
