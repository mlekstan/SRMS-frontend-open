import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import type { dataField } from "@/routes/_app/register/-components/FullAccordition"



type TextFieldWrapperProps = {
  propsValues: dataField,
  ancestorValid: boolean,
  setAncestorValid: Dispatch<SetStateAction<boolean[]>>
  index: number,
};


function TextFieldWrapper({ propsValues, ancestorValid, setAncestorValid, index }: TextFieldWrapperProps ) {
  const { label, required, type } = propsValues;
  let valid = ancestorValid;

  return (
    <TextField 
      error={(!valid) ? true : false}       
      label={label}
      required={required} 
      type={type}
      onChange={(e) => {
        valid = !(required && e.target.value === '');
        if (ancestorValid !== valid) {
          setAncestorValid(prev => {
            const copy = [...prev];
            copy[index] = valid;
            return copy;
          });
        }
      }}
    />
  );
}

export default memo(TextFieldWrapper);