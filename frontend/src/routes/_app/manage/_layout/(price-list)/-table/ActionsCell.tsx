import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from "@tanstack/react-form";

type Props = {
  rowIndex: number;
  form: any;
};


export function ActionsCell({ rowIndex, form }: Props) {
  const position = useStore(form.store, state => state.values.positions[rowIndex])
  const id = useStore(form.store, state => state.values.positions[rowIndex].id)

  return (
    <Box width={"80px"}>
      <IconButton onClick={() => {
        form.removeFieldValue("positions", rowIndex);
        if (id) {
          form.pushFieldValue("deletedPositions", position);
        }
      }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}