import { createFileRoute, linkOptions } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import ClientForm from "./-forms/client-form/ClientForm";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";



export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
})


const breadcrumbsOptions = linkOptions([
  {to: '/register', label: "Registration", icon: ''},
  {to: '/register/client', label: "Register client", icon: ''},
]);


function RouteComponent() {

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>Register new client</Typography>
        <ClientForm />  
      </FormPaper>
    </FormPaperContainer>
  );
}
