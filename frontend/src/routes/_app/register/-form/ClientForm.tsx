import { createFormHookContexts, createFormHook, formOptions } from "@tanstack/react-form";
import { Box, Button } from "@mui/material";
import { ChildForm } from "@/routes/_app/register/-form/ChildForm";
import { clientFormOpts } from "@/routes/_app/register/-form/form-options";
import { useAppForm } from "@/routes/_app/register/-form/hooks/form";
import { PhoneFieldsGroup } from "./PhoneFieldsGroup";



const clientFormConfig = {
  cardFieldsConfig: [
    { fieldName: "cardData.cardBarcode", label: 'Kod karty klienta', required: true, type: 'text', imaskProps: { mask: "0000000000000" , overwrite: true, lazy: false, placeholderChar: '_' }},
  ],
  personalFieldsConfig: [
    { fieldName: "personalData.firstName", label: 'Imię', required: true, type: 'text', imaskProps: { mask: /^\p{L}{1,40}$/u , overwrite: true, lazy: false }},
    { fieldName: "personalData.secondName", label: 'Drugie imię', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,40}$/u , overwrite: true, lazy: false }},
    { fieldName: "personalData.lastName", label: 'Nazwisko', required: true, type: 'text', imaskProps: { mask: /^\p{L}{1,80}$/u , overwrite: true, lazy: false }},
    { fieldName: "personalData.identityCardNumber", label: 'ID dokumentu', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,15}$/u , overwrite: true, lazy: false }},    
  ],
  residenceFieldsConfig: [
    { fieldName: "residenceData.country", label: 'Kraj', required: false, type: 'text', imaskProps: {}, componentName: "CountriesAutocomplete"},
    { fieldName: "residenceData.city", label: 'Miasto', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
    { fieldName: "residenceData.street", label: 'Ulica', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
    { fieldName: "residenceData.streetNumber", label: 'Numer ulicy', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
    { fieldName: "residenceData.flatNumber", label: 'Numer lokalu', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
    { fieldName: "residenceData.zipCode", label: 'Kod pocztowy', required: false, type: 'text', imaskProps: { mask: /^.{0,10}$/, overwrite: true, lazy: false }},    
  ],
  contactFieldsConfig: [
    { 
      group: [
        { fieldName: "contactData.areaCode", label: 'Numer kierunkowy', required: false, type: 'text', imaskProps: {} },
        { fieldName: "contactData.phoneNumber", label: 'Numer telefonu', required: false, type: 'text', imaskProps: {} }
      ], 
      component: PhoneFieldsGroup
    }, 
    { fieldName: "email", label: 'E-mail', required: false, type: 'email', imaskProps: { mask: /^\S*@?\S*$/, overwrite: true, lazy: false }}
  ],
}




export default function ClientForm() {
    
  const form = useAppForm({
    ...clientFormOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    }
  })

  console.log("Main form") 

  return(
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* <ChildForm form={form} title="Dane karty klienta" formConfig={clientFormConfig.cardFieldsConfig} />
      <ChildForm form={form} title="Dane osobowe" formConfig={clientFormConfig.personalFieldsConfig} />
      <ChildForm form={form} title="Dane zamieszkania" formConfig={clientFormConfig.residenceFieldsConfig} /> */}
      <ChildForm form={form} title="Dane kontaktowe" />
      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
        <Button variant='outlined'>Zapisz</Button>
      </Box> 

    </form>
            
  );
}