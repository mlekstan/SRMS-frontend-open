import { useMemo } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { SettingsAutocompleteProps } from "../-components/SettingsAutocomplete";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme } from "@mui/material";
import { useSettingsAutocompleteOptions } from "./useSettingsAutocompleteOptions";

type Setting = {
  icon: any;
  title: string;
  autocomplete: SettingsAutocompleteProps;
}

export function useSettings() {
  const { t, lang, setLang } = useTranslationContext();
  const { mode, setMode } = useColorScheme();
  const { langOptions, themeOptions } = useSettingsAutocompleteOptions();
  const settings = useMemo<Setting[]>(() => (
    [
      {
        icon: LanguageIcon,
        title: t("settings.lang"),
        autocomplete: {
          options: langOptions,
          value: langOptions.find(option => option.code === lang),
          onChange: (e, val) => setLang(val ? val.code : lang),
          label: t("settings.lang"),
        }
      },
      {
        icon: DarkModeIcon,
        title: t("settings.theme"),
        autocomplete: {
          options: themeOptions,
          value: themeOptions.find(option => option.code === mode),
          onChange: (e, val) => setMode(val ? val.code : mode),
          label: t("settings.theme"),
        }
      }
    ]
  ), [langOptions, themeOptions])

  return settings;
}