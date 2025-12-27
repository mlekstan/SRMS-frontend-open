import { SubmitButton } from "@/global-form/SubmitButton";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { Box } from "@mui/material";


export function LoginFormFields({ form }: any) {

  return (
    <form.AppForm>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          marginTop: "60px",
          marginBottom: "20px"
        }}
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value)
                return "validation.empty" as LangKeys;
              
              const regex = /^((?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,})?$/i;
              if (!regex.test(value))
                return "validation.email" as LangKeys;
            }
          }}
        >
          {
            (field) => (
              <field.FormTextField 
                props={{
                  label: "login.form.email",
                  type: "text",
                  required: true,
                  imaskProps: { mask: /^[a-z0-9._%+-@]*$/i, overwrite: false, lazy: false }
                }}
              />
            )
          }
        </form.AppField>

        <form.AppField
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value)
                return "validation.empty" as LangKeys;
            }
          }}
        >
          {
            (field) => (
              <field.SecureFromTextField 
                props={{
                  label: "login.form.password",
                  required: true,
                  imaskProps: { mask: /^.{1,255}$/u , overwrite: false, lazy: false }
                }}
              />
            )
          }
        </form.AppField>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <SubmitButton title={"login.form.button"} />
      </Box>
    </form.AppForm>
  );
}