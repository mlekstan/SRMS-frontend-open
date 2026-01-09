import { Button, type SxProps, type Theme } from "@mui/material";
import { useFormContext } from "@/global-form/hooks/form-context"
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";


export function SubmitButton({ sx, title }: { sx?: SxProps<Theme> ,title?: LangKeys }) {
  const form = useFormContext();
  const {t} = useTranslationContext();
  
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {
        (isSubmitting) => (
          <Button
            sx={sx}
            variant="outlined"
            type="submit"
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            { title ? t(title) : t("save") }
          </Button>
        )
      }
    </form.Subscribe>
  );
}