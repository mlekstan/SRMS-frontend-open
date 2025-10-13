import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import TranslationProvider from '@/providers/TranslationProvider';
import type { RouterContext } from '@/main';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <TranslationProvider>
      <Outlet />
    </TranslationProvider>
  );
}
