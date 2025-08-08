import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/rental/rental-sale')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_pathlessLayout/rental/rental-sale"!</div>
}
