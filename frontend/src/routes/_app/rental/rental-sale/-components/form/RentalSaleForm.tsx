import { Paper } from "@mui/material";
import { RentalSaleTable } from "../table/RentalSaleTable";
import { useAppForm } from "@/global-form/hooks/form";
import type { RentalSalePosition } from "../table/useRentalSaleTable";
import { ReservedItemsQuantityProvider } from "./ReservedItemsQuantityProvder";
import { SubmitButton } from "@/global-form/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/api/apiPost";
import { Summary } from "./Summary";
import { rentalSaleFormSchema } from "./rentalSaleForm-schema";
import { useState } from "react";
import { Loader } from "@/routes/-components/Loader";
import { FailureDialog } from "@/routes/_app/manage/-components/general/FailureDialog";
import { SuccessDialog } from "@/routes/_app/manage/-components/general/SuccessDialog";


export const initialPositionsData: RentalSalePosition[] = [
  {
    subcategoryId: "",
    speed: "",
    numberOfItems: "",
    rentalLength: "",
    price: 0,
    discount: "0",
    charge: 0,
  }
];


export function RentalSaleForm() {
  const [error, setError] = useState<Error | null>(null);
  const mutation = useMutation({
    mutationFn: (vars: any) => apiPost({ url: "/rentalSales", value: vars.value }), 
    onSuccess: () => form.reset()
  });

  const form = useAppForm({
    defaultValues: {
      cardId: "",
      categoryId: "",
      positions: initialPositionsData
    }, 
    onSubmit: async ({ value }) => {
      try {
        const parsedValue = await rentalSaleFormSchema.parseAsync(value);
        await mutation.mutateAsync({ value: parsedValue });
      } catch (error) {
        if (error instanceof Error)
          setError(error);
      }
    }
  });

  return (
    <>
      <form.AppForm>
        <Paper sx={{ marginBottom: "20px", padding: "20px", display: "flex", justifyContent: "start", columnGap: "20px" }}>
          <form.AppField name="cardId">
            {
              (field) => <field.CardAutocomplete />
            }
          </form.AppField>
          <form.AppField name="categoryId">
            {
              (field) => <field.CategoryAutocomplete />
            }
          </form.AppField>
        </Paper>
        <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: "20px" }}>
          <ReservedItemsQuantityProvider>
            <form.Subscribe
              selector={status => status.values}
              children={(values) => {
                if (values.cardId && values.categoryId)
                  return (
                  <>
                    <RentalSaleTable />
                    <Summary />
                    <SubmitButton 
                      sx={{ marginX: "auto", marginY: "50px" }} 
                      title="rentalService.sale.form.submitButton"
                    />
                  </>
                  );
              }}
            />
          </ReservedItemsQuantityProvider>
        </Paper>
      </form.AppForm>

      {
        (mutation.isPending) && 
        <Loader open={true} />
      }

      {
        (error) && 
        <FailureDialog 
          open={!!error}
          closeFn={() => setError(null)}
          duration={null}
          info="failureDialog.info.submit"
          message={error.message}
        />
      }

      {
        (mutation.isSuccess) && 
        <SuccessDialog 
          open={true}
          closeFn={() => mutation.reset()}
          duration={2000}
          info="successDialog.info.submit"
        />
      }
    </>

  );
}