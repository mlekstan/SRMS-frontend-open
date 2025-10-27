import { PhoneFieldsGroup } from "../groups/PhoneFieldsGroup"
import { ResidenceFieldsGroup } from "../groups/ResidenceFieldsGroup";
import type { FormConfig } from "../types/types";
import { getActiveCards } from "../../../../../api/cards/getActiveCards";
import boolOptions from "@/assets/data/bool.json";


type keys = "cardFieldsConfig" | "personalFieldsConfig" | "residenceFieldsConfig" | "contactFieldsConfig";

export const clientFormConfig: FormConfig<keys> = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.barcode",
      label: "registration.client.form.card.barcode", 
      required: true, 
      type: 'text', 
      // imaskProps: { mask: "0".repeat(13) , overwrite: true, lazy: false, placeholderChar: '_' },
      validators: {
        onChange: ({ value }) => {
          const length = value.length
          if (length === 0) {
            return ("validation.empty");
          } else if (length > 0 && length < 13) {
            return ("validation.tooShort");
          }
        },
      },
      componentName: "FormAutocomplete",
      optionLabel: "barcode",
      optionValue: "barcode",
      queryFn: getActiveCards,
      queryKey: "activeCards",
    },
    { 
      fieldName: "cardData.isTemp",
      label: "registration.client.form.card.isTemp",
      required: true, 
      type: 'text', 
      imaskProps: {},
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("validation.empty");
          }
        },
      },
      componentName: "FormAutocomplete",
      options: boolOptions,
      optionLabel: "label",
      optionValue: "value"
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