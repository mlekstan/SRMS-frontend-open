import type { FormConfig } from "../../../-forms/types/types";
import { apiGet } from "@/api/apiGet";
import type { Category, DriveType } from "@/api/types";

type keys = "subcategoryFieldsConfig" | "vehicleFieldsConfig" | "electricVehicleFieldsConfig";

export const subcategoryFormConfig: FormConfig<keys> = {
  subcategoryFieldsConfig: [
    { 
      fieldName: "subcategoryData.categoryId",
      label: "registration.subcategory.form.subcategory.categoryName", 
      required: true, 
      type: 'text',
      validators: {
        onChange: ({ value }) => {
          const length = value.length
          if (length === 0) {
            return ("validation.empty");
          }
        },
      },
      componentName: "FormAutocompleteWrapper",
      optionLabel: "name",
      optionValue: "id",
      queryFn: () => apiGet<Category>({ url: "/categories" }),
      queryKey: "categories",
      triggerChildFormRender: "registration.subcategory.form.vehicle.title",
      triggerRenderOnValue: 1, // 1 -> "Pojazd"
      triggerChildFormClose: [
        "registration.subcategory.form.vehicle.title",
        "registration.subcategory.form.electricVehicle.title",
      ]
    },
    { 
      fieldName: "subcategoryData.name",
      label: "registration.subcategory.form.subcategory.name", 
      required: true, 
      type: 'text', 
      imaskProps: { mask: /^.{1,255}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          const length = value.length
          if (length === 0) {
            return ("validation.empty");
          }
        },
      }
    },
  ],
  vehicleFieldsConfig: [
    {
      fieldName: "vehicleData.driveTypeId",
      label: "registration.subcategory.form.vehicle.driveType",
      required: false,
      type: "text",
      componentName: "FormAutocompleteWrapper",
      optionLabel: "name",
      optionValue: "id",
      queryFn: () => apiGet<DriveType>({ url: "/drive-types" }),
      queryKey: "driveTypes",
      triggerChildFormRender: "registration.subcategory.form.electricVehicle.title",
      triggerRenderOnValue: 2, // 2 -> "Elektryczny"
      triggerChildFormClose: [
        "registration.subcategory.form.electricVehicle.title",
      ]
    },
    {
      fieldName: "vehicleData.curbWeight",
      label: "registration.subcategory.form.vehicle.curbWeight",
      endAdornment: "kg",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647 }
    },
    {
      fieldName: "vehicleData.maxLoad",
      label: "registration.subcategory.form.vehicle.maxLoad",
      endAdornment: "kg",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647 }
    },
    {
      fieldName: "vehicleData.minAge",
      label: "registration.subcategory.form.vehicle.minAge",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
    },
    {
      fieldName: "vehicleData.maxAge",
      label: "registration.subcategory.form.vehicle.maxAge",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
    }
  ],
  electricVehicleFieldsConfig: [
    {
      fieldName: "electricVehicleData.enginePower",
      label: "registration.subcategory.form.electricVehicle.enginePower",
      endAdornment: "W",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647 }
    },
    {
      fieldName: "electricVehicleData.batteryVoltage",
      label: "registration.subcategory.form.electricVehicle.batteryVoltage",
      endAdornment: "V",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647 }
    },
    {
      fieldName: "electricVehicleData.batteryCapacity",
      label: "registration.subcategory.form.electricVehicle.batteryCapacity",
      endAdornment: "Ah",
      required: false,
      type: "text",
      imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647 }
    }
  ]
}