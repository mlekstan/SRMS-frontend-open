import { PhoneFieldsGroup } from "../groups/PhoneFieldsGroup"
import { ResidenceFieldsGroup } from "../groups/ResidenceFieldsGroup";


export const clientFormConfig = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.cardBarcode",
      label: 'Barcode', 
      required: true, 
      type: 'text', 
      imaskProps: { mask: "0".repeat(13) , overwrite: true, lazy: false, placeholderChar: '_' },
      validators: {
        onChange: ({ value }) => {
          const length = value.split("_").join("").length
          if (length === 0) {
            return ("Can't be empty");
          } else if (length > 0 && length < 13) {
            return ("Must have at least 13 characters");
          }
        },
      }
    },
  ],
  personalFieldsConfig: [
    { 
      fieldName: "personalData.firstName", 
      label: 'Frist name', 
      required: true, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{1,40}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          return (value.length === 0 ? "Can't be empty" : undefined);
        }
      }
    },
    { 
      fieldName: "personalData.secondName", 
      label: 'Second name', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,40}$/u , overwrite: true, lazy: false }
    },
    { 
      fieldName: "personalData.lastName", 
      label: 'Last name', 
      required: true,
      type: 'text', 
      imaskProps: { mask: /^\p{L}{1,80}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          return (value.length === 0 ? "Can't be empty" : undefined);
        }
      }
    },
    { 
      fieldName: "personalData.identityCardNumber", 
      label: 'Identity card number', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,15}$/u , overwrite: true, lazy: false }
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
      label: 'Zip code',
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^.{0,10}$/, overwrite: true, lazy: false }
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
      label: 'E-mail', 
      required: false, 
      type: 'email', 
      imaskProps: { mask: /^\S*@?\S*$/, overwrite: true, lazy: false }
    }
  ],
}