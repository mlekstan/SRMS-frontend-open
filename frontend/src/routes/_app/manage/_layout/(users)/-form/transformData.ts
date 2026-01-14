import type { Leaves } from "@/types/Leaves";
import type { userFormOpts } from "./userForm-options";
import type { User } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof userFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export function transformData(data: User): FieldsValuesMap {

  return {
    "userData.firstName": toValidString(data.firstName),
    "userData.middleName": toValidString(data.middleName),
    "userData.lastName": toValidString(data.lastName),
    "userData.email": toValidString(data.email),
    "userData.areaCode": toValidString(data.areaCode),
    "userData.phoneNumber": toValidString(data.phoneNumber),
    "userData.branchId": data.branch.id,
    "userData.password": "",
  };
}