import FormTextField from "@/global-form/field-components/FormTextField";

export function PriceTextField() {

  return (
    <FormTextField 
      props={{
        endAdornment: "PLN",
        required: true,
        type: "text",
        imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99, autofix: true, thousandsSeparator: " " }
      }}
    />
  );
}