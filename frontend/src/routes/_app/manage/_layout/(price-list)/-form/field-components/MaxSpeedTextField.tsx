import FormTextField from "@/global-form/field-components/FormTextField";

export function MaxSpeedTextField() {

  return (
    <FormTextField 
      props={{
        endAdornment: "km/h",
        required: true,
        type: "text",
        imaskProps: { mask: /^.{1,255}$/u , overwrite: true, lazy: false }
      }}
    />    
  );
}