import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v8';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { createAppRouter } from './router';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found.');
}

const queryClient = new QueryClient();
const router = createAppRouter();

createRoot(root).render(
  <StrictMode>
    <StyleProvider layer>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StyleProvider>
  </StrictMode>,
);
