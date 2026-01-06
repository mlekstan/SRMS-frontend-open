import { useAppForm } from "@/global-form/hooks/form";
import { Paper } from "@mui/material";
import { PriceListTable } from "../-table/PriceListTable";
import { CategoryAutocomplete } from "./field-components/CategoryAutocomplete";
import { SubcategoryAutocomplete } from "./field-components/SubcategoryAutocomplete";
import type { PriceListPosition } from "../-table/usePriceListTable";

export function PriceListForm() {
  const form = useAppForm({
    defaultValues: {
      categoryId: "",
      subcategoryId: "",
      positions: new Array<PriceListPosition>()
    }
  });

  return (
    <form.AppForm>
      <Paper sx={{ marginBottom: "20px", padding: "20px" }}>
        <form.AppField name="categoryId">
          {
            () => <CategoryAutocomplete />
          }
        </form.AppField>
        <form.AppField name="subcategoryId">
          {
            () => <SubcategoryAutocomplete />
          }
        </form.AppField>
      </Paper>

      <Paper sx={{ flex: 1, overflow: "hidden", paddingY: "20px" }}>
        <PriceListTable />
      </Paper>
    </form.AppForm>
  );
}