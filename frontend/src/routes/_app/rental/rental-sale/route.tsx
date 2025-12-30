import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/rental/rental-sale')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Outlet />
  );
}
