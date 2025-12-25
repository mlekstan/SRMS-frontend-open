import { Autocomplete, Box, Divider, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { LangCodes } from '@/routes/-context-api/translation/TranslationProvider';


type LangOption = {
  label: string;
  code: LangCodes;
}


export const Route = createFileRoute('/_app/settings')({
  component: RouteComponent,
})


function RouteComponent() {
  const {t, setLang, lang} = useTranslationContext();


  const languages: LangOption[] = [
    { label: t("languages.pl"), code: "pl" },
    { label: t("languages.en"), code: "en" }
  ]

  return (
    <Box>
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t("settings.lang")} />
          <Autocomplete
            options={languages}
            value={languages.find((option) => option.code === lang)}
            onChange={(e, val) => {
              setLang(val ? val.code : lang)
            }}
            sx={{ width: "fit-content", display: "inline-flex" }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="Language"
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
        </ListItem>
        <Divider component="li" />
      </List>
    </Box>
  );
}
