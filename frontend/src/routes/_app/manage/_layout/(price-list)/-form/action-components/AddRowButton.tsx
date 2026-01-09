import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { Button } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useFormContext } from "@/global-form/hooks/form-context";
import type { PriceListPosition } from "../../-table/usePriceListTable";
import { useStore } from "@tanstack/react-form";

const emptyRow: PriceListPosition = { id: null, timeUnit: "", maxSpeed: "", price: "" };

export function AddRowButton() {
  const { t } = useTranslationContext();
  const form = useFormContext();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);

  return (
    <Button 
      variant="outlined" 
      startIcon={ <AddBoxIcon /> }
      onClick={() => form.insertFieldValue("positions", 0, emptyRow)}
      disabled={!(categoryId && subcategoryId)}
    >
      { t("registration.priceList.table.addRow") }
    </Button>
  );
}