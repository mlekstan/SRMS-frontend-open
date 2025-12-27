import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangCodes } from "@/routes/-context-api/translation/TranslationProvider";

type LangOption = {
  label: string;
  code: LangCodes;
};

type ThemeOption = {
  label: string;
  code: "light" | "dark" | "system";
};


export function useSettingsAutocompleteOptions() {
  const { t } = useTranslationContext();

  const langOptions: LangOption[] = [
    { label: t("languages.pl"), code: "pl" },
    { label: t("languages.en"), code: "en" }
  ];

  const themeOptions: ThemeOption[] = [
    { label: t("theme.light"), code: "light" },
    { label: t("theme.dark"), code: "dark" },
    { label: t("theme.system"), code: "system" }
  ];

  return { langOptions, themeOptions };
}


