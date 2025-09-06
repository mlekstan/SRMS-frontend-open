import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import { useFormContext } from "../-forms/hooks/form-context";
import { useStore } from "@tanstack/react-form";

export function SuccessDialog({ open, duration, closeFn }) {
  console.log("Renedering")
  
  useEffect(() => {
    if (duration) {
      setTimeout(closeFn, duration);
    }
  })

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
