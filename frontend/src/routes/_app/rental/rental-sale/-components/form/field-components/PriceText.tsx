import { apiGet } from "@/api/apiGet";
import { useFieldContext, useFormContext } from "@/global-form/hooks/form-context";
import { Typography } from "@mui/material";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


type Props = {
  rowId: string;
  rowIndex: number;
}


export function PriceText({ rowId, rowIndex }: Props) {
  const form = useFormContext();
  const field = useFieldContext();
  const categoryId = useStore(form.store, state => state.values.categoryId);
  const subcategoryId = useStore(form.store, state => state.values.positions[rowIndex].subcategoryId);
  const speed = useStore(form.store, state => state.values.positions[rowIndex].speed);
  const rentalLength = useStore(form.store, state => state.values.positions[rowIndex].rentalLength);
  const numberOfItems = useStore(form.store, state => state.values.positions[rowIndex].numberOfItems);

  const regexp = /^(\d{1,2})\s(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  const queryEnabled = !!(subcategoryId && speed && regexp.test(rentalLength) && numberOfItems);
  const { data } = useQuery({ 
    queryKey: ["price", rowId, { categoryId, subcategoryId, speed, rentalLength, numberOfItems }], 
    queryFn: () => apiGet({ url: "price-list/price", searchParams: { categoryId, subcategoryId, speed, rentalLength, numberOfItems } }),
    enabled: queryEnabled
  });

  useEffect(() => {
    if (data)
      field.setValue(data.price)
  }, [data])

  return (
    <Typography>
      {
        field.state.value as number
      }
    </Typography>
  );
}