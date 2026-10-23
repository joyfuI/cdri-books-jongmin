import { Outlet } from 'react-router';

import Header from './components/Header';

const App = () => {
  return (
    <div className="min-w-280">
      <Header />
      <main className="mx-auto mt-20 mb-24 w-5xl px-8 text-[#353c49]">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
