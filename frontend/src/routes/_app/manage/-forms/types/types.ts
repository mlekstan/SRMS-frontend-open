import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider"

type Option = {
  [key: string]: string | boolean;
}

type BaseFieldConfig = {
  fieldName: string;
  label?: LangKeys;
  endAdornment?: string;
  required?: boolean;
  type?: string;
  imaskProps?: object;
  validators?: Record<string, ({ value }: { value: string }) => LangKeys | undefined>;
  componentName?: string;
  triggerChildFormRender?: string; // child form title property
  triggerRenderOnValue?: string | number;
  triggerChildFormClose?: string[];
}

type StaticFieldConfig = BaseFieldConfig & {
  options: Option[];
  optionLabel: keyof Option;
  optionValue: keyof Option;
  queryFn?: never;
  queryKey?: never;
}

type DynamicFieldConfig = BaseFieldConfig & {
  options?: never;
  optionLabel: string;
  optionValue: string;
  queryFn: any;
  queryKey: any[];
}

export type FieldConfig = StaticFieldConfig | DynamicFieldConfig;

export type GroupConfig = {
  group: { 
    fieldName: string;
    required?: boolean; 
  }[];
  component: any;
}

export type FormConfig<T extends string> = {
  [key in T]: Array<BaseFieldConfig | FieldConfig | GroupConfig>;
}