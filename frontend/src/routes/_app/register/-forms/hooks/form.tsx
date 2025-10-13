import { createFormHook } from "@tanstack/react-form";
import CustomTextField from "../../-components/CustomTextField";
import CountriesAutocomplete from "../../-components/CountriesAutocomplete";
import AreaCodeAutocomplete from "../../-components/AreaCodeAutocomplete";
import BoolAutocomplete from "../../-components/BoolAutocomplete";
import { fieldContext, formContext } from "./form-context";
import CardBarcodeAutocomplete from "../../-components/CardBarcodeAutocomplete";


export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    CustomTextField,
    CountriesAutocomplete,
    AreaCodeAutocomplete,
    BoolAutocomplete,
    CardBarcodeAutocomplete
  },
  formComponents: {

  },
  fieldContext,
  formContext
})