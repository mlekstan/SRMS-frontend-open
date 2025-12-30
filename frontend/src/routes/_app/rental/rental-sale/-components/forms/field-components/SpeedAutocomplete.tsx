import FormAutocomplete from "@/global-form/field-components/FormAutocomplete";

type Props = {
  rowId: string;
};

export function SpeedAutocomplete({ rowId }: Props) {

  return (
    <FormAutocomplete 
      props={{
        sx: {
          width: "auto"
        },
        required: true,
        type: "text",
        optionLabel: "",
        optionValue: "",
        options: []
      }}
    />
  );
}