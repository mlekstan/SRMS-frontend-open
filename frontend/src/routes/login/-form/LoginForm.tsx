import { useLoginForm } from "./useLoginForm";
import { LoginFormFields } from "./LoginFormFields";
import { Box } from "@mui/material";
import { Loader } from "@/routes/-components/Loader";
import { FailureDialog } from "@/routes/_app/manage/-components/general/FailureDialog";


export function LoginForm() {
  const { form, error, setError } = useLoginForm();

  return (
    <Box>
      <LoginFormFields form={form} />
      {
        (form.state.isSubmitting) &&
        <Loader open={true} />
      }

      {
        (error) &&
        <FailureDialog 
          open={true}
          closeFn={() => setError(null)}
          duration={null}
          info={"failureDialog.info.submit"}
          message={error.message}
        />
      }
    </Box>
  );
}