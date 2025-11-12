import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import { useTranslationContext } from "@/providers/TranslationContext";
import type { LangKeys } from "@/providers/TranslationProvider";

type SuccessDialogProps = {
  open: boolean;
  duration: number | null;
  closeFn: () => void;
  info: LangKeys;
}

export function SuccessDialog({ open, duration, closeFn, info }: SuccessDialogProps) {
  const {t} = useTranslationContext();

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
          <span>{t("successDialog.title")}</span>
        </Box>
      </DialogTitle>
      <DialogContent>{t(info)}</DialogContent>
      <DialogActions>
        <Button onClick={closeFn}>{t("successDialog.button")}</Button>
      </DialogActions>
    </Dialog>
  );
}
