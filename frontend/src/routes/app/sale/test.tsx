import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/sale/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sale/test"!</div>
}
