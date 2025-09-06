import { Button } from "@mui/material";
import { useFormContext } from "../-forms/hooks/form-context";


export function SubmitButton() {
  const form = useFormContext();
  
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {
        (isSubmitting) => (
          <Button 
            variant="outlined"
            type="submit"
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            Save
          </Button>
        )
      }
    </form.Subscribe>
  );
}