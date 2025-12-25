import { useContext, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import options from "@/assets/data/countries.json";
import { useFieldContext } from "../hooks/form-context";
import { AccordionValidUpdateContext } from "../../routes/_app/manage/-forms/AccordionValidUpdateContext";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";


export default function AreaCodeAutocomplete({ label, required }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const {t} = useTranslationContext();

  useEffect(() => {
    if (field.state.value === null) {
      field.setValue("");
    }
  });

  useEffect(() => {
    if (setAccordionValidState) {
      setAccordionValidState((prev) => {
        const copy = {...prev};
        copy[field.name] = field.state.meta.isValid;
        return (copy);
      })
    }
  }, [field.state.meta.isValid]);


  // value prop in MUI Autocomplete must be one options provided in options props. 
  // When the selected option is removed from Autocomplete value is changing to null.
  const value = field.state.value ? options.find((option) => option.phone === field.state.value) || null : null; 

  console.log("Area code autocomplete", field.state.value)
  
  return (
    <Autocomplete 
      id="country-areacode-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      // It is necessary to provide in order to see changes done in TanStack's form obj in our Autocomplete e.g. form.reset().
      value={value}
      autoHighlight
      // When value is null - value?.phone is undefined,
      // field.handleChange() takes undefined as argument.
      // After that component rerenders with 
      // field.state.value === undefined, but next re-renders
      // have field.state.value === "" - this happens automatically
      // probably it is default action of TanStack Form Lib.
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
          helperText={!field.state.meta.isValid && (field.state.meta.errors.map((error) => t(error)).join(' '))}
          error={!field.state.meta.isValid}
          required={required}
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