import { IconButton } from "@mui/material";
import FormTextField, { type FormTextFieldProps } from "./FormTextField";
import { useMemo, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type SecureFormTextFieldProps = Omit<FormTextFieldProps, "endAdornment" | "type">

export function SecureFromTextField({ props }: { props: SecureFormTextFieldProps }) {
  const [visible, setVisible] = useState(false);
  const { label, required, disabled, imaskProps } = props;

  const endAdornment = useMemo(() => (
    <IconButton
      onClick={() => setVisible(prev => !prev)}
    >
      { visible ? <VisibilityOff /> : <Visibility /> }
    </IconButton>
  ), [visible]);


  return (
    <FormTextField
      props={{
        type: visible ? "text" : "password",
        label,
        required,
        disabled,
        imaskProps,
        endAdornment,
      }}
    />
  );
}