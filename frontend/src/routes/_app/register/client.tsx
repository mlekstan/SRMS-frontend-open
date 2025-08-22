import { createFileRoute, linkOptions, useLocation } from "@tanstack/react-router";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles"; 
import type { PaperProps, BoxProps } from "@mui/material";
import FullAccordion from "@/routes/_app/register/-components/FullAccordion";
import LinkRouter from "@/routes/_app/register/-components/LinkRouter";
import CountriesAutocomplete from "@/routes/_app/register/-components/CountriesAutocomplete";
import AreaCodeAutocomplete from "@/routes/_app/register/-components/AreaCodeAutocomplete";
import TextFieldWrapper from "./-components/TextFieldWrapper";




export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
})


const cardFieldsDefs = [
  { fieldName: "cardBarcode", label: 'Kod karty klienta', required: true, type: 'text', imaskProps: { mask: "0000000000000" , overwrite: true, lazy: false, placeholderChar: '_' }},
];

const personalFieldsDefs = [
  { fieldName: "firstName", label: 'Imię', required: true, type: 'text', imaskProps: { mask: /^\p{L}{1,40}$/u , overwrite: true, lazy: false }},
  { fieldName: "secondName", label: 'Drugie imię', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,40}$/u , overwrite: true, lazy: false }},
  { fieldName: "lastName", label: 'Nazwisko', required: true, type: 'text', imaskProps: { mask: /^\p{L}{1,80}$/u , overwrite: true, lazy: false }},
  { fieldName: "identityCardNumber", label: 'ID dokumentu', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,15}$/u , overwrite: true, lazy: false }},
];

const residenceFieldsDefs = [
  { fieldName: "country", label: 'Kraj', required: false, type: 'text', imaskProps: {}, customAutocomplete: CountriesAutocomplete},
  { fieldName: "city", label: 'Miasto', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
  { fieldName: "street", label: 'Ulica', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
  { fieldName: "streetNumber", label: 'Numer ulicy', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
  { fieldName: "flatNumber", label: 'Numer lokalu', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
  { fieldName: "zipCode", label: 'Kod pocztowy', required: false, type: 'text', imaskProps: { mask: /^.{0,10}$/, overwrite: true, lazy: false }},
];

const contactFieldsDefs = [
  { fieldName: "areaCode", label: 'Numer kierunkowy', required: false, type: 'text', imaskProps: {}, customAutocomplete: AreaCodeAutocomplete},
  { fieldName: "phoneNumber", label: 'Numer telefonu', required: false, type: 'tel', imaskProps: {}},
  { fieldName: "email", label: 'E-mail', required: false, type: 'email', imaskProps: { mask: /^\S*@?\S*$/, overwrite: true, lazy: false }}
];

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



export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextFieldWrapper,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext
})



function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      cardBarcode: '',
      firstName: '',
      secondName: '',
      lastName: '',
      identityCardNumber: '',
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      flatNumber: '',
      zipCode: '',
      phoneNumber: '',
      email: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);
    }
  })

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
        <form.AppForm>
          <FullAccordion title='Dane karty klienta' fieldsDefs={cardFieldsDefs} />
          <FullAccordion title='Dane osobowe' fieldsDefs={personalFieldsDefs} />
          <FullAccordion title='Dane zamieszkania' fieldsDefs={residenceFieldsDefs} />
          <FullAccordion title='Dane kontaktowe' fieldsDefs={contactFieldsDefs} />
          <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
            <Button variant='outlined'>Zapisz</Button>
          </Box>         
        </form.AppForm>
      </FormPaper>
    </FormPaperContainer>
  );
}
