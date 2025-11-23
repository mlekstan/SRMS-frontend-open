import { Autocomplete, TextField } from "@mui/material";
import { memo, useEffect } from "react";
import type { LangKeys } from "@/providers/TranslationProvider";
import { useTranslationContext } from "@/providers/TranslationContext";

type TableAutocompleteProps<K> = {
  options: K[];
  placeholder: LangKeys;
  onChange: (value: K[keyof K] | null) => void;
  optionValue: keyof K;
  optionLabel: keyof K;
  error: boolean;
  errorMessage: LangKeys;
  setError: (isError: boolean) => void;
}


function TableAutocomplete<T extends Record<string, any>>({ 
  options, 
  placeholder, 
  onChange, 
  optionValue, 
  optionLabel, 
  error, 
  errorMessage, 
  setError 
}: TableAutocompleteProps<T>) {

  const { t } = useTranslationContext();

  useEffect(() => {
    setError(error);
  }, [error]);

  return (
    <Autocomplete 
      sx={{ width: "fit-content", display: "inline-flex" }}
      autoHighlight
      options={options}
      getOptionLabel={(option) => {
        try {
          return t(option[optionLabel] as LangKeys);
        } catch (error) {
          return option[optionLabel];
        }
      }}
      onChange={(_, value) => onChange(value?.[optionValue] ?? null)}
      renderInput={(params) => (
        <TextField
          error={error}
          helperText={error ? t(errorMessage) : " " }
          placeholder={t(placeholder)}
          {...params}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "off",
            },
          }}
        />
      )}
    />
  );
}


export default memo(TableAutocomplete); 