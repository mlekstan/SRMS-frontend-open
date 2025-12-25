import { Box, Button } from "@mui/material";
import { itemFormOpts } from "../-form/itemForm-options";
import { useAppForm } from "@/global-form/hooks/form";
import { itemFormConfig } from "../-form/itemForm-config";
import { createChildForm } from "../../../-forms/createChildForm";


const ChildForm = createChildForm(itemFormOpts);


export default function ItemForm() {
    
  const form = useAppForm({
    ...itemFormOpts,
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
      <ChildForm form={form} title="Basic data" formConfig={itemFormConfig.basicFieldsConfig} />
      <ChildForm form={form} title="Sale data" formConfig={itemFormConfig.saleFieldsConfig} />
      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
        <Button 
          variant='outlined'
          type="submit"
          onClick={() => form.handleSubmit()}
        >
          Save
        </Button>
      </Box> 

    </form>
            
  );
}