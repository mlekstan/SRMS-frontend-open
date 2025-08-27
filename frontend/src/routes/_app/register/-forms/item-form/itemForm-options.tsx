import { formOptions } from "@tanstack/react-form";


export const itemFormOpts = formOptions({
  defaultValues: {
    basicData: {
      barcode: '',
      itemSubcategory: '',
      name: '',
      shortName: '',
      marketValue: '',
    },
    saleData: {
      forSale: '',
      sellPrice: '',
    },
  },
})