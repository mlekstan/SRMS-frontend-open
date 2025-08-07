import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/rental')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/rentalxdddd"!<Outlet /></div>
}
