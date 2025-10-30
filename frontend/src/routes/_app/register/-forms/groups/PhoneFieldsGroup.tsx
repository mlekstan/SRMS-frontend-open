import { useTranslationContext } from "@/providers/TranslationContext";
import { withFieldGroup } from "../hooks/form";
import type { LangCodes, LangKeys } from "@/providers/TranslationProvider";


export const PhoneFieldsGroup = withFieldGroup({
  defaultValues: {
    areaCode: '',
    phoneNumber: ''
  },
  render: function Render({ group }) {
    const {t} = useTranslationContext();
    //const areaCode = useStore(group.store, (state) => state.values.areaCode)

    console.log("Group");

    return (
      <>
        <group.AppField 
          name="areaCode"
          children={
            (field) => <field.AreaCodeAutocomplete label={t("registration.client.form.contact.areaCode")} />}
        />

        <group.AppField 
          name="phoneNumber"
          validators={{
            onChangeListenTo: ["contactData.areaCode"],
            onChange: ({value, fieldApi}) => {
              console.log("phone nuber", fieldApi.form.getFieldValue("contactData.areaCode"), value)
              return ((fieldApi.form.getFieldValue("contactData.areaCode")) && (!(/^\+[1-9]\d{0,2}(-\d{1,4})? \d{1,13}$/).test(value))) ? "validation.empty" as LangKeys : undefined;
            }
          }}
          children={(field) => {

            console.log("phoneNumber", field.form.getFieldValue("contactData.areaCode"))

            return (
              <field.FormTextField 
                props={
                  {
                    label: "registration.client.form.contact.phoneNumber", 
                    required: false, 
                    disabled: !field.form.getFieldValue("contactData.areaCode"), 
                    type: "text", 
                    imaskProps: { 
                      mask: `+${field.form.getFieldValue("contactData.areaCode")}} ${"0".repeat(13)}`, 
                      overwrite: false, 
                      lazy: true 
                    }
                  }
                } 
              />
            );
          }

          }
        />     
      </>
    );
  }
})