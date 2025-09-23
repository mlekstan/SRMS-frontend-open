import type { LangKeys } from "@/providers/TranslationProvider"


export type FieldConfig = {
  fieldName: string;
  label: LangKeys;
  required: boolean;
  type: string;
  imaskProps?: object;
  validators?: Record<string, ({ value }: { value: string }) => string | undefined>;
  componentName?: string;
}

export type GroupConfig = {
  group: { fieldName: string }[];
  component: any;
}

export type FormConfig = {
  [key: string]: Array<FieldConfig | GroupConfig>;
}