import { memo, useCallback, useEffect, useState, type ReactNode } from "react";
import pl from "../../../lang/pl.json";
import en from "../../../lang/en.json";
import { TranslationContext } from "./TranslationContext";
import type { Leaves } from "@/types/Leaves";
import { pickTranslation } from "./pickTranslation";
import { formatTranslation } from "./formatTranslation";
import { useLocalStorageItem } from "@/hooks/local-storage/useLocalStorageItem";


export type LangKeys = Leaves<typeof en>
export type LangCodes = keyof typeof LANG_DICT;


const LANG_DICT = {pl, en};

function TranslationProvider({ children }: { children: ReactNode}) {
  const { value, setValue } = useLocalStorageItem("lang");
  
  const [lang, setLang] = useState<LangCodes>(() => {
    if (value)
      return value as LangCodes;
    else if (navigator.language.includes("pl"))
      return "pl";
    else if (navigator.language.includes("en"))
      return "en";
    else
      return "en";
  });

  useEffect(() => setValue(lang), [lang]);


  const dict: typeof en = LANG_DICT[lang];
  
  const t = useCallback(function (key: LangKeys, replacemnts?: Record<string, string>): string | never {
    let translation = pickTranslation(key, dict);
    
    if (replacemnts) {
      translation = formatTranslation(translation, replacemnts);
    }
    
    return translation;
  }, [lang, dict])
  

  return (
    <TranslationContext.Provider 
      value={{
        t: t,
        setLang: (langCode) => setLang(() => langCode),
        lang: lang
      }}
    >
      {children}
    </TranslationContext.Provider>

  );
}

export default memo(TranslationProvider);