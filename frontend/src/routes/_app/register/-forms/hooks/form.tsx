import { createFormHook } from "@tanstack/react-form";
import AreaCodeAutocomplete from "../../-components/AreaCodeAutocomplete";
import { fieldContext, formContext } from "./form-context";
import FormAutocomplete from "../../-components/FormAutocomplete";
import FormTextField from "../../-components/FormTextField";


const fieldComponents = {
  FormTextField,
  AreaCodeAutocomplete,
  FormAutocomplete,
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: fieldComponents,
  formComponents: {},
  fieldContext,
  formContext
})

