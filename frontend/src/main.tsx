import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@/index.css';
import { routeTree } from '@/routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthService } from './context-api/auth/AuthService';
import { AuthProvider } from './context-api/auth/AuthProvider';


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export type RouterContext = {
  queryClient: QueryClient;
  authService: AuthService;
}


const queryClient = new QueryClient();
const authService = new AuthService();
export const router = createRouter({ 
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