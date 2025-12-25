import { useState } from "react";
import ChildFormAccordion from "../-components/general/ChildFormAccordion";
import { withForm } from "@/global-form/hooks/form";
import { AccordionValidUpdateContext } from "./AccordionValidUpdateContext";
import type { formOptions } from "@tanstack/react-form";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";


type ChildFormProps = {
  form: any,
  title: LangKeys,
  formConfig: any,
}

function getFieldNames(formConfig: Array<any>): Array<string> {
  const fieldsNames = formConfig.flatMap((fieldConfig) => {
    if (fieldConfig.fieldName) {
      return fieldConfig.fieldName;
    }

    if (fieldConfig.group) {
      return fieldConfig.group.map((fieldConfig) => fieldConfig.fieldName)
    }

    return []
  })

  return fieldsNames;
}



export function createChildForm(formOpts: ReturnType<typeof formOptions>) {
  const args = {
    ...formOpts,
    props: {
      title: "Child form",
      formConfig: Array()
    },
    render: function Render(props: ChildFormProps) {
      const { form, title, formConfig } = props;
      
      const {t} = useTranslationContext();

      const [valid, setValid] = useState(
        Object.fromEntries(
          getFieldNames(formConfig).map(
            (fieldName) => [fieldName, true]
          )
        )
      );

      const isValid = !Object.values(valid).includes(false)
      
      console.log("Child form", title)
      
      return (
        <AccordionValidUpdateContext.Provider value={setValid}>
          <ChildFormAccordion title={t(title)} valid={isValid} >
            {
              formConfig.map((fieldConfig, idx) => {
                const { fieldName, label, group, component: Component, componentName, validators, ...others } = fieldConfig;

                if (group) {
                  const fields = group.reduce(
                    (dict, fieldConfig) => {
                      dict[fieldConfig.fieldName.split('.').at(-1)] = fieldConfig.fieldName;
                      return dict;
                    }, 
                    {}
                  )

                  const requiredMap = group.reduce(
                    (dict, fieldConfig) => {
                      dict[fieldConfig.fieldName.split('.').at(-1)] = fieldConfig.required;
                      return dict;
                    },
                    {}
                  )

                  return (
                    <Component key={idx} form={form} fields={fields} requiredMap={requiredMap} />
                  );
                }

                if (fieldName) {
                  return (
                    <form.AppField key={idx} 
                      name={fieldName}
                      validators={validators} 
                    >
                      {
                        (field) => {
                          const Component = field[componentName] ?? field["FormTextField"];
                          const fieldProps = { label: label, ...others }

                          return (
                            <Component props={fieldProps} />
                          );
                        }
                      }
                    </form.AppField>                
                  );
                }

              })
            }
          </ChildFormAccordion>
        </AccordionValidUpdateContext.Provider>
      );
    }
  } 
    
  return(withForm(args))
}