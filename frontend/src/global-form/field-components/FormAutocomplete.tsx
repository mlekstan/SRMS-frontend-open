import { useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFieldContext } from "../hooks/form-context";
import { AccordionValidUpdateContext } from "../../routes/_app/manage/-forms/AccordionValidUpdateContext";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { useConditionalRenderContext } from "@/routes/_app/manage/-forms/context-api/ConditionalRenderContext";


type FormAutcompleteProps<T> = {
  props: {
    label: LangKeys;
    required: boolean;
    type: string;
    options?: T[];
    optionLabel: keyof T;
    optionValue: keyof T;
    queryFn?: () => Promise<T[]>;
    queryKey?: string;
    triggerChildFormRender?: string;
    triggerRenderOnValue?: string | number;
    triggerChildFormClose?: string[];    
  };
};

type ConditionalQueryParams<P> = {
  enabled: boolean;
  queryFn: (() => Promise<P[]>) | undefined;
  queryKey: string | undefined;
};


function useConditonalQuery<S>({
  enabled,
  queryFn,
  queryKey
}: ConditionalQueryParams<S>): UseQueryResult<S[]> | null {
  if (!enabled) {
    return null;
  }

  const query = useQuery({ queryKey: [queryKey], queryFn: queryFn, enabled: false });
  return query;
}


export default function FormAutocomplete<K extends Record<string, string>>({ props }: FormAutcompleteProps<K>) {
  const field = useFieldContext();
  const setAccordionValidState = useContext(AccordionValidUpdateContext);
  const { setRenderingMap } = useConditionalRenderContext();
  const {t} = useTranslationContext();

  const { 
    label, 
    required, 
    type, 
    options: staticOptions, 
    optionLabel, 
    optionValue, 
    queryFn, 
    queryKey,
    triggerChildFormRender,
    triggerChildFormClose,
    triggerRenderOnValue
  } = props;

  const query = useConditonalQuery<K>({enabled: !staticOptions, queryFn: queryFn, queryKey: queryKey});

  useEffect(() => {
    if (field.state.value === null) {
      field.setValue("");
    }
  });

  useEffect(() => {
    if (triggerChildFormRender && triggerRenderOnValue && triggerChildFormClose)
      setRenderingMap({ 
        triggerChildFormRender,
        triggerChildFormClose, 
        triggerRenderOnValue,
        fieldValue: field.state.value
      });
  }, [field.state.value]);

  useEffect(() => {
    if (setAccordionValidState) {
      setAccordionValidState((prev) => {
        const copy = {...prev};
        copy[field.name] = field.state.meta.isValid;
        return (copy);
      });
    }
  }, [field.state.meta.isValid]);


  const options = staticOptions ?? query?.data ?? [];

  // value prop in MUI Autocomplete must be one options provided in options props. 
  // When the selected option is removed from Autocomplete value is changing to null.
  const value = (field.state.value !== "") ? options.find((option: any) => option[optionValue] === field.state.value) || null : null; 

  console.log("Autocomplete", field.name, field.state.value, value);

  return (
    <Autocomplete 
      sx={{ width: "fit-content", display: "inline-flex" }}
      options={options}
      // It is necessary to provide in order to see changes done in TanStack's form obj in our Autocomplete e.g. form.reset().
      value={value}
      autoHighlight
      // When value is null - value?.label is undefined,
      // field.handleChange() takes undefined as argument.
      // After that component rerenders with 
      // field.state.value === undefined, but next re-renders
      // have field.state.value === "" - this happens automatically
      // probably it is default action of TanStack Form Lib.
      onChange={(_, value) => {
        field.handleChange(value?.[optionValue] ?? "");
      }}
      getOptionLabel={(option) => {
        try {
          return t(option[optionLabel] as LangKeys);
        } catch (error) {
          return option[optionLabel];
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          helperText={!field.state.meta.isValid && (field.state.meta.errors.map((error) => t(error)).join(' '))}
          error={!field.state.meta.isValid}
          required={required}
          label={t(label)}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "off",
            },
          }}
        />
      )}
    />
  );
}