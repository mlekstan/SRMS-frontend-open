import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";
import { useQuery } from "@tanstack/react-query";
import { getActiveCards } from "../client";



export default function CardBarcodeAutocomplete({ props }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const { data: options } = useQuery({queryKey: ["cards"], queryFn: getActiveCards, enabled: false})
  
  useEffect(() => {
    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    })
  }, [field.state.meta.isValid]);

  const { label, required, type, ...others } = props;

  // value prop in MUI Autocomplete must be one options provided in options props. 
  // When the selected option is removed from Autocomplete value is changing to null.
  const value = field.state.value ? options.find((option) => option.cardBarcode === field.state.value) || null : null; 
  
  console.log("Countries autocomplete", field.state.value);

  return (
    <Autocomplete 
      id="country-select"
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      // It is necessary to provide in order to see changes done in TanStack's form obj in our Autocomplete e.g. form.reset().
      value={value}
      autoHighlight
      // When value is null - value?.label is undefined,
      // field.handleChange() takes undefined as argument.
      // After that component rerenders with 
      // field.state.value === undefined, but next re-renders
      // have field.state.value === "" - this happens automatically
      // probably it is default action of TanStack Form Lib.
      onChange={(e, value) => field.handleChange(value?.cardBarcode)} 
      getOptionLabel={(option) => option.cardBarcode}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
          error={!field.state.meta.isValid}
          required={required}
          label={label}
          type={type}
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