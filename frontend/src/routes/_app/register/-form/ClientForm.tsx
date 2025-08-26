import { Box, Button } from "@mui/material";
import { ChildForm } from "@/routes/_app/register/-form/ChildForm";
import { clientFormOpts } from "@/routes/_app/register/-form/form-options";
import { useAppForm } from "@/routes/_app/register/-form/hooks/form";
import { clientFormConfig } from "./configs/clientForm-config";



export default function ClientForm() {
    
  const form = useAppForm({
    ...clientFormOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    }
  })

  console.log("Main form");

  return(
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ChildForm form={form} title="Client card data" formConfig={clientFormConfig.cardFieldsConfig} />
      <ChildForm form={form} title="Personal data" formConfig={clientFormConfig.personalFieldsConfig} />
      <ChildForm form={form} title="Residence data" formConfig={clientFormConfig.residenceFieldsConfig} />
      <ChildForm form={form} title="Contact data" formConfig={clientFormConfig.contactFieldsConfig} />
      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
        <Button variant='outlined'>Save</Button>
      </Box> 

    </form>
            
  );
}