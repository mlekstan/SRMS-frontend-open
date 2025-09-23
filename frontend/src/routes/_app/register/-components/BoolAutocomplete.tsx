import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFieldContext } from "../-forms/hooks/form-context";
import { AccordionValidUpdateContext } from "../-forms/hooks/child-context";
import { useTranslationContext } from "@/providers/TranslationContext";
import type { LangKeys } from "@/providers/TranslationProvider";

type Option = {
  label: string;
}


export default function BoolAutocomplete({ props }) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const {t} = useTranslationContext();

  const options: Option[] = [
    { label: t("bool.yes") },
    { label: t("bool.no") }
  ]

  useEffect(() => {
    setAccordionValidState((prev) => {
      const copy = {...prev};
      copy[field.name] = field.state.meta.isValid;
      return (copy);
    })
  }, [field.state.meta.isValid])

  const { label, required, ...others } = props

  console.log("Bool autocomplete", field.state.value)

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
          label={label}
          helperText={!field.state.meta.isValid && (field.state.meta.errors.join(', '))}
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