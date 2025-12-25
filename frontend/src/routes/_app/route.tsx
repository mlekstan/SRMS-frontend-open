import { createFileRoute, redirect } from '@tanstack/react-router'
import App from '@/components/core/app/App'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authService.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return <App />
}
