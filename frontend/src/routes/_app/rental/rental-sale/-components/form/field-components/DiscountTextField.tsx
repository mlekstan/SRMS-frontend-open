import FormTextField from "@/global-form/field-components/FormTextField";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";

type Props = {
  rowIndex: number;
};

export function DiscountTextField({ rowIndex }: Props) {
  const form = useFormContext();
  const subcategoryId = useStore(form.store, state => state.values.positions[rowIndex].subcategoryId);
  const price = useStore(form.store, state => state.values.positions[rowIndex].price);

  return (
    <FormTextField 
      props={{
        endAdornment: "PLN",
        disabled: !subcategoryId, 
        required: false,
        type: "text",
        imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: Number(price), autofix: true, thousandsSeparator: " " }
      }}
    />
  );
}