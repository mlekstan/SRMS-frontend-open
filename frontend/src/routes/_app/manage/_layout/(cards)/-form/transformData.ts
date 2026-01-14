import type { Leaves } from "@/types/Leaves";
import type { cardFormOpts } from "./cardForm-options";
import type { Card } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";

type FormFields = Leaves<typeof cardFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export function transformData(data: Card): FieldsValuesMap {

  return {
    "cardData.barcode": toValidString(data.barcode),
  };
}