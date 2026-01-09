import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { Button } from "@mui/material";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import type { PriceListPosition } from "../../-table/usePriceListTable";

export function ResetFormButton() {
  const { t } = useTranslationContext();
  const form = useFormContext();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);
  const positions: PriceListPosition[] = useStore(form.store, state => state.values.positions);
  console.log("positions", positions)
  const filteredPositions = positions.filter((p) => p.id !== null);
  console.log("fpositions", filteredPositions)

  return (
    <Button
      variant="outlined"
      startIcon={ <SettingsBackupRestoreIcon /> }
      onClick={() => form.setFieldValue("positions", filteredPositions)}
      disabled={!(categoryId && subcategoryId)}
    >
      { t("registration.priceList.table.reset") }
    </Button>
  );
}