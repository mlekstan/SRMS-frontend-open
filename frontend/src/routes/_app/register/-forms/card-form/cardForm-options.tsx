import { formOptions, type FormOptions } from "@tanstack/react-form";


export const cardFormOpts = formOptions({
  defaultValues: {
    cardData: {
      cardBarcode: '',
      isTemp: ''
    },
  },
})