import { withFieldGroup } from "../hooks/form";


export const PhoneFieldsGroup = withFieldGroup({
  defaultValues: {
    areaCode: '',
    phoneNumber: ''
  },
  render: function Render({ group }) {
    //const areaCode = useStore(group.store, (state) => state.values.areaCode)

    console.log("Group")

    return (
      <>
        <group.AppField 
          name="areaCode"
          children={(field) => <field.AreaCodeAutocomplete label="Area code" />}
        />

        <group.AppField 
          name="phoneNumber"
          validators={{
            onChangeListenTo: ["contactData.areaCode"],
            onChange: ({value, fieldApi}) => {
              console.log("phone nuber", fieldApi.form.getFieldValue("contactData.areaCode"), value)
              return (fieldApi.form.getFieldValue("contactData.areaCode") && !value) ? "Can't be empty" : undefined;
            }
          }}
          children={(field) => {

            console.log("phoneNumber", field.form.getFieldValue("contactData.areaCode"))

            return (
              <field.CustomTextField 
                props={
                  {
                    label: "Numer telefonu", 
                    required: false, 
                    disabled: !field.form.getFieldValue("contactData.areaCode"), 
                    type: "text", 
                    imaskProps: { 
                      mask: `+${field.form.getFieldValue("contactData.areaCode")}} ${"0".repeat(13)}`, 
                      overwrite: true, 
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