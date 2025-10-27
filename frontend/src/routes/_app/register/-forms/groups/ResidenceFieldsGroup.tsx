import FormTextField from "../../-components/FormTextField";
import { withFieldGroup } from "../hooks/form";
import FormAutocomplete from "../../-components/FormAutocomplete";
import countries from "@/assets/data/countries.json";
import type { LangKeys } from "@/providers/TranslationProvider";


export const ResidenceFieldsGroup = withFieldGroup({
  defaultValues: {
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    flatNumber: '',
  },
  render: function Render({ group }) {

    return (
      <>
        <group.AppField 
          name="country"
          validators={{
            onChangeListenTo: ["residenceData.city", "residenceData.street"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.city") && !value) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            (field) => {
              return (
                <FormAutocomplete 
                  props={{
                    label: "registration.client.form.residence.country",
                    required: false,
                    type: "text",
                    options: countries,
                    optionLabel: "label",
                    optionValue: "label"
                  }}
                />
              )
            }
          }
            
        />

        <group.AppField 
          name="city"
          validators={{
            onChangeListenTo: ["residenceData.street", "residenceData.streetNumber", "residenceData.flatNumber"],
            onChange: ({ value, fieldApi }) => {
              if (fieldApi.form.getFieldValue("residenceData.street") && !value) {
                return "validation.empty" as LangKeys;
              }
            } 
          }}
          children={
            (field) => {
              return (<FormTextField props={
                {
                  label: "registration.client.form.residence.city", 
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
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            (field) => {
              return (<FormTextField 
                props={
                  {
                    label: "registration.client.form.residence.street",
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
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            (field) => {
              return (<FormTextField props={
                {
                  label: "registration.client.form.residence.streetNumber", 
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
              return (<FormTextField props={
                {
                  label: "registration.client.form.residence.flatNumber", 
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