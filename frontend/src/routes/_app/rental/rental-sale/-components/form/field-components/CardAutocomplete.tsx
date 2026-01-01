import { apiGet } from "@/api/apiGet";
import type { Card } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useQuery } from "@tanstack/react-query";

export function CardAutocomplete() {
  const { data } = useQuery({ 
    queryKey: ["cards", "issued"], 
    queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { issued: "true" } }) 
  });

  return (
    <FormAutocomplete 
      props={{
        sx: {
          width: "200px"
        },
        label: "rentalService.sale.form.card.barcode",
        required: true,
        type: "text",
        optionLabel: "barcode",
        optionValue: "id",
        options: data ?? new Array<Card>()
      }}
    />
  );
}