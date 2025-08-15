import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/register/client"!</div>
}
