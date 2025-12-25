import { formOptions } from "@tanstack/react-form";


export const cardFormOpts = formOptions({
  defaultValues: {
    cardData: {
      barcode: '',
    },
  },
})