import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import TranslationProvider from '@/routes/-context-api/translation/TranslationProvider';
import type { RouterContext } from '@/main';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <ThemeProvider theme={theme}>
      <TranslationProvider>
        <Outlet />
      </TranslationProvider>
    </ThemeProvider>
  );
}
