import { useState } from "react";
import ChildFormAccordion from "../-components/ChildFormAccordion";
import { clientFormOpts } from "./form-options";
import { withForm } from "./hooks/form";
import { AccordionValidUpdateContext } from "./hooks/child-context";



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


export const ChildForm = withForm({
  ...clientFormOpts,
  props: {
    title: "Child form",
    formConfig: Array()
  },
  render: function Render({ form, title, formConfig }) {
    const [valid, setValid] = useState(
      Object.fromEntries(
        getFieldNames(formConfig).map(
          (fieldName) => [fieldName, true]
        )
      )
    );

    const isValid = !Object.values(valid).includes(false)
    
    return (
      <AccordionValidUpdateContext.Provider value={setValid}>
        <ChildFormAccordion title={title} valid={isValid} >
          {
            formConfig.map((fieldConfig, idx) => {
              const { fieldName, group: Group, component: Component, componentName, validators, ...others } = fieldConfig;

              if (Group) {
                return (
                  <Component key={idx} form={form} fields={{areaCode: Group[0].fieldName, phoneNumber: Group[1].fieldName}} />
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
                        const Component = field[componentName] ?? field["CustomTextField"];

                        return (
                          <Component props={others} />
                        );
                      }}
                  </form.AppField>                
                );
              }

            })
          }
        </ChildFormAccordion>
      </AccordionValidUpdateContext.Provider>
    );
  }

})