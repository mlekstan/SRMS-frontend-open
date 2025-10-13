import { Button } from "@mui/material";
import { useFormContext } from "../-forms/hooks/form-context";
import { useTranslationContext } from "@/providers/TranslationContext";


export function SubmitButton() {
  const form = useFormContext();
  const {t} = useTranslationContext();
  
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
            {t("save")}
          </Button>
        )
      }
    </form.Subscribe>
  );
}