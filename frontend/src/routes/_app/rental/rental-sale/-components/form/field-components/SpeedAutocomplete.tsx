import { apiGet } from "@/api/apiGet";
import type { Speed } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type Props = {
  rowId: string;
  rowIndex: number;
};

export function SpeedAutocomplete({ rowId, rowIndex }: Props) {
  const form = useFormContext();
  const subcategoryId = useStore(form.store, state => state.values.positions[rowIndex].subcategoryId);
  const { data } = useQuery({ 
    queryKey: ["price-list", "speed", rowId, { subcategoryId }],
    queryFn: () => apiGet<Speed>({ url: "/price-list/speeds", searchParams: { subcategoryId } }),
    enabled: !!subcategoryId
  });

  const options = useMemo(() => {
    if (!data)
      return new Array();

    return data.map(s => ({
      id: s.id, 
      maxSpeed: s.maxSpeed ?? "null", 
      label: s.maxSpeed ? String(s.maxSpeed) : "rentalService.sale.form.speed.undefined"
    }))
  }, [data]);

  return (
    <FormAutocomplete 
      props={{
        sx: {
          width: "150px"
        },
        disabled: !subcategoryId, 
        required: true,
        type: "text",
        optionLabel: "label",
        optionValue: "maxSpeed",
        options: options
      }}
    />
  );
}