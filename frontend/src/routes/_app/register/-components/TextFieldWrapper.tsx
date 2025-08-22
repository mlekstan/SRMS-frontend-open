import { memo, forwardRef } from "react";
import { IMaskInput } from "react-imask";
import type { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import type { dataField } from "@/routes/_app/register/-components/FullAccordion";
import { useFieldContext } from "@/routes/_app/register/client";



type TextFieldWrapperProps = {
  fieldDef: dataField,
  field: any,
  ancestorValid: boolean,
  setAncestorValid: Dispatch<SetStateAction<boolean[]>>
  index: number,
};



const CustomInput = forwardRef<HTMLInputElement, any>(function CustomInput(props, ref) {
  const { component: Component, imaskProps, ...other } = props;

  return (
    <Component {...other} {...imaskProps} inputRef={ref} />
  );
});


function TextFieldWrapper({ fieldDef, ancestorValid, setAncestorValid, index }: TextFieldWrapperProps ) {
  const field = useFieldContext<string>();

  
  const { label, required, type, imaskProps, customAutocomplete: CustomAutocomplete } = fieldDef;
  let valid = ancestorValid;

  if (!CustomAutocomplete) {
    return (
      <TextField 
        error={(!valid) ? true : false}
        label={label}
        required={required} 
        type={type}
        onChange={(e) => {
          field.handleChange
  
          valid = !(required && e.target.value === '');
          if (ancestorValid !== valid) {
            setAncestorValid(prev => {
              const copy = [...prev];
              copy[index] = valid;
              return copy;
            });
          }
        }}
        slotProps={{
          input: {
            inputComponent: CustomInput,
            inputProps: {
              component: IMaskInput,
              imaskProps: imaskProps,
            },
          },
        }}
      />
    );
  } else {
    return (
      <CustomAutocomplete 
        label={label}
        onChange={() => {
          
        }}
      />
    );
  }
}

export default memo(TextFieldWrapper);
