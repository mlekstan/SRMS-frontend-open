import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSettings } from "../-hooks/useSettings";
import { SettingsAutcomplete } from "./SettingsAutocomplete";

export function SettingsList() {
  const settings = useSettings();

  return (
    <List sx={{ width: '100%' }}>
      {
        settings.map((s, i) => (
          <Box key={i}>
            <ListItem>
              <ListItemIcon>
                { <s.icon /> }
              </ListItemIcon>
              <ListItemText primary={s.title} />
                <SettingsAutcomplete 
                  options={s.autocomplete.options}
                  value={s.autocomplete.value}
                  onChange={s.autocomplete.onChange}
                  label={s.autocomplete.label}
                />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))
      }
    </List>
  );
}