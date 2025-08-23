import { createFormHookContexts, createFormHook, formOptions } from "@tanstack/react-form";
import { ChildForm } from "@/routes/_app/register/-form/ChildForm";
import { clientFormOpts } from "@/routes/_app/register/-form/form-options";
import { useAppForm } from "@/routes/_app/register/-form/hooks/form";


// const clientFormConfig = {
//   cardFieldsConfig: [
//     {
//       fieldName: "cardData.cardBarcode", 
//       label: "Kod karty klienta",
//       required: true,
//       type: "text",
//       imaskProps: {
//         mask
//       }
//     }
//   ]


// }




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
  { fieldName: "country", label: 'Kraj', required: false, type: 'text', imaskProps: {}},
  { fieldName: "city", label: 'Miasto', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
  { fieldName: "street", label: 'Ulica', required: false, type: 'text', imaskProps: { mask: /^\p{L}{0,100}$/u , overwrite: true, lazy: false }},
  { fieldName: "streetNumber", label: 'Numer ulicy', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
  { fieldName: "flatNumber", label: 'Numer lokalu', required: false, type: 'text', imaskProps: { mask: Number, scale: 0, min: 1, max: 32767 }},
  { fieldName: "zipCode", label: 'Kod pocztowy', required: false, type: 'text', imaskProps: { mask: /^.{0,10}$/, overwrite: true, lazy: false }},
];

const contactFieldsDefs = [
  { fieldName: "areaCode", label: 'Numer kierunkowy', required: false, type: 'text', imaskProps: {}},
  { fieldName: "phoneNumber", label: 'Numer telefonu', required: false, type: 'tel', imaskProps: {}},
  { fieldName: "email", label: 'E-mail', required: false, type: 'email', imaskProps: { mask: /^\S*@?\S*$/, overwrite: true, lazy: false }}
];



export default function ClientForm() {
    
  const form = useAppForm({
    ...clientFormOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    }
  })


  return(
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ChildForm form={form} title="Dane karty klienta" />
      {/* <ChildForm form={form} title="Dane osobowe" fieldsDefs={personalFieldsDefs} />
      <ChildForm form={form} title="Dane zamieszkania" fieldsDefs={residenceFieldsDefs} />
      <ChildForm form={form} title="Dane kontaktowe" fieldsDefs={contactFieldsDefs} /> */}

    </form>
      
      
      
      // <FullAccordion title='Dane karty klienta' fieldsDefs={cardFieldsDefs} />
      // <FullAccordion title='Dane osobowe' fieldsDefs={personalFieldsDefs} />
      // <FullAccordion title='Dane zamieszkania' fieldsDefs={residenceFieldsDefs} />
      // <FullAccordion title='Dane kontaktowe' fieldsDefs={contactFieldsDefs} />
      // <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
      //   <Button variant='outlined'>Zapisz</Button>
      // </Box>         
      
  );





}