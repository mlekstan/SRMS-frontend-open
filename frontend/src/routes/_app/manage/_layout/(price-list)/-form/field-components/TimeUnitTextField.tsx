import FormTextField from "@/global-form/field-components/FormTextField";
import { IMask } from "react-imask"

export function TimeUnitTextField() {

  return (
    <FormTextField 
      props={{
        required: true,
        type: "text",
        imaskProps: {
          mask: "d:h:m",
          lazy: false,
          autofix: true,
          blocks: {
            d: {
              mask: IMask.MaskedRange,
              from: 0, 
              to: 99, 
              maxLength: 2, 
              placeholderChar: 'd'
            },
            h: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 23, 
              maxLength: 2,
              placeholderChar: 'h'
            },
            m: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 59, 
              maxLength: 2,
              placeholderChar: 'm'
            }
          }
        }
      }}
    />
  );
}