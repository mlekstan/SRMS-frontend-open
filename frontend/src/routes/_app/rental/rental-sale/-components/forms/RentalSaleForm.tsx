import { Paper, Typography } from "@mui/material";
import { RentalSaleTable } from "../table/RentalSaleTable";
import { useAppForm } from "@/global-form/hooks/form";
import type { RentalSalePosition } from "../table/useRentalSaleTable";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";


export const initialPositionsData: RentalSalePosition[] = [
  {
    categoryId: "",
    subcategoryId: "",
    speed: "",
    numberOfItems: "",
    rentalLenght: "",
    charge: ""
  }
];


export function RentalSaleForm() {
  const { t } = useTranslationContext();
  const form = useAppForm({
    defaultValues: {
      barcode: "",
      positions: initialPositionsData
    }
  });

  return (
    <form.AppForm>
      <Paper sx={{ marginBottom: "20px", padding: "20px"}}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>{ t("rentalService.sale.form.card.title") }</Typography>
        <form.AppField name="barcode">
          {
            (field) => <field.CardAutocomplete />
          }
        </form.AppField>
      </Paper>
      <Paper sx={{ flex: 1, overflow: "hidden", paddingY: "20px" }}>
        <RentalSaleTable />
      </Paper>
    </form.AppForm>
  );
}