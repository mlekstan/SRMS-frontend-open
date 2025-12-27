import { Paper, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from './-form/LoginForm';
import { useTranslationContext } from '../-context-api/translation/TranslationContext';


export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslationContext();

  return (
    <Paper
      elevation={4} 
      sx={{
        width: "480px",
        padding: "60px",
        margin: "auto",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h3">{ t("login.form.title") }</Typography>
      <LoginForm />
    </Paper>
  );
}
