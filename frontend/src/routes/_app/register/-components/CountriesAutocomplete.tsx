import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import options from "@/assets/data/countries.json";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";



export default function CountriesAutocomplete({ props }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  
  useEffect(() => {
    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    })
  }, [field.state.meta.isValid])

  const { label, required, type, ...others } = props

  console.log("Countries autocomplete")

  return (
    <Autocomplete 
      id="country-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      autoHighlight
      onChange={(e, value) => field.handleChange(value?.label)}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
          error={!field.state.meta.isValid}
          required={required}
          label={label}
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