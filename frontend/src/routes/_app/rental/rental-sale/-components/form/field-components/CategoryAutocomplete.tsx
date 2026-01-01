import { apiGet } from "@/api/apiGet";
import type { Category } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useQuery } from "@tanstack/react-query";

type Props = {
  rowId: string;
};

export function CategoryAutocomplete({ rowId }: Props) {
  const { data } = useQuery({ queryKey: ["categories", rowId], queryFn: () => apiGet<Category>({ url: "/categories" }) });

  return (
    <FormAutocomplete
      props={{
        sx: {
          width: "auto"
        },
        required: true,
        type: "text",
        optionLabel: "name",
        optionValue: "id",
        options: data ?? Array<Category>()
      }}
    />
  );
}