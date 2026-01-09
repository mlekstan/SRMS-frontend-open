import { apiGet } from "@/api/apiGet";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import type { VehiclePrice } from "@/api/types";
import { mergeServerData } from "./mergeServerData";
import { filterServerData } from "../-form/filterServerData";


export function usePriceListData(form: any) {
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.subcategoryId);
  const positions = form.state.values.positions;
  
  const { data } = useQuery({ 
    queryKey: ["price-list", { categoryId, subcategoryId }],
    queryFn: () => apiGet<VehiclePrice>({ url: "/price-list", searchParams: { categoryId, subcategoryId } }),
    enabled: !!(categoryId && subcategoryId),
    select: data => filterServerData(data),
    staleTime: 0
  });

  const mergedData = useMemo(() => (data) ? mergeServerData(positions, data) : [], [data]);
  console.log("mergedData", mergedData)

  useEffect(() => {
    form.setFieldValue("deletedPositions", []);
  }, [data, form]);

  useEffect(() => {
    form.setFieldValue("positions", mergedData);
  }, [data]);

}