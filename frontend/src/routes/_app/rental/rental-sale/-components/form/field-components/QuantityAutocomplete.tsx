import { apiGet } from "@/api/apiGet";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

type Props = {
  rowId: string;
};

export function QuantityAutocomplete({ rowId }: Props) {
  const form = useFormContext();
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);
  const { data } = useQuery({
    queryKey: ["numberOfItems", rowId],
    queryFn: () => apiGet({ url: "/items", searchParams: { subcategoryId } })
  });

  return (
    <FormAutocomplete
      props={{
        sx: {
          width: "auto"
        },
        required: true,
        type: "text",
        optionLabel: "",
        optionValue: "",
        options: data ?? Array()
      }}
    />
  );
}