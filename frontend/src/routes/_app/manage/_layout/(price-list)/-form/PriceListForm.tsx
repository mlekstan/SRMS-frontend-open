import { useAppForm } from "@/global-form/hooks/form";
import { Box, Paper } from "@mui/material";
import { PriceListTable } from "../-table/PriceListTable";
import { CategoryAutocomplete } from "./field-components/CategoryAutocomplete";
import { SubcategoryAutocomplete } from "./field-components/SubcategoryAutocomplete";
import type { PriceListPosition } from "../-table/usePriceListTable";
import { usePriceListData } from "../-table/usePriceListData";
import { AddRowButton } from "./action-components/AddRowButton";
import { ResetFormButton } from "./action-components/ResetFormButton";
import { RefreshButton } from "./action-components/RefreshButton";
import { SubmitButton } from "@/global-form/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/api/apiPost";
import { priceListFormSchema } from "./priceListForm-scheme";
import { Loader } from "@/routes/-components/Loader";
import { FailureDialog } from "../../../-components/general/FailureDialog";
import type { VehiclePrice } from "@/api/types";
import { useState } from "react";
import { SuccessDialog } from "../../../-components/general/SuccessDialog";
import { filterServerData } from "./filterServerData";


export function PriceListForm() {
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vars: any) => apiPost<VehiclePrice[]>({ url: "/price-list", searchParams: vars.searchParams, value: vars.value }),
    onSuccess(data) {
      const { categoryId, subcategoryId } = form.state.values;
      form.setFieldValue("deletedPositions", []);
      form.setFieldValue("positions", filterServerData(data));
      queryClient.setQueryData(["price-list", { categoryId, subcategoryId }], data);
    }, 
  });

  const form = useAppForm({
    defaultValues: {
      categoryId: "",
      subcategoryId: "",
      positions: new Array<PriceListPosition>(),
      deletedPositions: new Array<PriceListPosition>()
    },
    onSubmit: async ({ value, formApi }) => {
      const { categoryId, subcategoryId } = formApi.state.values;
      const { positions, deletedPositions } = value;
      
      try {
        const parsedPositions = await priceListFormSchema.parseAsync(positions);
        const parsedDeletedPositions = await priceListFormSchema.parseAsync(deletedPositions);
        await mutation.mutateAsync({
          value: { positions: parsedPositions, deletedPositions: parsedDeletedPositions },
          searchParams: { categoryId, subcategoryId }
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
    }
  });
  usePriceListData(form);

  return (
    <>
      <form.AppForm>
        <Paper sx={{ marginBottom: "20px", padding: "20px", display: "flex", justifyContent: "start", columnGap: "20px" }}>
          <form.AppField 
            name="categoryId" 
            listeners={{ 
              onChange: ({ value }) => {
                if (value === "") 
                  form.setFieldValue("subcategoryId", "");
              }
            }}
          >
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

        <Paper sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "end", paddingY: "20px", paddingX: "20px", columnGap: "10px" }}>
            <AddRowButton />
            <RefreshButton />
            <ResetFormButton />
          </Box>
          <PriceListTable />
            <SubmitButton 
              sx={{ marginX: "auto", marginY: "20px" }} 
              title="registration.priceList.form.submitButton"
            />
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