import { createFileRoute, linkOptions } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import ItemForm from "./-forms/item-form/ItemForm";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";



export const Route = createFileRoute('/_app/register/item')({
  component: RouteComponent,
})


const breadcrumbsOptions = linkOptions([
  {to: '/register', label: "Registration", icon: ''},
  {to: '/register/item', label: "Register item", icon: ''},
]);


function RouteComponent() {

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>Register new item</Typography>
        <ItemForm />   
      </FormPaper>
    </FormPaperContainer>
  );
}
