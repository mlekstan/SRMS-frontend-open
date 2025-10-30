import { getSubcategories } from "@/api/subcategories/subcategories.get";
import type { FormConfig } from "../types/types";
import boolOptions from "@/assets/data/bool.json";
import { getBranches } from "@/api/branches/branches.get";

type keys = "basicFieldsConfig" | "saleFieldsConfig"

export const itemFormConfig: FormConfig<keys> = {
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
            return ("validation.empty");
          } else if (length > 0 && length < 13) {
            return ("validation.tooShort");
          }
        },
      }
    },
    { 
      fieldName: "basicData.subcategoryId",
      label: "registration.item.form.base.subcategory", 
      required: true,
      type: 'text',
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("validation.empty");
          }
        },
      },
      componentName: "FormAutocomplete",
      optionLabel: "name",
      optionValue: "id",
      queryFn: getSubcategories,
      queryKey: "subcategories",
    },
    {
      fieldName: "basicData.branchId",
      label: "registration.item.form.base.branch",
      required: true,
      type: 'text',
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("validation.empty");
          }
        },
      },
      componentName: "FormAutocomplete",
      optionLabel: "name",
      optionValue: "id",
      queryFn: getBranches,
      queryKey: "branches"
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
            return ("validation.empty");
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
            return ("validation.empty");
          }
        },
      }
    },
    { 
      fieldName: "basicData.marketValue",
      label: "registration.item.form.base.marketValue",
      endAdornment: "PLN",
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
            return ("validation.empty");
          }
        }
      },
      componentName: "FormAutocomplete",
      options: boolOptions,
      optionLabel: "label",
      optionValue: "value"
    },
    { 
      fieldName: "saleData.sellPrice",
      label: "registration.item.form.sale.sellPrice",
      endAdornment: "PLN",
      required: false,
      type: 'text',
      imaskProps: { mask: Number, scale: 2, radix: '.', mapToRadix: [','], min: 0, max: 9999999.99, autofix: true, thousandsSeparator: " " }
    },
  ],
}