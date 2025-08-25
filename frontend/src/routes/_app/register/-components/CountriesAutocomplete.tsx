import { Autocomplete, TextField } from "@mui/material";
import options from "@/assets/data/countries.json";



export default function CountriesAutocomplete({ setAccordionValid, props }) {
  return (
    <Autocomplete 
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      //onChange={onChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"Kraj"}
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