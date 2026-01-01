import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SafeArea } from '../-components/general/SafeArea';


export const Route = createFileRoute('/_app/manage/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SafeArea sx={{ height: "100%", boxSizing: "border-box" }}>
      <Outlet />
    </SafeArea>
  );
}
