import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/rental/equip-status')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_pathlessLayout/rental/equip-status"!</div>
}
