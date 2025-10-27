import type { LangKeys } from "@/providers/TranslationProvider"

type Option = {
  [key: string]: string
}

type BaseFieldConfig = {
  fieldName: string;
  label: LangKeys;
  endAdornment?: string;
  required: boolean;
  type: string;
  imaskProps?: object;
  validators?: Record<string, ({ value }: { value: string }) => LangKeys | undefined>;
  componentName?: string;
  triggerChildFormRender?: string, // child form title property
  triggerRenderOnValue?: string | number,
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
  queryKey: string;
}

export type FieldConfig = StaticFieldConfig | DynamicFieldConfig;

export type GroupConfig = {
  group: { fieldName: string }[];
  component: any;
}

export type FormConfig<T extends string> = {
  [key in T]: Array<BaseFieldConfig | FieldConfig | GroupConfig>;
}