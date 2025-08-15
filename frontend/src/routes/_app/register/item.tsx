import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/register/item')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/register/item"!</div>
}
