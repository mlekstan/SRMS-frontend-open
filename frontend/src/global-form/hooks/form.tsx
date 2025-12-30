import { createFormHook } from "@tanstack/react-form";
import AreaCodeAutocomplete from "@/global-form/field-components/AreaCodeAutocomplete";
import { fieldContext, formContext } from "@/global-form/hooks/form-context";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import FormTextField from "@/global-form/field-components/FormTextField";
import { SecureFromTextField } from "@/global-form/field-components/SecureFormTextField";
import { EditClientCardsTable } from "@/routes/_app/manage/_layout/(clients)/clients_/-table/EditClientCardsTable";
import { CategoryAutocomplete } from "@/routes/_app/rental/rental-sale/-components/forms/field-components/CategoryAutocomplete";
import { SubcategoryAutocomplete } from "@/routes/_app/rental/rental-sale/-components/forms/field-components/SubcategoryAutocomplete";
import { SpeedAutocomplete } from "@/routes/_app/rental/rental-sale/-components/forms/field-components/SpeedAutocomplete";
import { QuantityAutocomplete } from "@/routes/_app/rental/rental-sale/-components/forms/field-components/QuantityAutocomplete";
import { CardAutocomplete } from "@/routes/_app/rental/rental-sale/-components/forms/field-components/CardAutocomplete";
import { FormAutocompleteWrapper } from "../field-components/FormAutocompleteWrapper";

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
}

const fieldComponents = {
  ...global,
  EditClientCardsTable,
  ...rentalSale
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: fieldComponents,
  formComponents: {},
  fieldContext,
  formContext
})

