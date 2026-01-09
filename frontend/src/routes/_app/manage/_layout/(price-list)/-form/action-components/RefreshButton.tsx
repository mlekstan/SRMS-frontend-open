import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { Button } from "@mui/material";
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { useQueryClient } from "@tanstack/react-query";
import type { VehiclePrice } from "@/api/types";
import { apiGet } from "@/api/apiGet";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";

export function RefreshButton() {
  const { t } = useTranslationContext();
  const form = useFormContext();
  const queryClient = useQueryClient();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);

  return (
    <Button
      variant="outlined"
      startIcon={ <CloudSyncIcon /> }
      onClick={() => {
        if (categoryId && subcategoryId) {
          queryClient.fetchQuery({
            queryKey: ["price-list", { categoryId, subcategoryId }],
            queryFn: () => apiGet<VehiclePrice>({ url: "/price-list", searchParams: { categoryId, subcategoryId } }),
          });
        }
      }
      }
      disabled={!(categoryId && subcategoryId)}
    >
      { t("registration.priceList.table.refresh") }
    </Button>
  );
}