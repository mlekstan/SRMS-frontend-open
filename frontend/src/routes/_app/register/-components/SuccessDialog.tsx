import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';


export function SuccessDialog({ open, duration, closeFn }) {
  console.log("Renedering")
  
  useEffect(() => {
    if (open && typeof duration === "number" && duration > 0) {
      const id = setTimeout(() => closeFn(), duration);

      return () => {
        clearTimeout(id)
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CheckCircleOutlineSharpIcon sx={{marginRight: 2, color: "success.main"}}/>
          <span>Success</span>
        </Box>
      </DialogTitle>
      <DialogContent>Form submitted succesfully.</DialogContent>
      <DialogActions>
        <Button onClick={closeFn}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
