import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';

export function FailureDialog({ open, closeFn, duration, message }) {
  console.log("Renedering failure")
  
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
          <ErrorOutlineSharpIcon sx={{marginRight: 2, color: "error.main"}}/>
          <span>Failure</span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <span style={{display: "block", marginBottom: "0.5rem"}}>Error occured during form submission.</span>
        <span>Message: {message}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFn}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}