import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import options from "@/assets/data/countries.json";
import { useFieldContext } from "../-form/hooks/form-context";
import { AccordionValidUpdateContext } from "../-form/hooks/child-context";



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

  const { label, ...others } = props

  console.log("Countries autocomplete")

  return (
    <Autocomplete 
      id="country-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      autoHighlight
      onChange={(e, value) => field.handleChange(value)}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
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