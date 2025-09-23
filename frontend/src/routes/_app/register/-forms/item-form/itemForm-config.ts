import type { FormConfig } from "../types/types";



export const itemFormConfig: FormConfig = {
  basicFieldsConfig: [
    { 
      fieldName: "basicData.barcode",
      label: "registration.item.form.base.barcode", 
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
      fieldName: "basicData.itemSubcategory",
      label: "registration.item.form.base.subcategory", 
      required: true,
      type: 'text',
      imaskProps: { mask: /^.{1,255}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          }
        },
      }
    },
    { 
      fieldName: "basicData.name",
      label: "registration.item.form.base.name", 
      required: true,
      type: 'text',
      imaskProps: { mask: /^.{1,255}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          }
        },
      }
    },
    { 
      fieldName: "basicData.shortName",
      label: "registration.item.form.base.shortName", 
      required: true,
      type: 'text',
      imaskProps: { mask: /^.{1,128}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          }
        },
      }
    },
    { 
      fieldName: "basicData.marketValue",
      label: "registration.item.form.base.marketValue", 
      required: false,
      type: 'text',
      imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99, autofix: true, thousandsSeparator: " " },
    },
    
  ],
  saleFieldsConfig: [
    { 
      fieldName: "saleData.forSale", 
      label: "registration.item.form.sale.forSale", 
      required: true,
      type: 'text',
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("Can't be empty");
          }
        }
      },
      componentName: "BoolAutocomplete"
    },
    { 
      fieldName: "saleData.sellPrice",
      label: "registration.item.form.sale.sellPrice",
      required: false,
      type: 'text',
      imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99, autofix: true, thousandsSeparator: " " }
    },
  ],
}