import { createFormHook } from "@tanstack/react-form";
import AreaCodeAutocomplete from "@/global-form/field-components/AreaCodeAutocomplete";
import { fieldContext, formContext } from "@/global-form/hooks/form-context";
import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";
import FormTextField from "@/global-form/field-components/FormTextField";
import { SecureFromTextField } from "@/global-form/field-components/SecureFormTextField";
import { EditClientCardsTable } from "@/routes/_app/manage/_layout/(clients)/clients_/-table/EditClientCardsTable";


const fieldComponents = {
  FormTextField,
  AreaCodeAutocomplete,
  FormAutocomplete,
  SecureFromTextField,
  EditClientCardsTable,
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: fieldComponents,
  formComponents: {},
  fieldContext,
  formContext
})

