import { useStore } from "@tanstack/react-form";
import { withFieldGroup } from "./hooks/form";


export const PhoneFieldsGroup = withFieldGroup({
  defaultValues: {
    areaCode: '',
    phoneNumber: ''
  },
  render: function Render({ group }) {
    const areaCode = useStore(group.store, (state) => state.values.areaCode)

    console.log("Group", areaCode)

    return (
      <>
        <group.AppField 
          name="areaCode"
          children={(field) => <field.AreaCodeAutocomplete label="Numer kierunkowy" />}
        />

        <group.AppField 
          name="phoneNumber"
          children={(field) => 
            <field.CustomTextField 
              props={
                {
                  label: "Numer telefonu", 
                  required: false, 
                  disabled: !areaCode, 
                  type: "text", 
                  imaskProps: { mask: `+${areaCode}} ${"0".repeat(13)}`, overwrite: true, lazy: true }
                }
              } 
            />
          }
        />     
      </>
    );
  }
})