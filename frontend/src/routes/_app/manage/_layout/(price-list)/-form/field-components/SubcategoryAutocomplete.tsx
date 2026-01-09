import { apiGet } from "@/api/apiGet";
import type { Subcategory } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

export function SubcategoryAutocomplete() {
  const form = useFormContext();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const { data } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories", searchParams: { categoryId } }),
    enabled: !!categoryId,
    gcTime: 0,
    staleTime: 0,
  });

  return (
    <FormAutocomplete 
      props={{
        sx: {
          width: "200px"
        },
        label: "registration.priceList.form.filter.subcategory",
        required: true,
        type: "text",
        optionLabel: "name",
        optionValue: "id",
        options: (data && categoryId) ? data : new Array<Subcategory>()
      }}
    />
  );
}