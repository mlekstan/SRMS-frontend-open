import type { Leaves } from "@/types/Leaves";
import type { itemFormOpts } from "./itemForm-options";
import type { Item } from "@/api/types";
import { toValidString } from "@/global-form/transform-functions/toValidString";


type FormFields = Leaves<typeof itemFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;

export function transformData(data: Item): Partial<FieldsValuesMap> {

  return {
    "basicData.barcode": toValidString(data.barcode),
    "basicData.subcategoryId": data.subcategory.id,
    "basicData.branchId": data.branch.id,
    "basicData.name": toValidString(data.name),
    "basicData.shortName": toValidString(data.shortName),
    "basicData.marketValue": toValidString(data.marketValue),
    "saleData.forSale": data.forSale,
    "saleData.sellPrice": toValidString(data.sellPrice),
  };
}