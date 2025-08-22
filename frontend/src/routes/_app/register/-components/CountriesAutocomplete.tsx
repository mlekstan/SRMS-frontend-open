import { Autocomplete, TextField } from "@mui/material";
import options from "@/assets/data/countries.json";



export default function CountriesAutocomplete({ label, onChange }) {
  return (
    <Autocomplete 
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      onChange={onChange}
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