import { createFormHook } from "@tanstack/react-form";
import AreaCodeAutocomplete from "@/global-form/field-components/AreaCodeAutocomplete";
import { fieldContext, formContext } from "@/global-form/hooks/form-context";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import FormTextField from "@/global-form/field-components/FormTextField";
import { SecureFromTextField } from "@/global-form/field-components/SecureFormTextField";
import { EditClientCardsTable } from "@/routes/_app/manage/_layout/(clients)/clients_/-table/EditClientCardsTable";
import { CategoryAutocomplete } from "@/routes/_app/rental/rental-sale/-components/form/field-components/CategoryAutocomplete";
import { SubcategoryAutocomplete } from "@/routes/_app/rental/rental-sale/-components/form/field-components/SubcategoryAutocomplete";
import { SpeedAutocomplete } from "@/routes/_app/rental/rental-sale/-components/form/field-components/SpeedAutocomplete";
import { QuantityAutocomplete } from "@/routes/_app/rental/rental-sale/-components/form/field-components/QuantityAutocomplete";
import { CardAutocomplete } from "@/routes/_app/rental/rental-sale/-components/form/field-components/CardAutocomplete";
import { FormAutocompleteWrapper } from "../field-components/FormAutocompleteWrapper";
import { TimeUnitTextField } from "@/routes/_app/manage/_layout/(price-list)/-form/field-components/TimeUnitTextField";
import { MaxSpeedTextField } from "@/routes/_app/manage/_layout/(price-list)/-form/field-components/MaxSpeedTextField";
import { PriceTextField } from "@/routes/_app/manage/_layout/(price-list)/-form/field-components/PriceTextField";
import { TimeTextField } from "@/routes/_app/rental/rental-sale/-components/form/field-components/TimeTextField";

const global = {
  FormTextField,
  AreaCodeAutocomplete,
  FormAutocomplete,
  SecureFromTextField,
  FormAutocompleteWrapper
};

const rentalSale = {
  CategoryAutocomplete,
  SubcategoryAutocomplete,
  SpeedAutocomplete,
  QuantityAutocomplete,
  CardAutocomplete,
  TimeTextField
}

const priceList = {
  TimeUnitTextField,
  MaxSpeedTextField,
  PriceTextField
}

const fieldComponents = {
  ...global,
  EditClientCardsTable,
  ...rentalSale,
  ...priceList
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: fieldComponents,
  formComponents: {},
  fieldContext,
  formContext
})

