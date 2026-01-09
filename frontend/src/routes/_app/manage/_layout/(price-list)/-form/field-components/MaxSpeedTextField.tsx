import FormTextField from "@/global-form/field-components/FormTextField";

export function MaxSpeedTextField() {

  return (
    <FormTextField 
      props={{
        endAdornment: "km/h",
        required: true,
        type: "text",
        imaskProps: { mask: Number, scale: 0, min: 1, max: 2147483647, overwrite: true, lazy: false }
      }}
    />    
  );
}