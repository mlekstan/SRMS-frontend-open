import { Box, Button } from "@mui/material";
import { createChildForm } from "../createChildForm";
import { cardFormOpts } from "./cardForm-options";
import { useAppForm } from "../hooks/form";
import { cardFormConfig } from "./cardForm-config";


const ChildForm = createChildForm(cardFormOpts);


export default function CardForm() {
    
  const form = useAppForm({
    ...cardFormOpts,
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
      <ChildForm form={form} title="Client card data" formConfig={cardFormConfig.cardFieldsConfig} />
      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
        <Button variant='outlined'>Save</Button>
      </Box> 

    </form>
            
  );
}