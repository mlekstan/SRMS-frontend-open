import type { FormConfig } from "../types/types";



export const cardFormConfig: FormConfig = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.cardBarcode",
      label: "registration.card.form.card.barcode", 
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
    }
  ],
  
}