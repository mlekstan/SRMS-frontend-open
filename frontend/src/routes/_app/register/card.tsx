import { createFileRoute, linkOptions } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import CardForm from "./-forms/card-form/CardForm";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";



export const Route = createFileRoute("/_app/register/card")({
  component: RouteComponent,
})


const breadcrumbsOptions = linkOptions([
  {to: "/register", label: "Registration", icon: ''},
  {to: "/register/card", label: "Register card", icon: ''},
]);


function RouteComponent() {

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>Register new card</Typography>
        <CardForm />   
      </FormPaper>
    </FormPaperContainer>
  );
}