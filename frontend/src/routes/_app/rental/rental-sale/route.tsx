import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/rental/rental-sale')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
    <Box sx={{
      padding: "30px",
      height: "100%",
      boxSizing: "border-box"
    }}>
      <Outlet />
    </Box>
  );
}
