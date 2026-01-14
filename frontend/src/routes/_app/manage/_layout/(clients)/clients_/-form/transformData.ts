import type { Leaves } from "@/types/Leaves";
import type { editClientFormOpts } from "./editClientForm-options";
import type { Client } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof editClientFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;

export function transformData(data: Client): Partial<FieldsValuesMap> {

  return {
    "personalData.firstName": toValidString(data.firstName),
    "personalData.middleName": toValidString(data.middleName),
    "personalData.lastName": toValidString(data.lastName),
    "personalData.identityCardNumber": toValidString(data.identityCardNumber),
    "residenceData.country": toValidString(data.country),
    "residenceData.city": toValidString(data.city),
    "residenceData.street": toValidString(data.street),
    "residenceData.streetNumber": toValidString(data.streetNumber),
    "residenceData.flatNumber": toValidString(data.flatNumber),
    "residenceData.zipCode": toValidString(data.zipCode),
    "contactData.areaCode": toValidString(data.areaCode),
    "contactData.phoneNumber": toValidString(data.phoneNumber),
    "contactData.email": toValidString(data.email),
  };
}