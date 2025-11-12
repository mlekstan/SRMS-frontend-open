import { forwardRef, useEffect, useContext } from "react";
import { IMaskInput } from "react-imask";
import { InputAdornment, TextField } from "@mui/material";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";
import { useTranslationContext } from "@/providers/TranslationContext";


const CustomInput = forwardRef<HTMLInputElement, any>(function CustomInput(props, ref) {
  const { component: Component, imaskProps, onChange, ...other } = props;

  return (
    <Component 
      {...other} 
      {...imaskProps}
      inputRef={ref} 
      onAccept={(value: any) => onChange({ target: {value} })} 
    />
  );
});


function FormTextField({ props }) {

  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const {t} = useTranslationContext();

  const { label, endAdornment, required, disabled, type, imaskProps } = props;
  const value = disabled ? "" : field.state.value ?? "";


  useEffect(() => {
    if (field.state.value === null) {
      field.setValue("");
    }

    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    });
  }, [field.state.meta.isValid]);



  console.log("Text field", field.name, field.state.value, value);

  return (
    <TextField 
      helperText={!field.state.meta.isValid && (field.state.meta.errors.map((error) => t(error)).join(' '))}
      error={!field.state.meta.isValid}
      label={t(label)}
      required={required}
      value={value}
      type={type}
      disabled={disabled}
      onChange={(e) => {  
        console.log(e.target.value)
        field.handleChange(e.target.value)
      }}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
          inputComponent: CustomInput,
          inputProps: {
            component: IMaskInput,
            imaskProps: imaskProps,
          },
        },
      }}
    />
  );   
}


export default FormTextField;