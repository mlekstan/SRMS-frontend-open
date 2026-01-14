import { formOptions } from "@tanstack/react-form";


export const itemFormOpts = formOptions({
  defaultValues: {
    basicData: {
      barcode: "",
      subcategoryId: "",
      branchId: "",
      name: "",
      shortName: "",
      marketValue: "",
    },
    saleData: {
      forSale: "",
      sellPrice: "",
    },
  },
})