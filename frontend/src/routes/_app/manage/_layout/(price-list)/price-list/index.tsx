import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/manage/_layout/(price-list)/price-list/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
    <Box sx={{
      height: "100%",
      backgroundColor: "pink"
    }}>
      
    </Box>
  );
}