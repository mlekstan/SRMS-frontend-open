import { ResidenceFieldsGroup } from "../groups/ResidenceFieldsGroup";
import type { FormConfig } from "../types/types";


const cantBeEmpty = (value: any) => {
  const length = value.length
  if (length === 0) {
    return ("validation.empty");
  }
};

type keys = "branchFieldsConfig";

export const branchFormConfig: FormConfig<keys> = {
  branchFieldsConfig: [
    {
      fieldName: "branchData.name",
      label: "registration.branch.form.branch.name",
      required: true,
      type: "text",
      validators: {
        onChange: ({ value }) => cantBeEmpty(value)
      },
      imaskProps: { mask: /^.{1,255}$/u , overwrite: false, lazy: false }
    },
    {
      group: [
        { 
          fieldName: "branchData.country", required: true, 
        },
        { 
          fieldName: "branchData.city", required: true, 
        },        
        { 
          fieldName: "branchData.street", required: true,
        },
        { 
          fieldName: "branchData.streetNumber", required: true,
        },
        { 
          fieldName: "branchData.flatNumber", required: false,
        },
      ],
      component: ResidenceFieldsGroup
    },
    { 
      fieldName: "branchData.zipCode",
      label: "registration.branch.form.branch.zipCode",
      required: true, 
      type: 'text',
      validators: {
        onChange: ({ value }) => cantBeEmpty(value)
      },
      imaskProps: { mask: /^.{1,10}$/, overwrite: false, lazy: false }
    },
  ]
}