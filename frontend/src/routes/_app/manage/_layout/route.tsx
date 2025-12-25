import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SafeArea } from '../-components/general/SafeArea';
import { Paper } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SafeArea>
      <Paper sx={{overflow: "hidden", backgroundColor: "secondary.light"}}>
        <Outlet />
      </Paper>
    </SafeArea>
  );
}
