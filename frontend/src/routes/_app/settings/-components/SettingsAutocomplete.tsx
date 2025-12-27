import { Autocomplete, TextField, type AutocompleteChangeDetails, type AutocompleteChangeReason } from "@mui/material";
import type { ReactNode } from "react";

export type SettingsAutocompleteProps = {
  options: any[];
  value: any;
  onChange: ((event: React.SyntheticEvent, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined;
  label: ReactNode;
}

export function SettingsAutcomplete({ options, value, onChange, label }: SettingsAutocompleteProps) {

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={onChange}
      sx={{ width: "fit-content", display: "inline-flex" }}
      renderInput={(params) => 
        <TextField 
          {...params} 
          label={label}
          sx={{width: "25ch", m: 1}}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}             
        />
      }
    />
  );
}