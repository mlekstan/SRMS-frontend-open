import FormTextField from "@/global-form/field-components/FormTextField";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { IMask } from "react-imask";

type Props = {
  rowId: string;
  rowIndex: number;
};

export function TimeTextField({ rowId, rowIndex }: Props) {
  const form = useFormContext();
  const subcategoryId = useStore(form.store, state => state.values.positions[rowIndex].subcategoryId);

  return (
    <FormTextField 
      props={{
        sx: {
          width: "auto"
        },
        disabled: !subcategoryId,
        required: true,
        type: "text",
        imaskProps: {
          mask: "d h:m",
          lazy: false,
          autofix: true,
          overwrite: true,
          blocks: {
            d: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 99, 
              maxLength: 1,
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
            },
          }
        }
      }}
    />
  );
}