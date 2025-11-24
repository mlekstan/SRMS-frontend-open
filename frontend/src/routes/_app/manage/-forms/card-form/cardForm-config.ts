import type { FormConfig } from "../types/types";

type keys = "cardFieldsConfig";

export const cardFormConfig: FormConfig<keys> = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.barcode",
      label: "registration.card.form.card.barcode", 
      required: true, 
      type: 'text', 
      imaskProps: { mask: "0".repeat(13) , overwrite: true, lazy: false, placeholderChar: '_' },
      validators: {
        onChange: ({ value }) => {
          const length = value.split("_").join("").length
          if (length === 0) {
            return ("validation.empty");
          } else if (length > 0 && length < 13) {
            return ("validation.tooShort");
          }
        },
      }
    }
  ],
  
}