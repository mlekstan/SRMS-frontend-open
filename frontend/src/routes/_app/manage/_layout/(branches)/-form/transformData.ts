import type { Leaves } from "@/types/Leaves";
import type { branchFormOpts } from "./branchForm-options";
import type { Branch } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";

type FormFields = Leaves<typeof branchFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export function transformData(data: Branch): FieldsValuesMap{

  return {
    "branchData.name": toValidString(data.name),
    "branchData.country": toValidString(data.country),
    "branchData.city": toValidString(data.city),
    "branchData.street": toValidString(data.street),
    "branchData.streetNumber": toValidString(data.streetNumber),
    "branchData.flatNumber": toValidString(data.flatNumber),
    "branchData.zipCode": toValidString(data.zipCode),
  };
}