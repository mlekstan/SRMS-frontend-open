import { useFieldContext, useFormContext } from "@/global-form/hooks/form-context";
import { Typography } from "@mui/material";
import { useStore } from "@tanstack/react-form";
import { useEffect } from "react";

type Props = {
  rowIndex: number;
};

export function ChargeText({ rowIndex }: Props) {
  const form = useFormContext();
  const field = useFieldContext();
  const price: number = useStore(form.store, state => state.values.positions[rowIndex].price);
  const discount: string = useStore(form.store, state => state.values.positions[rowIndex].discount);
  const charge = Math.max(0, price - Number(discount.replaceAll(" ", "")));

  useEffect(() => {
    if (charge)
      field.setValue(charge);
  }, [charge]);

  return (
    <Typography>
      { charge }
    </Typography>
  );
}