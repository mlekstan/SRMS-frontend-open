import { formOptions } from "@tanstack/react-form";


export const clientFormOpts = formOptions({
  defaultValues: {
    cardData: {
      cardBarcode: '',
    },
    personalData: {
      firstName: '',
      secondName: '',
      lastName: '',
      identityCardNumber: '',
    },
    residenceData: {
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      flatNumber: '',
      zipCode: '',
    },
    contactData: {
      areaCode: '',
      phoneNumber: '',
      email: '',
    },
  },
})