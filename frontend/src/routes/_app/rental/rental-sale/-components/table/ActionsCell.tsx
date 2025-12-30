import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import type { RentalSaleDataType } from "./useRentalSaleData";

type Props = {
  rowIndex: number;
  dataObject: RentalSaleDataType;
  form: any;
};

const emptyRow = {
  categoryId: "",
  subcategoryId: "",
  speed: "",
  numberOfItems: "",
  rentalLenght: "",
  charge: "",
}

export function ActionsCell({ rowIndex, dataObject, form }: Props) {

  return (
    <Box width={"80px"}>
      <IconButton onClick={() => {
        dataObject.insert(rowIndex + 1, emptyRow);
        form.insertFieldValue("positions", rowIndex + 1, emptyRow);
      }}>
        <AddBoxIcon />
      </IconButton>

      {
        (rowIndex > 0) &&
        <IconButton onClick={() => {
          dataObject.remove(rowIndex);
          form.removeFieldValue("positions", rowIndex);
        }}>
          <DeleteIcon />
        </IconButton>
      }

    </Box>
  );
}