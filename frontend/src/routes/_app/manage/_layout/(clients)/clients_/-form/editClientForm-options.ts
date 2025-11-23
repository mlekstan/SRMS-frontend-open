import { formOptions } from "@tanstack/react-form";

export const editClientFormOpts = formOptions({
  defaultValues: {
    cardData: {
      cards: Array<object>(),
    },
    personalData: {
      firstName: '',
      middleName: '',
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