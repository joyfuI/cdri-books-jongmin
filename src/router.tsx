import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import Search from './Search';
import Wishlist from './Wishlist';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      Component: App,
      children: [
        { index: true, element: <Navigate to="/search" replace /> },
        { path: 'search', Component: Search },
        { path: 'wishlist', Component: Wishlist },
      ],
    },
  ]);
