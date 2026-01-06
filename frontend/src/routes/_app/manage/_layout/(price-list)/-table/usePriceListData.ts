import { apiGet } from "@/api/apiGet";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { PriceListPosition } from "./usePriceListTable";
import { useTableFormData } from "./useTableFormData";
import type { VehiclePrice } from "@/api/types";


const initialData: PriceListPosition[] = [
  { id: null, timeUnit: "", maxSpeed: "", price: "" },
]

export function usePriceListData() {
  const form = useFormContext();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);
  const { data = [] } = useQuery({ 
    queryKey: ["price-list", { categoryId, subcategoryId }],
    queryFn: () => apiGet<VehiclePrice>({ url: "/price-list", searchParams: { categoryId, subcategoryId } }),
    enabled: !!(categoryId && subcategoryId),
    select: data => data.map((pos) => {
      const { vehicleId, maxSpeed, ...other } = pos;
      return { 
        maxSpeed: String(maxSpeed), 
        ...other
      };
    })
  });

  const dataObject = useTableFormData(initialData);

  useEffect(() => {
    dataObject.setSeverData(data);
    form.setFieldValue("positions", data);
  }, [data]);

  return dataObject;
}