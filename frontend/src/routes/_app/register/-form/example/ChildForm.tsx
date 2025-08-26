import { useStore } from "@tanstack/react-form";
import ChildFormAccordion from "../-components/ChildFormAccordion";
import CustomTextField from "../-components/CustomTextField";
import { clientFormOpts } from "./form-options";
import { withForm } from "./hooks/form";
import { PhoneFieldsGroup } from "./PhoneFieldsGroup";
import { useEffect, useState } from "react";


export const ChildForm = withForm({
  ...clientFormOpts,
  props: {
    title: "Child form",
  },
  render: function Render({ form, title }) {
    const isValid = useStore(form.store, (state) => state.isValid)
    
    return (
      <ChildFormAccordion title={title} valid={isValid} >
        
        <PhoneFieldsGroup form={form} fields={{areaCode: "contactData.areaCode", phoneNumber: "contactData.phoneNumber"}} />
        
        <form.AppField name="contactData.email" >
          {(field) => <field.CustomTextField props={{label: "E-mail", required: false, type: "text", imaskProps: { mask: /^\S*@?\S*$/, overwrite: true, lazy: false }}}/>}
        </form.AppField>

      </ChildFormAccordion>
    );
  }


})