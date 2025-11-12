import { formOptions } from "@tanstack/react-form";


export const userFormOpts = formOptions({
  defaultValues: {
    userData: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      areaCode: "",
      phoneNumber: "",
      branchId: "",
      password: "",
    },
  }
})