import { PhoneFieldsGroup } from "../../../-forms/groups/PhoneFieldsGroup";
import { ResidenceFieldsGroup } from "../../../-forms/groups/ResidenceFieldsGroup";
import type { FormConfig } from "../../../-forms/types/types";


type keys = "cardFieldsConfig" | "personalFieldsConfig" | "residenceFieldsConfig" | "contactFieldsConfig";

export const editClientFormConfig: FormConfig<keys> = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.cards",
      componentName: "EditClientCardsTable",
    },
  ],
  personalFieldsConfig: [
    { 
      fieldName: "personalData.firstName", 
      label: "registration.client.form.personal.firstName", 
      required: true,
      type: 'text', 
      imaskProps: { mask: /^[\p{L}-]{1,40}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          return (value.length === 0 ? "validation.empty" : undefined);
        }
      }
    },
    { 
      fieldName: "personalData.middleName", 
      label: "registration.client.form.personal.middleName", 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^[\p{L}-]{0,40}$/u , overwrite: false, lazy: false }
    },
    { 
      fieldName: "personalData.lastName", 
      label: "registration.client.form.personal.lastName", 
      required: true,
      type: 'text', 
      imaskProps: { mask: /^[\p{L}-]{1,80}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          return (value.length === 0 ? "validation.empty" : undefined);
        }
      }
    },
    { 
      fieldName: "personalData.identityCardNumber", 
      label: "registration.client.form.personal.identityCardNumber", 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^.{0,15}$/u , overwrite: false, lazy: false }
    },    
  ],
  residenceFieldsConfig: [
    {
      group: [
        { 
          fieldName: "residenceData.country", 
        },
        { 
          fieldName: "residenceData.city", 
        },        
        { 
          fieldName: "residenceData.street", 
        },
        { 
          fieldName: "residenceData.streetNumber", 
        },
        { 
          fieldName: "residenceData.flatNumber", 
        },
      ],
      component: ResidenceFieldsGroup
    },
    { 
      fieldName: "residenceData.zipCode",
      label:  "registration.client.form.residence.zipCode",
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^.{0,10}$/, overwrite: false, lazy: false }
    },
  ],
  contactFieldsConfig: [
    { 
      group: [
        { 
          fieldName: "contactData.areaCode" 
        },
        { 
          fieldName: "contactData.phoneNumber" 
        }
      ], 
      component: PhoneFieldsGroup 
    }, 
    { 
      fieldName: "contactData.email", 
      label: "registration.client.form.contact.email",
      required: false,
      type: 'email',
      imaskProps: { mask: /^[a-z0-9._%+-@]*$/i, overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          const regex = /^((?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,})?$/i
          if (!regex.test(value)) {
            return "validation.email";
          }
        }
      }
    }
  ],
}