


export const cardFormConfig = {
  cardFieldsConfig: [
    { 
      fieldName: "cardData.cardBarcode",
      label: "Barcode", 
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
    { 
      fieldName: "cardData.isTemp",
      label: "Temporary",
      required: true, 
      type: 'text', 
      imaskProps: {},
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          }
        },
      },
      componentName: "BoolAutocomplete"
    },
  ],
  
}