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


function CustomTextField({ setAccordionValid }) {
  const field = useFieldContext();
  const imaskProps = { mask: "0000000000000" , overwrite: true, lazy: false, placeholderChar: '_' };

  console.log(field.state)

  
  useEffect(() => {
    if (!field.state.meta.isValid) {
      setAccordionValid(() => false);
    } else {
      setAccordionValid(() => true);
    }
  })
  
  return (
    <TextField 
      helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
      error={!field.state.meta.isValid}
      label={"Kod karty klienta"}
      required={true} 
      type={"text"}
      
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