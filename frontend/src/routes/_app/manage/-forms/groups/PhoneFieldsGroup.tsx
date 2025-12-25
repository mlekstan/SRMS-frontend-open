import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { withFieldGroup } from "@/global-form/hooks/form";
import type { LangCodes, LangKeys } from "@/routes/-context-api/translation/TranslationProvider";


export const PhoneFieldsGroup = withFieldGroup({
  defaultValues: {
    areaCode: '',
    phoneNumber: '',
    props: {
      fields: {
        areaCode: "",
        phoneNumber: "",
      },
      requiredMap: {
        areaCode: false,
        phoneNumber: false,
      }
    }
  },
  render: function Render({ group, fields, requiredMap }) {
    const {t} = useTranslationContext();
    //const areaCode = useStore(group.store, (state) => state.values.areaCode)

    return (
      <>
        <group.AppField 
          name="areaCode"
          validators={{
            onChange: ({ value }) => {
              if (requiredMap["areaCode"] && !value) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={
            (field) => {
              return (
                <field.AreaCodeAutocomplete 
                  label={t("registration.client.form.contact.areaCode")}
                  required={requiredMap["areaCode"]}
                />
              );
            }
          }
        />

        <group.AppField 
          name="phoneNumber"
          validators={{
            onChangeListenTo: [fields["areaCode"]],
            onChange: ({value, fieldApi}) => {
              console.log("phone nuber", fieldApi.form.getFieldValue(fields["areaCode"]), value)
              if (
                ((fieldApi.form.getFieldValue(fields["areaCode"])) && 
                (!(/^\+[1-9]\d{0,2}(-\d{1,4})? \d{1,13}$/).test(value)))
              ) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
          children={(field) => {

            console.log("phoneNumber", field.form.getFieldValue(fields["areaCode"]))

            return (
              <field.FormTextField 
                props={
                  {
                    label: "registration.client.form.contact.phoneNumber", 
                    required: requiredMap["phoneNumber"], 
                    disabled: !field.form.getFieldValue(fields["areaCode"]), 
                    type: "text", 
                    imaskProps: { 
                      mask: `+${field.form.getFieldValue(fields["areaCode"])} ${"0".repeat(13)}`, 
                      overwrite: false, 
                      lazy: true,
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