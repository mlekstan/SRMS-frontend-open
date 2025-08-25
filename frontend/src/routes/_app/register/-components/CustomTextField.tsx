import { memo, forwardRef, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { useFieldContext } from "../-form/hooks/form-context";
import { TextField } from "@mui/material";



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


function CustomTextField({ props }) {
  const field = useFieldContext();
  const { label, required, disabled, type, imaskProps, ...other } = props;
  const value = disabled ? "" : field.state.value ?? "";

  console.log("Custom text field")
  
  return (
    <TextField 
      helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
      error={!field.state.meta.isValid}
      label={label}
      required={required}
      value={value}
      type={type}
      disabled={disabled}
      onChange={(e) => {  
        console.log(e.target.value)
        field.handleChange(e.target.value.split("_").join(""))
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
}


export default CustomTextField;