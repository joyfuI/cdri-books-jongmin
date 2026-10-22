import { createBrowserRouter } from 'react-router';

import App from './App';

export const createAppRouter = () =>
  createBrowserRouter([{ path: '/', Component: App }]);
