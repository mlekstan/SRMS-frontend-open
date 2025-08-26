import { PhoneFieldsGroup } from "../PhoneFieldsGroup"


export const clientFormConfig = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.cardBarcode",
      label: 'Kod karty klienta', 
      required: true, 
      type: 'text', 
      imaskProps: { mask: "0000000000000" , overwrite: true, lazy: false, placeholderChar: '_' },
      validators: {
        onChange: ({ value }) => {
          const length = value.split("_").join("").length
          if (length === 0) {
            return ("Can't be empty");
          } else if (length > 0 && length < 13) {
            return ("Must have at lest 13 characters");
          } else {
            return undefined;
          }
        },
      }
    },
  ],
  personalFieldsConfig: [
    { 
      fieldName: "personalData.firstName", 
      label: 'Imię', 
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
      label: 'Drugie imię', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,40}$/u , overwrite: true, lazy: false }
    },
    { 
      fieldName: "personalData.lastName", 
      label: 'Nazwisko', 
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
      label: 'ID dokumentu', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,15}$/u , overwrite: true, lazy: false }
    },    
  ],
  residenceFieldsConfig: [
    { 
      fieldName: "residenceData.country", 
      label: 'Kraj',
      required: false, 
      type: 'text', 
      imaskProps: {}, 
      componentName: "CountriesAutocomplete"},
    { 
      fieldName: "residenceData.city", 
      label: 'Miasto', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }
    },
    { 
      fieldName: "residenceData.street", 
      label: 'Ulica', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }
    },
    { 
      fieldName: "residenceData.streetNumber", 
      label: 'Numer ulicy', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
    },
    { 
      fieldName: "residenceData.flatNumber", 
      label: 'Numer lokalu', 
      required: false, 
      type: 'text', 
      imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
    },
    { 
      fieldName: "residenceData.zipCode", 
      label: 'Kod pocztowy',
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
          fieldName: "contactData.phone" 
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