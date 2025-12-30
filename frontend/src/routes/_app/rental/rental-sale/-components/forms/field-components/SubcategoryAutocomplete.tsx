import { apiGet } from "@/api/apiGet";
import type { Subcategory } from "@/api/types";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

type Props = {
  rowId: string;
};

export function SubcategoryAutocomplete({ rowId }: Props) {
  const form = useFormContext();
  const categoryId = useStore(form.store, state => state.values.positions[rowId].categoryId);
  const { data } = useQuery({ 
    queryKey: ["subcategories", rowId], 
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories", searchParams: { categoryId } }),
    enabled: !!categoryId,
    gcTime: 0,
    staleTime: 0
  });

  console.log("categoryID", categoryId)

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
        options: (data && categoryId) ? data : Array<Subcategory>()
      }}
    />
  );
}