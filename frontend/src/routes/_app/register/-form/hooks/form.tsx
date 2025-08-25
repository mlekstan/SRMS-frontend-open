import { createFormHook } from "@tanstack/react-form"
import CustomTextField from "../../-components/CustomTextField"
import CountriesAutocomplete from "../../-components/AreaCodeAutocomplete"
import AreaCodeAutocomplete from "../../-components/AreaCodeAutocomplete"
import { fieldContext, formContext } from "./form-context"


export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    CustomTextField,
    CountriesAutocomplete,
    AreaCodeAutocomplete,
  },
  formComponents: {

  },
  fieldContext,
  formContext
})