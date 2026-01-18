import { apiGet } from "@/api/apiGet";
import type { Count } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useFieldContext, useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useReservedItemsQuantity } from "../useReservedItemsQuantity";
import { useMemo } from "react";

type Props = {
  rowId: string;
  rowIndex: number;
};

export function QuantityAutocomplete({ rowId, rowIndex }: Props) {
  const form = useFormContext();
  const field = useFieldContext();

  const rawValue = useStore(field.store, state => state.value) as number | "";
  const currentValue = rawValue === "" ? 0 : Number(rawValue);

  const subcategoryId: number | "" = useStore(form.store, state => state.values.positions[rowIndex].subcategoryId);
  const reservedItemsQuantity = useReservedItemsQuantity(subcategoryId)

  const { data } = useQuery({
    queryKey: ["numberOfItems", { subcategoryId, free: "true" }],
    queryFn: () => apiGet<Count>({ url: "/items/count", searchParams: { subcategoryId: String(subcategoryId), free: "true" } }),
    enabled: !!subcategoryId
  });

  
  const options = useMemo(() => {
    let options = new Array();
    
    if (reservedItemsQuantity !== null && data) {
      options = Array.from({ length: (data.count - reservedItemsQuantity + currentValue)}, (v, i) => ({ count: i + 1 }));
    }
    return options;
  }, [currentValue, reservedItemsQuantity, data]);


  return (
    <FormAutocomplete
      props={{
        sx: { width: "auto" }, 
        disabled: !(subcategoryId && data),
        required: true,
        type: "text",
        optionLabel: "count",
        optionValue: "count",
        options: options
      }}
    />
  );
}