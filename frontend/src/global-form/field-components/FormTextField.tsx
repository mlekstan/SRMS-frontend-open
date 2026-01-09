import { forwardRef, useEffect, useContext, useRef, type ReactNode, useCallback } from "react";
import { IMaskInput } from "react-imask";
import { InputAdornment, TextField } from "@mui/material";
import { useFieldContext } from "../hooks/form-context";
import { AccordionValidUpdateContext } from "../../routes/_app/manage/-forms/AccordionValidUpdateContext";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";


export type FormTextFieldProps = {
  label?: LangKeys;
  endAdornment?: ReactNode;  
  required: boolean;
  disabled?: boolean;
  type: string;
  imaskProps: any;
}


const CustomInput = forwardRef<HTMLInputElement, any>(function CustomInput(props, ref) {
  const { component: Component, imaskProps, value, onChange, ...other } = props;
  const field = useFieldContext();
  const maskRef = useRef<any>(null);

  console.log("CustomInput", field.name, value, field.state.value)

  useEffect(() => {
    if (maskRef.current.maskRef && value != maskRef.current.maskRef.value) {
      console.log("MaskRef", field.name, maskRef)
      field.setValue(maskRef.current.maskRef.value);
    }
  });

  return (
    <Component 
      {...other} 
      {...imaskProps}
      value={value}
      inputRef={ref}
      ref={maskRef}
      onAccept={(value: any) => onChange({ target: {value} })} 
    />
  );
});


function FormTextField({ props }: { props: FormTextFieldProps }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const {t} = useTranslationContext();
  const { label, endAdornment, required, disabled, type, imaskProps } = props;
  const formatValue = () => {
    if (field.state.value === null || disabled) 
      return "";
      
    return String(field.state.value);
  }

  const value = formatValue();

  useEffect(() => {
    if (setAccordionValidState) {
      setAccordionValidState((prev) => {
        const copy = {...prev};
        copy[field.name] = field.state.meta.isValid;
        return (copy);
      });
    }
  }, [field.state.meta.isValid]);

  console.log("Text field", field.name, field.state.value);

  
  return (
    <TextField
      helperText={!field.state.meta.isValid ? (field.state.meta.errors.map((error) => t(error)).join(' ')) : " "}
      error={!field.state.meta.isValid}
      label={label ? t(label) : undefined}
      required={required}
      value={value}
      type={type}
      disabled={disabled}
      onChange={(e) => {
        field.handleChange(e.target.value)
      }}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
          inputComponent: CustomInput,
          inputProps: {
            component: IMaskInput,
            imaskProps: imaskProps,
            value: value,
          },
        },
      }}
    />
  );   
}


export default FormTextField;