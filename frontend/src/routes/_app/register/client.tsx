import { createFileRoute, linkOptions, useLocation } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles"; 
import type { PaperProps, BoxProps } from "@mui/material";
import LinkRouter from "@/routes/_app/register/-components/LinkRouter";
import ClientForm from "./-form/ClientForm";



export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
})



const breadcrumbsOptions = linkOptions([
  {to: '/register', label: 'Rejestracja', icon: ''},
  {to: '/register/client', label: 'Zarejestruj klienta', icon: ''},
]);


const FormPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  '&': {
    padding: theme.spacing(12),
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.secondary.light,
  }
}));

const FormPaperContainer = styled(Box)<BoxProps>(({ theme }) => ({
  '&': {
    padding: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
  }
}));




function RouteComponent() {

  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const pathParts = pathname.split('/').slice(1);
  

  return (
    <FormPaperContainer>
      <Breadcrumbs separator='>' >
        {pathParts.map((value, index) => {
          const path = '/' + pathParts.slice(0, index + 1).join('/');
          const breadcrumbsOption = breadcrumbsOptions.find((value) => value.to === path);
          
          const style = (index === pathParts.length - 1) ? {color: 'primary.light', } : {};
          return (
            <LinkRouter {...breadcrumbsOption} sx={style}>{breadcrumbsOption?.label}</LinkRouter>
          );
        })}
      </Breadcrumbs>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>Zarejestruj nowego klienta</Typography>
        <ClientForm />   
      </FormPaper>
    </FormPaperContainer>
  );
}
