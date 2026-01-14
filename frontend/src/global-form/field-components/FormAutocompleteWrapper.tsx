import { useEffect } from "react";
import FormAutocomplete  from "./FormAutocomplete";
import { useConditionalRenderContext } from "@/routes/_app/manage/-forms/context-api/ConditionalRenderContext";
import { useFieldContext } from "../hooks/form-context";
import type { SxProps, Theme } from "@mui/material";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";

export type FormAutcompleteWrapperProps<T> = {
  props: {
    sx?: SxProps<Theme>;
    label?: LangKeys;
    required: boolean;
    type: string;
    options?: T[];
    optionLabel: keyof T;
    optionValue: keyof T;
    queryFn?: () => Promise<T[]>;
    queryKey?: any[];
    triggerChildFormRender?: string;
    triggerRenderOnValue?: string | number;
    triggerChildFormClose?: string[];    
  };
};


export function FormAutocompleteWrapper<K extends Record<string, any>>({ props }: FormAutcompleteWrapperProps<K>) {
  const field = useFieldContext();
  const { setRenderingMap } = useConditionalRenderContext();

  const {
    triggerChildFormRender, 
    triggerRenderOnValue, 
    triggerChildFormClose,
    ...rest
  } = props;

  useEffect(() => {
    if (setRenderingMap && triggerChildFormRender && triggerRenderOnValue && triggerChildFormClose)
      setRenderingMap({ 
        triggerChildFormRender,
        triggerChildFormClose, 
        triggerRenderOnValue,
        fieldValue: field.state.value
      });
  }, [field.state.value]);
  
  return (
    <FormAutocomplete 
      props={rest}
    />
  );
}