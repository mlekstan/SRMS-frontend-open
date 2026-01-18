import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import type { RentalSalePosition } from "./useRentalSaleTable";

type Props = {
  rowIndex: number;
  form: any;
};

const emptyRow: RentalSalePosition = {
  subcategoryId: "",
  speed: "",
  numberOfItems: "",
  rentalLength: "",
  charge: 0,
  discount: "0",
  price: 0
}

export function ActionsCell({ rowIndex, form }: Props) {

  return (
    <Box width={"80px"}>
      <IconButton onClick={() => {
        form.insertFieldValue("positions", rowIndex + 1, emptyRow);
      }}>
        <AddBoxIcon />
      </IconButton>

      <IconButton 
        disabled={rowIndex === 0}
        onClick={() => {
          form.removeFieldValue("positions", rowIndex);
        }}>
        <DeleteIcon />
      </IconButton>

    </Box>
  );
}