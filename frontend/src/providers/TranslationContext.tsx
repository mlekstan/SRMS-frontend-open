import { createContext, useContext } from "react";
import { type LangCodes, type LangKeys } from "./TranslationProvider";


export const TranslationContext = createContext<
  { 
    t: ((key: LangKeys, replacements?: Record<string, string>) => string), 
    setLang: (langCode: LangCodes) => void,
    lang: LangCodes
  } | null
>(null);

export function useTranslationContext() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("There is no value passed to Provider");
  }

  return context;
}