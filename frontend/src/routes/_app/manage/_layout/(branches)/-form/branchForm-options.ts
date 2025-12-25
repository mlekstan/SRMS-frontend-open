import { formOptions } from "@tanstack/react-form";


export const branchFormOpts = formOptions({
  defaultValues: {
    branchData: {
      name: "",
      country: "",
      city: "",
      street: "",
      streetNumber: "",
      flatNumber: "",
      zipCode: ""
    }
  },
})