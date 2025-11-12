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
  props: {
    fields: {
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      flatNumber: ''
    },
    requiredMap: {
      country: false,
      city: false,
      street: false,
      streetNumber: false,
      flatNumber: false     
    }
  },
  render: function Render({ group, fields, requiredMap }) {
    
    return (
      <>
        <group.AppField 
          name="country"
          validators={{
            onChangeListenTo: [fields["city"], fields["street"]],
            onChange: ({ value, fieldApi }) => {
              if (
                (fieldApi.form.getFieldValue(fields["city"]) && !value) || 
                (requiredMap["country"] && !value)
              ) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            () => {
              return (
                <FormAutocomplete 
                  props={{
                    label: "registration.client.form.residence.country",
                    required: requiredMap["country"],
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
            onChangeListenTo: [fields["street"], fields["streetNumber"], fields["flatNumber"]],
            onChange: ({ value, fieldApi }) => {
              if (
                (fieldApi.form.getFieldValue(fields["street"]) && !value) || 
                (requiredMap["city"] && !value )
              ) {
                return "validation.empty" as LangKeys;
              }
            } 
          }}
          children={
            () => {
              return (
                <FormTextField 
                  props={{
                    label: "registration.client.form.residence.city", 
                    required: requiredMap["city"], 
                    type: 'text', 
                    imaskProps: { mask: /^[\p{L}\s-]{0,100}$/u , overwrite: false, lazy: false }
                  }} 
                />
              )
            }
          }
        />

        <group.AppField 
          name="street"
          validators={{
            onChangeListenTo: [fields["streetNumber"], fields["flatNumber"]],
            onChange: ({ value, fieldApi }) => {
              if (
                (fieldApi.form.getFieldValue(fields["streetNumber"]) && !value) || 
                (requiredMap["street"] && !value)
              ) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            () => {
              return (
                <FormTextField 
                  props={{
                    label: "registration.client.form.residence.street",
                    required: requiredMap["street"], 
                    type: 'text', 
                    imaskProps: { mask: /^[\p{L}\s-]{0,100}$/u, overwrite: false, lazy: false }
                  }} 
                />
              )
            }
          }
        />

        <group.AppField 
          name="streetNumber"
          validators={{
            onChangeListenTo: [fields["flatNumber"]],
            onChange: ({ value, fieldApi }) => {
              if (
                (fieldApi.form.getFieldValue(fields["flatNumber"]) && !value) ||
                (requiredMap["streetNumber"] && !value)
               ) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            () => {
              return (
                <FormTextField props={{
                  label: "registration.client.form.residence.streetNumber", 
                  required: requiredMap["streetNumber"], 
                  type: 'text', 
                  imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
                }} 
                />
              )
            }
          }
        />
        
        <group.AppField 
          name="flatNumber"
          validators={{
            onChange: ({ value }) => {
              if (requiredMap["flatNumber"] && !value) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            () => {
              return (
                <FormTextField 
                  props={{
                    label: "registration.client.form.residence.flatNumber", 
                    required: requiredMap["flatNumber"], 
                    type: 'text', 
                    imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }
                  }} 
                />
              )
            }
          }
        />
      </>
    );
  }
})