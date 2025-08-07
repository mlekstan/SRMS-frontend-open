import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/rental/rental-sale')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/rental/rental-sale"!</div>
}
