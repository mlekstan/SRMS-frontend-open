import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@/index.css';
import { routeTree } from '@/routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthService } from './context-api/auth/AuthService';
import { AuthProvider } from './context-api/auth/AuthProvider';
import type {} from '@mui/material/themeCssVarsAugmentation';


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

type RouterContext = {
  queryClient: QueryClient;
  authService: AuthService;
}


const queryClient = new QueryClient();
const authService = new AuthService();
const router = createRouter({ 
  routeTree,
  context: {
    queryClient,
    authService,
  }
});
authService.registerRouter(router);

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider authService={authService}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export { type RouterContext, router, authService };