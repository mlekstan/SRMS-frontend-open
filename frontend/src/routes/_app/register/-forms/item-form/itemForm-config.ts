import { itemFormOpts } from "./itemForm-options"



export const itemFormConfig = {
  basicFieldsConfig: [
    { 
      fieldName: "basicData.barcode",
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
          } else {
            return undefined;
          }
        },
      }
    },
    { 
      fieldName: "basicData.itemSubcategory",
      label: "Subcategory", 
      required: true,
      type: 'text',
      imaskProps: {},
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          } else {
            return undefined;
          }
        },
      }
    },
    { 
      fieldName: "basicData.name",
      label: "Name", 
      required: true,
      type: 'text',
      imaskProps: {},
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          } else {
            return undefined;
          }
        },
      }
    },
    { 
      fieldName: "basicData.shortName",
      label: "Short name", 
      required: true,
      type: 'text',
      imaskProps: {},
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          } else {
            return undefined;
          }
        },
      }
    },
    { 
      fieldName: "basicData.marketValue",
      label: "Market value", 
      required: false,
      type: 'text',
      imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99, autofix: true, thousandsSeparator: ' ' },
    },
    
  ],
  saleFieldsConfig: [
    { 
      fieldName: "saleData.forSale", 
      label: "For sale", 
      required: false, 
      type: 'text', 
      imaskProps: {},
      componentName: "BoolAutocomplete"
    },
    { 
      fieldName: "saleData.sellPrice", 
      label: "Sell price", 
      required: false, 
      type: 'text', 
      imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99 }
    },
  ],
}