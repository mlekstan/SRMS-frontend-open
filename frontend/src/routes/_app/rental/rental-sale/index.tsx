import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { RentalSaleForm } from './-components/form/RentalSaleForm';

export const Route = createFileRoute('/_app/rental/rental-sale/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <RentalSaleForm />
    </Box>
  );
}