import { createFileRoute, Outlet } from '@tanstack/react-router'
import App from '@/components/core/app/App'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <App />
}
