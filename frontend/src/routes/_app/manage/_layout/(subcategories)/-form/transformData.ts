import type { Leaves } from "@/types/Leaves";
import type { subcategoryFormOpts } from "./subcategoryForm-options";
import type { Subcategory } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof subcategoryFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;

export function transformData(data: Subcategory): FieldsValuesMap {

  return {
    ...(data.category && {
      "subcategoryData.categoryId": data.category.id,
      "subcategoryData.name": toValidString(data.name),
    }),

    ...(data.vehicle && {
      "vehicleData.curbWeight": toValidString(data.vehicle.curbWeight),
      "vehicleData.maxLoad": toValidString(data.vehicle.maxLoad),
      "vehicleData.minAge": toValidString(data.vehicle.minAge),
      "vehicleData.maxAge": toValidString(data.vehicle.maxAge),
    }),

    ...(data.vehicle?.driveType && {
      "vehicleData.driveTypeId": data.vehicle.driveType.id,
    }),

    ...(data.vehicle?.electricVehicle && {
      "electricVehicleData.enginePower": toValidString(data.vehicle.electricVehicle.enginePower),
      "electricVehicleData.batteryVoltage": toValidString(data.vehicle.electricVehicle.batteryVoltage),
      "electricVehicleData.batteryCapacity": toValidString(data.vehicle.electricVehicle.batteryCapacity),
    }),
  };
}