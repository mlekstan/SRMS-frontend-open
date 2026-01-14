import { formOptions } from "@tanstack/react-form";


export const subcategoryFormOpts = formOptions({
  defaultValues: {
    subcategoryData: {
      categoryId: "",
      name: "",
    },
    vehicleData: {
      driveTypeId: "",
      curbWeight: "",
      maxLoad: "",
      minAge: "",
      maxAge: "",
    },
    electricVehicleData: {
      enginePower: "",
      batteryVoltage: "",
      batteryCapacity: "",
    }
  },
})