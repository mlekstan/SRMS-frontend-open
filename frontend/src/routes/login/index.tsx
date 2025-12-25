import { Paper, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from './-form/LoginForm';


export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  
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
      <Typography variant="h3">Login</Typography>
      <LoginForm />
    </Paper>
  );
}
