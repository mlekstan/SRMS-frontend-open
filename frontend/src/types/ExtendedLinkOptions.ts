import type { LangKeys } from "@/providers/TranslationProvider";
import type { LinkOptions } from "@tanstack/react-router";
import type { FC, SVGProps } from "react";


export type AdditionalLinkOptions = {
  label?: LangKeys,
  imgSrc?: string,
  icon?: FC<SVGProps<SVGSVGElement>>
}

export type ExtendedLinkOptions = LinkOptions & AdditionalLinkOptions;