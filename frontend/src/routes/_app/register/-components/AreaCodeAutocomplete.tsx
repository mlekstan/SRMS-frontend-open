import { Autocomplete, TextField, Box } from "@mui/material";
import options from "@/assets/data/countries.json";
import { useFieldContext } from "../-form/hooks/form-context";


export default function AreaCodeAutocomplete({ label }) {
  const field = useFieldContext()

  console.log("Area code autocomplete")
  
  return (
    <Autocomplete 
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      onChange={(e, value) => field.handleChange(value)}
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