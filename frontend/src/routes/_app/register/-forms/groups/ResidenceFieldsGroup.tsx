import { useTranslationContext } from "@/providers/TranslationContext";
import CountriesAutocomplete from "../../-components/CountriesAutocomplete";
import CustomTextField from "../../-components/CustomTextField";
import { withFieldGroup } from "../hooks/form";


export const ResidenceFieldsGroup = withFieldGroup({
  defaultValues: {
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    flatNumber: '',
  },
  render: function Render({ group }) {
    const {t} = useTranslationContext();

    return (
      <>
        <group.AppField 
          name="country"
          validators={{
            onChangeListenTo: ["residenceData.city", "residenceData.street"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.city") && !value) {
                return "Can't be empty.";
              }
            }
          }}
          children={
            (field) => {
              return (<CountriesAutocomplete props={
                {
                  label: t("registration.client.form.residence.country"), 
                  required: false, 
                  type: "text"
                }
              } />)
            }
          }
            
        />

        <group.AppField 
          name="city"
          validators={{
            onChangeListenTo: ["residenceData.street", "residenceData.streetNumber", "residenceData.flatNumber"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.street") && !value) {
                return "Can't be empty.";
              }
            } 
          }}
          children={
            (field) => {
              return (<CustomTextField props={
                {
                  label: t("registration.client.form.residence.city"), 
                  required: false, 
                  type: 'text', 
                  imaskProps: { mask: /^[\p{L}\s-]{0,100}$/u , overwrite: false, lazy: false }
                }
              } />)
            }
          }
        />

        <group.AppField 
          name="street"
          validators={{
            onChangeListenTo: ["residenceData.streetNumber", "residenceData.flatNumber"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.streetNumber") && !value) {
                return "Can't be empty.";
              }
            }
          }}
          children={
            (field) => {
              return (<CustomTextField 
                props={
                  {
                    label: t("registration.client.form.residence.street"),
                    required: false, 
                    type: 'text', 
                    imaskProps: { mask: /^[\p{L}\s-]{0,100}$/u, overwrite: false, lazy: false }
                  }
                } 
              />)
            }
          }
        />

        <group.AppField 
          name="streetNumber"
          validators={{
            onChangeListenTo: ["residenceData.flatNumber"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.flatNumber") && !value) {
                return "Can't be empty";
              }
            }
          }}
          children={
            (field) => {
              return (<CustomTextField props={
                {
                  label: t("registration.client.form.residence.streetNumber"), 
                  required: false, 
                  type: 'text', 
                  imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
                }
              } />)
            }
          }
        />
        
        <group.AppField 
          name="flatNumber"
          children={
            (field) => {
              return (<CustomTextField props={
                {
                  label: t("registration.client.form.residence.flatNumber"), 
                  required: false, 
                  type: 'text', 
                  imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
                }
               } />)
            }
          }
        />
      </>
    );
  }
})