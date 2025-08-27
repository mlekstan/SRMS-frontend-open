import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";

const options = ["True", "False"];

export default function BoolAutocomplete({ props }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  
  useEffect(() => {
    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    })
  }, [field.state.meta.isValid])

  const { label, ...others } = props

  console.log("Bool autocomplete", field.state.value)

  return (
    <Autocomplete 
      id="country-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      autoHighlight
      onChange={(e, value) => field.handleChange(value)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
          error={!field.state.meta.isValid}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}
        />
      )}
    />
  );
}