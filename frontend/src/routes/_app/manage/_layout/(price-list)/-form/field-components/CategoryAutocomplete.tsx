import { apiGet } from "@/api/apiGet";
import type { Category } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useQuery } from "@tanstack/react-query";

export function CategoryAutocomplete() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiGet<Category>({ url: "/categories" })
  });

  return (
    <FormAutocomplete 
      props={{
        label: "registration.priceList.form.filter.category",
        required: true,
        type: "text",
        optionLabel: "name",
        optionValue: "id",
        options: data ?? new Array<Category>()
      }}
    />
  );
}