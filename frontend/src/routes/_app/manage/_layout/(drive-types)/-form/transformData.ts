import type { DriveType } from "@/api/types";
import type { Leaves } from "@/types/Leaves";
import type { driveTypeFormOpts } from "./driveTypeForm-options";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof driveTypeFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export function transformData(data: DriveType): FieldsValuesMap {

  return {
    "driveTypeData.name": toValidString(data.name)
  };
}