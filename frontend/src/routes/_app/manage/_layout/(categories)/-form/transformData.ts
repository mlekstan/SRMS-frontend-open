import type { Leaves } from "@/types/Leaves";
import type { categoryFormOpts } from "./categoryForm-options";
import type { Category } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof categoryFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export function transformData(data: Category): FieldsValuesMap {

  return {
    "categoryData.name": toValidString(data.name)
  }
}