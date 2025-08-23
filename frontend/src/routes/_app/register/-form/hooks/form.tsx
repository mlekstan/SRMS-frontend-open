import { createFormHook } from "@tanstack/react-form"
import CustomTextField from "../../-components/CustomTextField"
import { fieldContext, formContext } from "./form-context"


export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    CustomTextField,
  },
  formComponents: {
    
  },
  fieldContext,
  formContext
})