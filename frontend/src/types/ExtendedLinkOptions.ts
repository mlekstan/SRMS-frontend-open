import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import type { LinkOptions } from "@tanstack/react-router";
import type { FC, SVGProps } from "react";


export type AdditionalLinkOptions = {
  label?: LangKeys,
  imgSrc?: string,
  icon?: FC<SVGProps<SVGSVGElement>>
}

export type ExtendedLinkOptions = LinkOptions & AdditionalLinkOptions;