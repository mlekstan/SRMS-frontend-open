import { useTranslationContext } from "@/providers/TranslationContext";
import { TextField } from "@mui/material";

type TableTextFieldProps = {
  label: string;
  value: string | boolean;
  options?: Array<any>;
}

export function TableTextField({ label, value, options }: TableTextFieldProps) {
  const { t } = useTranslationContext();

  if (options) {
    const option = options.find((option) => option.value === value);
    value = (option) ? t(option.label) : String(value);
  }

  return (
    <TextField
      label={label}
      value={value}
    />
  );
}