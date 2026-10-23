import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const router = createAppRouter();

createRoot(root).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4880ee',
            colorText: '#353c49',
            colorTextSecondary: '#6d7582',
            fontFamily: 'inherit',
            fontSizeHeading1: 24,
            fontSizeHeading2: 22,
            fontSizeHeading3: 18,
            fontWeightStrong: 700,
            borderRadius: 8,
            controlHeight: 48,
          },
          components: { Button: { primaryShadow: 'none' } },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <RouterProvider router={router} />
          </NuqsAdapter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
