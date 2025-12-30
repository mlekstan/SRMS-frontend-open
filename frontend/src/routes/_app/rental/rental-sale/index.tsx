import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { RentalSaleForm } from './-components/forms/RentalSaleForm';

export const Route = createFileRoute('/_app/rental/rental-sale/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box sx={{
      padding: "30px",
      height: "100%",
      boxSizing: "border-box"
    }}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <RentalSaleForm />
      </Box>
    </Box>
  );
}
