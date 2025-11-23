import { createFormHook } from "@tanstack/react-form";
import AreaCodeAutocomplete from "../../-components/AreaCodeAutocomplete";
import { fieldContext, formContext } from "./form-context";
import FormAutocomplete from "../../-components/FormAutocomplete";
import FormTextField from "../../-components/FormTextField";
import { EditClientCardsTable } from "../../_layout/clients_/-table/EditClientCardsTable";


const fieldComponents = {
  FormTextField,
  AreaCodeAutocomplete,
  FormAutocomplete,
  EditClientCardsTable,
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: fieldComponents,
  formComponents: {},
  fieldContext,
  formContext
})

