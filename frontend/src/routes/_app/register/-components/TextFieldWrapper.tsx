import { TextField } from "@mui/material";



export default function TextFieldWrapper({values, ancestorValid, setAncestorValid, index}) {
  let valid = ancestorValid[index];

  return (
    <TextField 
      error={(!valid) ? true : false}       
      label={values.label}
      required={values.required} 
      type={values.type}
      onChange={(e) => {
        valid = !(values.required && e.target.value === '');
        setAncestorValid(prev => {
            const copy = [...prev];
            copy[index] = valid;
            return copy;
        });
      }}
    />
  );
}