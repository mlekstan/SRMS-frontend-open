import { useContext, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import options from "@/assets/data/countries.json";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";



export default function AreaCodeAutocomplete({ label }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);

  useEffect(() => {
    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    })
  }, [field.state.meta.isValid])



  console.log("Area code autocomplete", field.state.value)
  
  return (
    <Autocomplete 
      id="country-areacode-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      autoHighlight
      onChange={(e, value) => field.handleChange(value?.phone)}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        );
      }}
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