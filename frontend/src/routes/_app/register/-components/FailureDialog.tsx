import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import { useTranslationContext } from "@/providers/TranslationContext";

type FailureDialogProps = {
  open: boolean;
  closeFn: () => void;
  duration: number | null;
  message: string;
}

export function FailureDialog({ open, closeFn, duration, message }: FailureDialogProps) {
  const {t} = useTranslationContext();

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
          <span>{t("failureDialog.title")}</span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <span style={{display: "block", marginBottom: "0.5rem"}}>{t("failureDialog.info")}</span>
        <span>{ t("failureDialog.message", { "message": message }) }</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFn}>{t("failureDialog.button")}</Button>
      </DialogActions>
    </Dialog>
  );
}