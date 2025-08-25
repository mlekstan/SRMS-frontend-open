import { useStore } from "@tanstack/react-form";
import { withFieldGroup } from "./hooks/form";


export const PhoneFieldsGroup = withFieldGroup({
  defaultValues: {
    areaCode: '',
    phoneNumber: ''
  },
  props: {
    
  },
  render: function Render({ group }) {
    const rawAreaCode = useStore(group.store, (state) => state.values.areaCode)
    
    const areaCodePhone = !rawAreaCode ? "" : rawAreaCode.phone;

    console.log("Group", areaCodePhone)

    return (
      <>
        <group.AppField 
          name="areaCode"
          children={(field) => <field.AreaCodeAutocomplete label="Numer kierunkowy" />}
        />

        <group.AppField 
          name="phoneNumber"
          children={(field) => <field.CustomTextField props={{label: "Numer telefonu", required: false, disabled: !areaCodePhone, type: "text", imaskProps: { mask: `+${areaCodePhone}} ${"0".repeat(14)}`, overwrite: true, lazy: true }}} />}
        />     
      </>
    );
  }
})