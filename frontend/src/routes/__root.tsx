import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TranslationProvider from '@/providers/TranslationProvider';


const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <Outlet />
      </TranslationProvider>
    </QueryClientProvider>

  );
}
